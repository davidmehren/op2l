import winston = require("winston");
import bodyParser = require("body-parser");
import express = require("express");
import cors = require("cors");
import yaml = require("js-yaml");

// tslint:disable-next-line:no-var-requires
const expressWinston = require("express-winston");
// tslint:disable-next-line:no-var-requires
const monk = require("monk");
import * as connect_mongo from "connect-mongo";
import * as session from "express-session";
import * as fs from "fs";

import {Config} from "./model/Config";
import {AdminRouter} from "./routes/AdminRouter";
import {ConfigRouter} from "./routes/ConfigRouter";
import {LoginRouter} from "./routes/LoginRouter";
import {MottoRouter} from "./routes/MottoRouter";
import {PersonRouter} from "./routes/PersonRouter";
import {VersionRouter} from "./routes/VersionRouter";

const dbUrl = "localhost:27017/";
const MongoStore = connect_mongo(session);
const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            level: process.env.DEBUG === "true" ? "debug" : "warn",
        }),
    ],
});

export class OPhaseApi {
    private static configureMiddleware(app: express.Express) {
        logger.info("Configuring middleware...");
        app.disable("x-powered-by");
        app.use(bodyParser.json());
        app.use(bodyParser.text({
            type: "application/xml",
        }));
        if (process.env.DEBUG === "true") {
            app.use(cors());
        }
        const dbName = process.env.DB_NAME;
        app.use(session({
            cookie: {
                maxAge: 1000 * 60 * 60,
                secure: !process.env.DEBUG,
            },
            resave: false,
            saveUninitialized: false,
            secret: "sicher123",
            store: new MongoStore({
                url: "mongodb://" + dbUrl + dbName,
            }),
            // TODO: Read from environment
            unset: "destroy",
        }));
    }

    private static configureLogger(app: express.Express) {
        logger.info("Configuring express logger...");
        app.use(expressWinston.logger({
            colorize: true,
            expressFormat: true,
            meta: true,
            transports: [
                new winston.transports.Console({
                    colorize: true,
                    json: false,
                    level: process.env.DEBUG === "true" ? "debug" : "warn",
                }),
            ],
        }));
    }

    private static configureErrorHandler() {
        logger.info("configuring error handling...");
    }

    public db: any;
    public config: Config;

    constructor(private app: express.Express, private port: number, private host: string) {
        logger.info("Creating OPhaseApi object...");
        logger.warn(`Running in ${process.env.NODE_ENV} with DB ${process.env.DB_NAME}`);
    }

    public run() {
        this.app.listen(this.port, this.host);
    }

    public async initializeAPI() {
        OPhaseApi.configureLogger(this.app);
        await this.connectDB();
        await this.loadConfig();
        OPhaseApi.configureMiddleware(this.app);
        OPhaseApi.configureErrorHandler();
        this.configureRoutes(this.app);
    }

    private configureRoutes(app: express.Express) {
        logger.info("Configuring routes...");
        app.use("/person", new PersonRouter(this.config, this.db).personRouter);
        app.use("/version", new VersionRouter().versionRouter);
        app.use("/motto", new MottoRouter(this.db).mottoRouter);
        app.use("/config", new ConfigRouter(this.config).configRouter);
        app.use("/login", new LoginRouter(this.db).loginRouter);
        app.use("/admin", new AdminRouter().adminRouter);
    }

    private async loadConfig() {
        try {
            const conf = yaml.safeLoad(fs.readFileSync("config.yml", "utf8"));
            logger.info("Successfully loaded config file.");
            logger.debug(JSON.stringify(conf, null, 4));
            this.config = conf;
        } catch (e) {
            logger.error("Failed to parse config file!", e);
            process.exit(1);
        }
        logger.info("Successfully loaded config file.");
    }

    private connectDB() {
        const dbName = process.env.DB_NAME;
        if (dbName === null) {
            logger.error("DB_NAME environment variable not defined!");
            logger.error("Could not connect to MongoDB!");
            process.exit(1);
        } else {
            logger.info("Connecting to the database...");
            return monk(dbUrl + dbName).then((result: any) => {
                this.db = result;
                logger.info("Connection to MongoDB successful.");
            }).catch(() => {
                logger.error("Could not connect to MongoDB!");
                process.exit(1);
            });
        }
    }
}

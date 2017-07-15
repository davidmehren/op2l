import winston = require("winston");
import bodyParser = require("body-parser");
import express = require("express");
import cors = require("cors");
import yaml = require("js-yaml");
import versionRouter = require("./routes/VersionRouter");
import mottoRouter = require("./routes/MottoRouter");
import loginRouter = require("./routes/LoginRouter");
import configRouter = require("./routes/ConfigRouter");
import adminRouter = require("./routes/AdminRouter");

// tslint:disable-next-line:no-var-requires
const expressWinston = require("express-winston");
// tslint:disable-next-line:no-var-requires
const monk = require("monk");
import * as connect_mongo from "connect-mongo";
import * as session from "express-session";
import * as fs from "fs";

import {Config} from "./model/Config";
import {PersonRouter} from "./routes/PersonRouter";

const dbUrl = "localhost:27017/";
const MongoStore = connect_mongo(session);
export let db: any;
export let config: Config;
const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            level: process.env.DEBUG === "true" ? "debug" : "warn",
        }),
    ],
});

export class OPhaseApi {
    private static configureRoutes(app: express.Express) {
        logger.info("Configuring routes...");
        app.use("/person", new PersonRouter().personRouter);
        app.use("/version", versionRouter);
        app.use("/motto", mottoRouter);
        app.use("/config", configRouter);
        app.use("/login", loginRouter);
        app.use("/admin", adminRouter);
    }

    private static configureMiddleware(app: express.Express) {
        logger.info("Configuring middleware...");
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

    private static connectDB() {
        const dbName = process.env.DB_NAME;
        if (dbName === null) {
            logger.error("DB_NAME environment variable not defined!");
            logger.error("Could not connect to MongoDB!");
            process.exit(1);
        } else {
            logger.info("Connecting to the database...");
            return monk(dbUrl + dbName).then((result: any) => {
                db = result;
                logger.info("Connection to MongoDB successful.");
            }).catch(() => {
                logger.error("Could not connect to MongoDB!");
                process.exit(1);
            });
        }
    }

    private static async loadConfig() {
        try {
            const conf = yaml.safeLoad(fs.readFileSync("config.yml", "utf8"));
            logger.info("Successfully loaded config file.");
            logger.debug(JSON.stringify(conf, null, 4));
            config = conf;
        } catch (e) {
            logger.error("Failed to parse config file!", e);
            process.exit(1);
        }
    }

    private static configureErrorHandler() {
        logger.info("configuring error handling...");
    }

    constructor(private app: express.Express, private port: number, private host: string) {
        logger.info("Creating OPhaseApi object...");
        logger.warn(`Running in ${process.env.NODE_ENV} with DB ${process.env.DB_NAME}`);
    }

    public async initializeAPI() {
        OPhaseApi.configureLogger(this.app);
        await OPhaseApi.connectDB();
        await OPhaseApi.loadConfig();
        OPhaseApi.configureMiddleware(this.app);
        OPhaseApi.configureErrorHandler();
        OPhaseApi.configureRoutes(this.app);
    }

    public run() {
        this.app.listen(this.port, this.host);
    }
}

import * as express from "express";
import {OPhaseApi} from "./application";
import logger = require("./lib/logger");

let port: number = 5000;
const host: string = "127.0.0.1";
const porttemp = process.env.PORT;
if (typeof porttemp === "string") {
    port = Number.parseInt(porttemp);
}
logger.info("Version: ", process.env.npm_package_version, "\nInitializing Server...");
const api = new OPhaseApi(express(), port, host);
api.initializeAPI().then(() => {
        api.run();
        logger.info(`Listening on Port ${port}`);
    },
);

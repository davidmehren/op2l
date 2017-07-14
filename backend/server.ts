import * as express from "express";
import {OPhaseApi} from "./application";
import logger = require("./lib/logger");

let port: number = 5000;
let host: string = "127.0.0.1";
let porttemp = process.env.PORT;
if (typeof porttemp === "string") {
    port = Number.parseInt(porttemp);
}
logger.info("Version: ", process.env.npm_package_version, "\nInitializing Server...");
let api = new OPhaseApi(express(), port, host);
api.initializeAPI().then(() => {
        api.run();
        logger.info(`Listening on Port ${port}`);
    }
);

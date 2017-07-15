// tslint:disable-next-line:no-var-requires
const logger = require("winston");
logger.clear();
logger.add(
    logger.transports.Console, {
        colorize: true,
        json: false,
        level: process.env.DEBUG === "true" ? "debug" : "warning",
    });
export = logger;

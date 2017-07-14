let logger = require("winston");
logger.clear();
logger.add(
    logger.transports.Console, {
        json: false,
        colorize: true,
        level: process.env.DEBUG === "true" ? "debug" : "warning"
    });
export = logger;

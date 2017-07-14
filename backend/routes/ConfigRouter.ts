import * as express from "express";
import {config} from "../application";

let configRouter = express.Router();

configRouter.get("/", async (request: any, response: express.Response) => {
    response.send(config);
});

configRouter.get("/motto", async (request: any, response: express.Response) => {
    response.send({enabled: config.motto_suggestions.enabled});
});

configRouter.get("/registration", async (request: any, response: express.Response) => {
    response.send({enabled: config.teamer_registration.enabled});
});

configRouter.get("/trip", async (request: any, response: express.Response) => {
    response.send({enabled: config.teamer_trip.enabled});
});

export = configRouter;


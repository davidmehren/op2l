import * as express from "express";
import {Config} from "../model/Config";

export class ConfigRouter {
    public configRouter = express.Router();

    constructor(private config: Config) {
        this.configRouter.get("/", async (request: any, response: express.Response) => {
            const whiteList = {
                mottoSuggestions: {
                    enabled: config.mottoSuggestions.enabled,
                },
                recaptchaSiteKey: config.recaptchaSiteKey,
                teamerRegistration: {
                    enabled: config.teamerRegistration.enabled,
                },
                teamerTrip: {
                    enabled: config.teamerTrip.enabled,
                },
            };
            response.send(whiteList);
        });

        this.configRouter.get("/motto", async (request: any, response: express.Response) => {
            response.send({enabled: config.mottoSuggestions.enabled});
        });

        this.configRouter.get("/registration", async (request: any, response: express.Response) => {
            response.send({enabled: config.teamerRegistration.enabled});
        });

        this.configRouter.get("/trip", async (request: any, response: express.Response) => {
            response.send({enabled: config.teamerTrip.enabled});
        });
    }
}

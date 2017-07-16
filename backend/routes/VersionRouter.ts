import * as express from "express";
import {StaticConfig} from "../StaticConfig";

export class VersionRouter {
    public versionRouter = express.Router();

    constructor() {
        this.versionRouter.all("/", (request: any, response: express.Response) => {
            response.send(StaticConfig.version);
        });
    }
}

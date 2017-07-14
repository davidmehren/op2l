import * as express from "express";
import {StaticConfig} from "../StaticConfig";

let versionRouter = express.Router();

versionRouter.all("/", (request: any, response: express.Response) => {
    response.send(StaticConfig.version);
});

export = versionRouter;


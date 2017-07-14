import * as express from "express";
import {UserType} from "../model/UserTypes";
import {db} from "../application";

let adminRouter = express.Router();

adminRouter.use(async (request: any, response: express.Response, next: any) => {
    if (request.session.isLoggedIn && request.session.userType === UserType.Admin) {
        next();
    } else {
        response.sendStatus(401);
    }
});

adminRouter.get("/", async (request: any, response: express.Response) => {
    response.sendStatus(200);
});

adminRouter.get("/teamer", async (request: any, response: express.Response) => {
    let docs = await db.get("persons").find({});
    for (let i = 0; i < docs.length; i++) {
        delete docs[i]["_id"];
    }
    response.send(docs);
});

adminRouter.get("/mottos", async (request: any, response: express.Response) => {
    let docs = await db.get("mottos").find({});
    for (let i = 0; i < docs.length; i++) {
        delete docs[i]["_id"];
    }
    response.send(docs);
});

export = adminRouter;

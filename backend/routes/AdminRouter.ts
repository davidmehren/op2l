import * as express from "express";
import {UserType} from "../model/UserTypes";

const adminRouter = express.Router();

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
export = adminRouter;

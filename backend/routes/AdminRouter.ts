import * as express from "express";
import {UserType} from "../model/UserTypes";

export class AdminRouter {
    public adminRouter = express.Router();

    constructor() {
        this.adminRouter.use(async (request: any, response: express.Response, next: any) => {
            if (request.session.isLoggedIn && request.session.userType === UserType.Admin) {
                next();
            } else {
                response.sendStatus(401);
            }
        });

        this.adminRouter.get("/", async (request: any, response: express.Response) => {
            response.sendStatus(200);
        });
    }
}

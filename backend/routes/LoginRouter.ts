import * as bcrypt from "bcrypt";
import * as express from "express";
import {db} from "../application";
import {UserType} from "../model/UserTypes";

const loginRouter = express.Router();

loginRouter.post("/", async (request: any, response: express.Response) => {
    const username = request.body.username;
    const password = request.body.password;
    const user = await db.get("admins").findOne({username});
    if (user == null) {
        response.sendStatus(401);
        return;
    }
    if (!await bcrypt.compare(password, user.pw_hash)) {
        response.sendStatus(401);
        return;
    }
    request.session.isLoggedIn = true;
    request.session.userType = UserType.Admin;
    request.session.username = username;
    response.json({username, userType: UserType.Admin}).send();
});

loginRouter.delete("/", async (request: any, response: express.Response) => {
    request.session.destroy(() => {
        response.sendStatus(200);
    });
});

loginRouter.get("/", async (request: any, response: express.Response) => {
    if (request.session.isLoggedIn) {
        response.json({username: request.session.username, userType: request.session.userType}).send();
        return;
    }
    response.sendStatus(401);
});

export = loginRouter;

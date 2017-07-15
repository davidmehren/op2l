import * as express from "express";
import {Router} from "express";
import {config, db} from "../application";
import {Person} from "../model/Person";
import {isAdmin} from "../lib/LoginCheck";
import {isNullOrUndefined} from "util";

export class PersonRouter {
    ReCaptcha = require("recaptcha2");
    recaptcha: any;

    public personRouter: Router;

    constructor() {
        this.personRouter = express.Router();
        this.recaptcha = new this.ReCaptcha({
            siteKey: config.recaptchaSiteKey,
            secretKey: config.recpatchaSecretKey
        });


        this.personRouter.get("/me", async (request: any, response: express.Response) => {
            response.json(request.dbUser);
        });

        this.personRouter.post("/", async (request: any, response: express.Response) => {
            let personDb = db.get("persons");
            this.recaptcha.validate(request.body.captcha)
                .then(async () => {
                    let person: any = await Person.from_json(request.body, response);
                    delete person.captcha;
                    let result = await personDb.insert(person);
                    response.send(result);
                })
                .catch(() => {
                    response.sendStatus(400);
                });
        });

        this.personRouter.put("/", async (request: any, response: express.Response) => {
            if (!isAdmin(request)) {
                return response.sendStatus(401);
            }
            if (!isNullOrUndefined(request.body)) {
                let personDb = db.get("persons");
                // Try to find the object in the database.
                let person = await personDb.findOne({_id: request.body._id});
                if (person == null)
                    return response.sendStatus(404);
                personDb.update({_id: request.body._id}, request.body);
                return response.sendStatus(200);
            }
            return response.sendStatus(400);
        });

        /**
         * API to get a list of all persons
         * Only available to admins.
         */
        this.personRouter.get("/list", async (request: any, response: express.Response) => {
            // This route can only be accessed by admins.
            if (!isAdmin(request)) {
                return response.sendStatus(401);
            }
            // Just fetch all persons from the db and send them.
            let personDb = db.get("persons");
            return response.json(await personDb.find({}));

        });
    }

}

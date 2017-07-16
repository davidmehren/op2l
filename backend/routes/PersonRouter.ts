import * as express from "express";
import {Router} from "express";
import {isNullOrUndefined} from "util";
import {isAdmin} from "../lib/LoginCheck";
import {Config} from "../model/Config";
import {Person} from "../model/Person";

export class PersonRouter {
    public personRouter: Router;

    private ReCaptcha = require("recaptcha2");
    private recaptcha: any;

    constructor(private config: Config, private db: any) {
        this.personRouter = express.Router();
        this.recaptcha = new this.ReCaptcha({
            secretKey: config.recpatchaSecretKey,
            siteKey: config.recaptchaSiteKey,
        });

        this.personRouter.get("/me", async (request: any, response: express.Response) => {
            response.json(request.dbUser);
        });

        this.personRouter.post("/", async (request: any, response: express.Response) => {
            const personDb = db.get("persons");
            this.recaptcha.validate(request.body.captcha)
                .then(async () => {
                    const person: any = await Person.from_json(request.body, response, db);
                    delete person.captcha;
                    const result = await personDb.insert(person);
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
                const personDb = db.get("persons");
                // Try to find the object in the database.
                const person = await personDb.findOne({_id: request.body._id});
                if (person === null) {
                    return response.sendStatus(404);
                }
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
            const personDb = db.get("persons");
            return response.json(await personDb.find({}));

        });
    }

}

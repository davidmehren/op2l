import * as express from "express";
import {isAdmin} from "../lib/LoginCheck";

export class MottoRouter {
    public mottoRouter = express.Router();

    constructor(private db: any) {
        this.mottoRouter.post("/", (req, res) => {
            const mottodb = db.get("mottos");
            const body = req.body;
            mottodb.insert(body);
            res.send(body);
        });

        /**
         * API for getting the list of mottos.
         * Contains DB IDs if the user is admin.
         */
        this.mottoRouter.get("/list", async (req, res) => {
            const docs = await db.get("mottos").find({});
            if (!isAdmin(req)) {
                for (const motto of docs) {
                    delete motto._id;
                }
            }
            res.json(docs);
        });

    }
}

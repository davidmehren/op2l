import * as express from "express";
import {db} from "../application";
import {isAdmin} from "../lib/LoginCheck";

const mottoRouter = express.Router();

mottoRouter.post("/", (req, res) => {
    const mottodb = db.get("mottos");
    const body = req.body;
    mottodb.insert(body);
    res.send(body);
});

/**
 * API for getting the list of mottos.
 * Contains DB IDs if the user is admin.
 */
mottoRouter.get("/list", async (req, res) => {
    const docs = await db.get("mottos").find({});
    if (!isAdmin(req)) {
        for (const motto of docs) {
            delete motto._id;
        }
    }
    res.json(docs);
});

export = mottoRouter;

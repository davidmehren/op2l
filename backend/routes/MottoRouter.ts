import * as express from "express";
import {db} from "../application";
import {isAdmin} from "../lib/LoginCheck";


let mottoRouter = express.Router();

mottoRouter.post("/", (req, res) => {
    let mottodb = db.get("mottos");
    let body = req.body;
    mottodb.insert(body);
    res.send(body);
});

/**
 * API for getting the list of mottos.
 * Contains DB IDs if the user is admin.
 */
mottoRouter.get("/list", async (req, res) => {
    let docs = await db.get("mottos").find({});
    if (!isAdmin(req)) {
        for (let i = 0; i < docs.length; i++) {
            delete docs[i]["_id"];
        }
    }
    res.json(docs);
});


export = mottoRouter;
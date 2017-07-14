import * as express from "express";
import {db} from "../application";


let mottoRouter = express.Router();

mottoRouter.post("/", (req, res) => {
    let mottodb = db.get("mottos");
    let body = req.body;
    mottodb.insert(body);
    res.send(body);
});

mottoRouter.get("/list", async (req, res) => {
    let mottodb = db.get("mottos");
    let result = await mottodb.find({});
    res.send(result);
});


export = mottoRouter;
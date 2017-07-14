import * as express from "express";
import {db} from "../application";
import {Item} from "../model/Item";

let itemRouter = express.Router();

itemRouter.get("/", async (request: any, response: express.Response) => {
    let items = db.get("items").find({});
    response.send({items: items});
});

itemRouter.get("/:id", async (request: any, response: express.Response) => {
    let id = request.params.id;
    //TODO: Check ID
    let item = await db.get("items").findOne({_id: id});
    if (item == null)
        response.sendStatus(400);
    response.send(item);
});

itemRouter.post("/", async (request: any, response: express.Response) => {
    let itemDb = db.get("items");
    let name = request.body.name;
    if (name == "")
        response.sendStatus(400);
    let comment = request.body.comment;
    let item: Item = {
        name: name,
        comment: comment
    };
    let result = await itemDb.insert(item);
    response.send(result);
});

export = itemRouter;


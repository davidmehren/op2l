import * as express from "express";
import {Item} from "../model/Item";

export class ItemRouter {
    public itemRouter = express.Router();

    constructor(private db: any) {
        this.itemRouter.get("/", async (request: any, response: express.Response) => {
            const items = db.get("items").find({});
            response.send({items});
        });

        this.itemRouter.get("/:id", async (request: any, response: express.Response) => {
            const id = request.params.id;
            // TODO: Check ID
            const item = await db.get("items").findOne({_id: id});
            if (item === null) {
                response.sendStatus(400);
            }
            response.send(item);
        });

        this.itemRouter.post("/", async (request: any, response: express.Response) => {
            const itemDb = db.get("items");
            const name = request.body.name;
            if (name === "") {
                response.sendStatus(400);
            }
            const comment = request.body.comment;
            const item: Item = {
                comment,
                name,
            };
            const result = await itemDb.insert(item);
            response.send(result);
        });
    }
}

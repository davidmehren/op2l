import {Communication} from "./Communication";
import {Group} from "./Group";
import {Food} from "./Food";
import {Clothes} from "./Clothes";
import {db} from "../application";
import {Response} from "express";
import {MinorSubject} from "./MinorSubject";

export class Person {
    first_name: string;
    last_name: string;
    available_communication: Communication;
    languages: Array<string>;
    is_helper: boolean;
    prev_count: number;
    can_present: Array<MinorSubject>;
    food: Food;
    clothes: Clothes;
    has_car: {
        trip: boolean;
        ophase: boolean;
    };
    wants_trip: boolean;
    has_training: boolean;
    workgroups: Array<Group>;
    partner_wish: string;
    comment: string;

    /**
     * Creates Person object from JSON and checks if all fields are set. If not, automatically send error response and reject promise.
     * @param body Express.Request body
     * @param res Express.Response
     * @returns {Promise<any>}
     */
    static async from_json(body: any, res: Response) {
        return new Promise(async (resolve, reject) => {
            if (body.first_name === "") {
                reject();
                res.status(900).send("first_name");
            }
            if (body.last_name === "") {
                reject();
                res.status(900).send("last_name");
            }
            let items = await db.get("persons").find({"available_communication.email": body.available_communication.email});
            if (items.length > 0) {
                reject();
                res.status(901).send("email");
            }
            if (body.languages.length === 0) {
                reject();
                res.status(900).send("languages");
            }
            if (body.is_helper == null) {
                reject();
                res.status(900).send("is_helper");
            }
            if ((body.prev_count == null) || (body.prev_count < 0)) {
                reject();
                res.status(900).send("prev_count");
            }
            let can_present_faulty = false;
            for (let i = 0; i < body.can_present.length; i++) {
                if (!MinorSubject.isSubject(body.can_present[i])) {
                    can_present_faulty = true;
                }
            }
            if (can_present_faulty) {
                reject();
                res.status(902).send("can_present");
            }
            if (body.food.type == null) {
                reject();
                res.status(902).send("food.type");
            }
            if (body.clothes.size == null) {
                reject();
                res.status(902).send("clothes.size");
            }
            if (body.clothes.girlie == null) {
                reject();
                res.status(900).send("girlie");
            }
            if (body.has_car.trip == null) {
                reject();
                res.status(900).send("car.trip");
            }
            if (body.has_car.ophase == null) {
                reject();
                res.status(900).send("car.ophase");
            }
            if (body.wants_trip == null) {
                reject();
                res.status(900).send("wants_trip");
            }
            if (body.has_training == null) {
                reject();
                res.status(900).send("has_training");
            }
            resolve(body);
        });
    }
}

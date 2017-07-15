import {Response} from "express";
import {db} from "../application";
import {Clothes} from "./Clothes";
import {Communication} from "./Communication";
import {Food} from "./Food";
import {Group} from "./Group";
import {MinorSubject} from "./MinorSubject";

export class Person {
    /**
     * Creates Person object from JSON and checks if all fields are set.
     * If not, automatically send error response and reject promise.
     * @param body Express.Request body
     * @param res Express.Response
     * @returns {Promise<any>}
     */
    public static async from_json(body: any, res: Response) {
        return new Promise(async (resolve, reject) => {
            if (body.firstName === "") {
                reject();
                res.status(900).send("firstName");
            }
            if (body.lastName === "") {
                reject();
                res.status(900).send("lastName");
            }
            const items = await db.get("persons")
                .find({"available_communication.email": body.availableCommunication.email});
            if (items.length > 0) {
                reject();
                res.status(901).send("email");
            }
            if (body.languages.length === 0) {
                reject();
                res.status(900).send("languages");
            }
            if (body.isHelper == null) {
                reject();
                res.status(900).send("isHelper");
            }
            if ((body.prevCount == null) || (body.prevCount < 0)) {
                reject();
                res.status(900).send("prevCount");
            }
            let canPresentFaulty = false;
            for (const subject of body.canPresent) {
                if (!MinorSubject.isSubject(subject)) {
                    canPresentFaulty = true;
                }
            }
            if (canPresentFaulty) {
                reject();
                res.status(902).send("canPresent");
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
            if (body.hasCar.trip == null) {
                reject();
                res.status(900).send("car.trip");
            }
            if (body.hasCar.ophase == null) {
                reject();
                res.status(900).send("car.ophase");
            }
            if (body.wantsTrip == null) {
                reject();
                res.status(900).send("wantsTrip");
            }
            if (body.hasTraining == null) {
                reject();
                res.status(900).send("hasTraining");
            }
            resolve(body);
        });
    }

    public firstName: string;
    public lastName: string;
    public availableCommunication: Communication;
    public languages: string[];
    public isHelper: boolean;
    public prevCount: number;
    public canPresent: MinorSubject[];
    public food: Food;
    public clothes: Clothes;
    public hasCar: {
        trip: boolean;
        ophase: boolean;
    };
    public wantsTrip: boolean;
    public hasTraining: boolean;
    public workgroups: Group[];
    public partnerWish: string;
    public comment: string;
}

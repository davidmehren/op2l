import logger = require("./logger");
import {stringify} from "querystring";
import {db} from "../application";
import {Person} from "../model/Person";

export class PersonDb {
    public static async findPerson(userdata: any): Promise<Person> {
        logger.info("Searching for person:" + stringify(userdata));
        let persons = db.get("persons");
        return await persons.findOne({username: userdata.username});
    }
}

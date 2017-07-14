import {Room} from "./Room";
import {Item} from "./Item";
import {Person} from "./Person";
import {Group} from "./Group";

export class Event {
    start_date: Date;
    end_date: Date;
    rooms: Array<Room>;
    room_text: string;
    used_items: Array<Item>;
    used_groups: Array<Group>;
    used_persons: Array<Person>;
}
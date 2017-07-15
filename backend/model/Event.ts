import {Group} from "./Group";
import {Item} from "./Item";
import {Person} from "./Person";
import {Room} from "./Room";

export class Event {
    public startDate: Date;
    public endDate: Date;
    public rooms: Room[];
    public roomText: string;
    public usedItems: Item[];
    public usedGroups: Group[];
    public usedPersons: Person[];
}

import {Communication} from "./Communication";
import {Group} from "./Group";
import {MinorSubject} from "./MinorSubject";
import {Food} from "./Food";
import {Clothes} from "./Clothes";

/**
 * Created by philip on 06/11/2016.
 */
export class Person {
  _id?: string;
  first_name: string;
  last_name: string;
  available_communication: Communication = new Communication();
  languages: Array<string>;
  is_helper: boolean = false;
  prev_count: number = 0;
  can_present: Array<MinorSubject> = [];
  food: Food = new Food("", "");
  clothes: Clothes = new Clothes("", false);
  has_car = {
    trip: false,
    ophase: false
  };
  wants_trip: boolean = false;
  has_training: boolean = false;
  workgroups: Array<Group> = [];
  partner_wish: string;
  comment: string;
  captcha: string;
}

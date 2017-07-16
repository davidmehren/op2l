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
  firstName: string;
  lastName: string;
  availableCommunication: Communication = new Communication();
  languages: Array<string>;
  isHelper = false;
  prevCount = 0;
  canPresent: Array<MinorSubject> = [];
  food: Food = new Food("", "");
  clothes: Clothes = new Clothes("", false);
  hasCar = {
    trip: false,
    ophase: false
  };
  wantsTrip = false;
  hasTraining = false;
  workgroups: Group[] = [];
  partnerWish: string;
  comment: string;
  captcha: string;
}

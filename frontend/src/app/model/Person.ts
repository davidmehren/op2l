import {Communication} from "./Communication";
import {Group} from "./Group";
import {MinorSubject} from "./MinorSubject";
import {Food} from "./Food";
import {Clothes} from "./Clothes";

/**
 * Created by philip on 06/11/2016.
 */
export class Person {
  public _id?: string;
  public firstName: string;
  public lastName: string;
  public availableCommunication: Communication = new Communication();
  public languages: Array<string>;
  public isHelper = false;
  public prevCount = 0;
  public canPresent: Array<MinorSubject> = [];
  public food: Food = new Food("", "");
  public clothes: Clothes = new Clothes("", false);
  public hasCar = {
    trip: false,
    ophase: false
  };
  public wantsTrip = false;
  public hasTraining = false;
  public workgroups: Group[] = [];
  public partnerWish: string;
  public comment: string;
  public captcha: string;
}

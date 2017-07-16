import {UserType} from "./UserTypes";

export class User {
  public username: String;
  public type: UserType;
  public loggedIn: Boolean;


  constructor(username: String, type: UserType, loggedIn: Boolean) {
    this.username = username;
    this.type = type;
    this.loggedIn = loggedIn;
  }
}

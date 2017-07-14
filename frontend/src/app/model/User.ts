import {UserType} from "./UserTypes";

export class User {
  username: String;
  type: UserType;
  loggedIn: Boolean;


  constructor(username: String, type: UserType, loggedIn: Boolean) {
    this.username = username;
    this.type = type;
    this.loggedIn = loggedIn;
  }
}

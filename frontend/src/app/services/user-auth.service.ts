import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {User} from "../model/User";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserAuthService {

  private loginState: Subject<User> = new BehaviorSubject(null);

  constructor(private http: Http) {
  }

  login(username: String, password: String) {
    this.http.post(
      "api/login",
      JSON.stringify({username: username, password: password}),
      {headers: new Headers({"Content-Type": "application/json"})})
      .toPromise()
      .then((response: Response) => {
        if (response.ok) {
          this.loginState.next(new User(username, response.json().userType, true));
        } else {
          this.loginState.next(new User(username, null, false));
        }
      })
      .catch((error) => {
        this.loginState.next(new User(username, null, false));
      });
  }

  observable() {
    return this.loginState.asObservable();
  }

  logout() {
    this.http.delete("/api/login")
      .toPromise()
      .then((response: Response) => {
        if (response.ok) {
          this.loginState.next(null);
        } else {
          console.log("Hilfe! Ich kann mich nicht ausloggen!");
        }
      })
      .catch((error) => {
        console.log("Hilfe! Ich kann mich nicht ausloggen!");
      });
  }

  isLoggedIn() {
    // Check if we are already logged in by making a GET Request to /api/login
    this.http.get("/api/login")
      .toPromise()
      .then((response: Response) => {
        if (response.ok) {
          console.log("Detected that we are already logged in.");
          const json = response.json();
          this.loginState.next(new User(json.username, json.userType, true));
        }
      })
      .catch((error) => {

      });

  }

}

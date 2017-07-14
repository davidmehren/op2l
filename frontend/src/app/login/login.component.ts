import {Component, OnInit} from "@angular/core";
import {User} from "../model/User";
import {UserAuthService} from "../services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  state = 0;

  constructor(private authService: UserAuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.observable().subscribe(result => this.processLoginResult(result));
  }

  onSubmit() {
    this.authService.login(this.username, this.password);
    this.state = 1;
  }

  processLoginResult(user: User) {
    console.debug(`Got observable result: ${JSON.stringify(user)}`);
    if (user == null) {
      return;
    }
    if (user.loggedIn) {
      this.state = 2;
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 1500);
    } else {
      this.state = 3;
      this.password = "";
    }
  }

}

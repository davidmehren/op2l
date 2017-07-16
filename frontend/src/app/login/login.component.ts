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

  public username = "";
  public password = "";
  public state = 0;

  constructor(private authService: UserAuthService, private router: Router) {
  }

  public ngOnInit() {
    this.authService.observable().subscribe(result => this.processLoginResult(result));
  }

  public onSubmit() {
    this.authService.login(this.username, this.password);
    this.state = 1;
  }

  private processLoginResult(user: User) {
    if (user === null) {
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

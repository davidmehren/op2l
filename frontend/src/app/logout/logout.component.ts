import {Component, OnInit} from "@angular/core";
import {UserAuthService} from "../services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {

  constructor(private authService: UserAuthService, private router: Router) {
  }

  public ngOnInit() {
    this.authService.observable().subscribe(result => {
      if (result !== null) {
        console.log("Ignoring logged in user.");
      } else {
        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 1500);
      }
    });
    this.authService.logout();
  }

}

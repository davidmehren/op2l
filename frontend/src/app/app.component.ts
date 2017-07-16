import {Component, OnInit} from "@angular/core";
import {GlobalConfigService} from "./services/global-config.service";
import {Angulartics2Piwik} from "angulartics2";
import {UserAuthService} from "./services/user-auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  menuState = {
    teamerLogin: false,
    teamerReg: false,
    mottoSugg: false,
    loggedIn: false
  };


  ngOnInit(): void {
    this.gConfService.teamerRegistrationEnabled().then((res) => this.menuState.teamerReg = res);
    this.gConfService.teamerLoginEnabled().then((res) => this.menuState.teamerLogin = res);
    this.gConfService.mottoSuggestionsEnabled().then((res) => this.menuState.mottoSugg = res);
    this.authService.observable().subscribe((user) => {
      if (user === null) {
        this.menuState.loggedIn = false;
      } else if (user.loggedIn) {
        this.menuState.loggedIn = true;
      }
    });
    this.authService.isLoggedIn();
  }

  constructor(private gConfService: GlobalConfigService, a2piwik: Angulartics2Piwik, private authService: UserAuthService) {

  }

  public navCollapsed = true;


  teamerMenuEnabled() {
    return this.menuState.teamerLogin || this.menuState.teamerReg || false;
  }
}

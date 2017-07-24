import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class GlobalConfigService implements CanActivate {

  private enableTeamerLogin = false;

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    switch (route.url[0].path) {
      case "vorschlaege":
        const mottoEnabled = await this.mottoSuggestionsEnabled();
        if (!mottoEnabled) {
          // If motto suggestions are disabled, redirect to home page
          this.router.navigate(["/home"]);
          return false;
        }
        return true;
      case "teamer":
        switch (route.url[1].path) {
          case "anmeldung":
            const teamerEnabled = await this.teamerRegistrationEnabled();
            if (!teamerEnabled) {
              // If teamer registrations are disabled, redirect to home page
              this.router.navigate(["/home"]);
              return false;
            }
            return true;
        }
    }
    return undefined;
  }

  constructor(private router: Router, private http: Http) {
  }

  public mottoSuggestionsEnabled(): Promise<boolean> {
    return this.http.get("/api/config/motto").map((res: Response) => {
      const body = res.json();
      return body.enabled;
    }).toPromise();
  }

  public teamerRegistrationEnabled(): Promise<boolean> {
    return this.http.get("/api/config/registration").map((res: Response) => {
      const body = res.json();
      return body.enabled;
    }).toPromise();
  }

  public teamerTripEnabled(): Promise<boolean> {
    return this.http.get("/api/config/trip").map((res: Response) => {
      const body = res.json();
      return body.enabled;
    }).toPromise();
  }

  public teamerLoginEnabled(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.enableTeamerLogin);
    });
  }

  public appVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve("##APP_VERSION##");
    });
  }

  public recaptchaSiteKey(): Promise<string> {
    return this.http.get("/api/config/recaptchasitekey").map((res: Response) => {
      return res.json().key;
    }).toPromise();
  }
}

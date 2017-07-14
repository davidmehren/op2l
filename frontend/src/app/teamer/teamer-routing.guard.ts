import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {GlobalConfigService} from "../services/global-config.service";

@Injectable()
export class TeamerRoutingGuard implements CanActivate {
  constructor(private configService: GlobalConfigService, private router: Router) {

  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    switch (next.url[0].path) {
      case "anmeldung":
        const enabled = await this.configService.teamerRegistrationEnabled();
        if (!enabled) {
          // If teamer registrations are disabled, redirect to home page
          this.router.navigate(["/home"]);
          return false;
        }
        return true;
    }
    return undefined;
  }
}

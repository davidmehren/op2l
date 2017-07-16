import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class AdminRoutingGuard implements CanActivate {
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return true;
  }
}

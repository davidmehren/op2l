import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GlobalConfigService} from "../services/global-config.service";
import {VorschlaegeComponent} from "../vorschlaege/vorschlaege.component";
import {HomeComponent} from "../home/home.component";
import {ImpressumComponent} from "../impressum/impressum.component";
import {LoginComponent} from "../login/login.component";
import {LogoutComponent} from "../logout/logout.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    canActivate: [GlobalConfigService],
    path: "vorschlaege",
    component: VorschlaegeComponent
  },
  {path: "home", component: HomeComponent},
  {path: "impressum", component: ImpressumComponent},
  {
    path: "teamer",
    loadChildren: "app/teamer/teamer.module#TeamerModule"
  },
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "admin", loadChildren: "app/admin/admin.module#AdminModule"},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", component: PageNotFoundComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}

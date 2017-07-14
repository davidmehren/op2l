import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TeamerRegistrationComponent} from "./teamer-registration/teamer-registration.component";
import {TeamerRoutingGuard} from "./teamer-routing.guard";

const teamerRoutes: Routes = [
  {path: "anmeldung", canActivate: [TeamerRoutingGuard], component: TeamerRegistrationComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(teamerRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [TeamerRoutingGuard]
})
export class TeamerRoutingModule {
}

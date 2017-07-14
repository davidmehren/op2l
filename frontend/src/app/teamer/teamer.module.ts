import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TeamerRoutingModule} from "./teamer-routing.module";
import {TeamerComponent} from "./teamer.component";
import {PacmanLoaderModule} from "../pacman-loader/pacman-loader.module";
import {RecaptchaModule} from "ng-recaptcha";
import {RecaptchaFormsModule} from "ng-recaptcha/forms";
import {FormsModule} from "@angular/forms";
import {TeamerRegistrationFormComponent} from "./teamer-registration/teamer-registration-form/teamer-registration-form.component";
import {TeamerRegistrationComponent} from "./teamer-registration/teamer-registration.component";
import {TeamerRegistrationService} from "./teamer-registration/services/teamer-registration.service";

@NgModule({
  imports: [
    CommonModule,
    TeamerRoutingModule,
    FormsModule,
    RecaptchaFormsModule,
    RecaptchaModule.forRoot(),
    PacmanLoaderModule
  ],
  declarations: [TeamerComponent, TeamerRegistrationComponent, TeamerRegistrationFormComponent],
  providers: [TeamerRegistrationService]
})
export class TeamerModule {
}

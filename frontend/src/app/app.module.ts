import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {AccordionModule, CollapseModule} from "ngx-bootstrap";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {VorschlaegeComponent} from "./vorschlaege/vorschlaege.component";
import {VorschlagFormComponent} from "./vorschlaege/vorschlag-form/vorschlag-form.component";
import {MottoVorschlaegeService} from "./services/motto-vorschlaege.service";
import {GlobalConfigService} from "./services/global-config.service";
import {Angulartics2Module, Angulartics2Piwik} from "angulartics2";
import {ImpressumComponent} from "./impressum/impressum.component";
import {LoginComponent} from "./login/login.component";
import {UserAuthService} from "./services/user-auth.service";
import {LogoutComponent} from "./logout/logout.component";
import {PacmanLoaderModule} from "./pacman-loader/pacman-loader.module";
import {AppRoutingModule} from "./app-routing/app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    VorschlaegeComponent,
    VorschlagFormComponent,
    ImpressumComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2Piwik]),
    AppRoutingModule,
    PacmanLoaderModule
  ],
  providers: [
    MottoVorschlaegeService,
    GlobalConfigService,
    UserAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

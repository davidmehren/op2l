import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {AdminMottoListComponent} from "./admin-motto-list/admin-motto-list.component";
import {AdminPersonListComponent} from "./admin-person-list/admin-person-list.component";
import {AdminPersonService} from "./services/admin-persons.service";
import {DataTablesModule} from "angular-datatables";
import {ModalModule, TabsModule} from "ngx-bootstrap";
import {PersonEditComponent} from "./admin-person-list/person-edit/person-edit.component";
import {FormsModule} from "@angular/forms";
import {PacmanLoaderModule} from "../pacman-loader/pacman-loader.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    PacmanLoaderModule
  ],
  declarations: [AdminComponent, AdminMottoListComponent, AdminPersonListComponent, PersonEditComponent],
  providers: [AdminPersonService]
})
export class AdminModule {
}

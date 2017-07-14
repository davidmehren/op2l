import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {RouterModule} from "@angular/router";
import {AdminMottoListComponent} from "./admin-motto-list/admin-motto-list.component";
import {AdminPersonListComponent} from "./admin-person-list/admin-person-list.component";

const adminRoutes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        children: [
          {path: "mottos", component: AdminMottoListComponent},
          {path: "persons", component: AdminPersonListComponent},
          {path: "", redirectTo: "mottos", pathMatch: "full"}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule {
}

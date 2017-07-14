import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PacmanLoaderComponent} from "./pacman-loader.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PacmanLoaderComponent],
  exports: [PacmanLoaderComponent]
})
export class PacmanLoaderModule {
}

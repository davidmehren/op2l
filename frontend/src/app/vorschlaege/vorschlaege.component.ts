import {Component, OnInit} from "@angular/core";
import {MottoVorschlag} from "../model/motto-vorschlag";
import {MottoVorschlaegeService} from "../services/motto-vorschlaege.service";

@Component({
  selector: "app-vorschlaege",
  templateUrl: "./vorschlaege.component.html",
  styleUrls: ["./vorschlaege.component.css"]
})
export class VorschlaegeComponent implements OnInit {
  vorschlagList: Array<MottoVorschlag> = [];

  constructor(private mottoService: MottoVorschlaegeService) {
  }

  ngOnInit() {
    this.mottoService
      .getMottos()
      .subscribe(
        mottos => this.vorschlagList = mottos,
        error => console.log(error)
      );
  }

}

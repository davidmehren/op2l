import {Component, OnInit} from "@angular/core";
import {MottoVorschlag} from "../model/MottoVorschlag";
import {MottoVorschlaegeService} from "../services/motto-vorschlaege.service";

@Component({
  selector: "app-vorschlaege",
  templateUrl: "./vorschlaege.component.html",
  styleUrls: ["./vorschlaege.component.css"]
})
export class VorschlaegeComponent implements OnInit {
  public vorschlagList: Array<MottoVorschlag> = [];

  constructor(private mottoService: MottoVorschlaegeService) {
  }

  public ngOnInit() {
    this.mottoService
      .getMottos()
      .subscribe(
        mottos => this.vorschlagList = mottos,
        error => console.log(error)
      );
  }

}

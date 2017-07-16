import {Component, Input, OnInit} from "@angular/core";
import {MottoVorschlag} from "../../model/motto-vorschlag";
import {MottoVorschlaegeService} from "../../services/motto-vorschlaege.service";

@Component({
  selector: "app-vorschlag-form",
  templateUrl: "./vorschlag-form.component.html",
  styleUrls: ["./vorschlag-form.component.css"]
})
export class VorschlagFormComponent implements OnInit {
  model = new MottoVorschlag("");
  @Input()
  vorschlagsList: Array<MottoVorschlag>;
  submitState = 0;

  constructor(private mottoService: MottoVorschlaegeService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("SUBMIT!");
    this.mottoService
      .addMotto(this.model.motto, this.model.name)
      .subscribe(
        motto => this.onSubmitSuccess(motto),
        error => this.onSubmitError(error)
      );
    return false;
  }

  onSubmitSuccess(motto: MottoVorschlag) {
    this.vorschlagsList.push(motto);
    this.submitState = 1;
  }

  onSubmitError(error: any) {
    this.submitState = 3;
  }

  resetForm() {
    if (this.submitState !== 3) {
      this.model.motto = "";
    }
    this.submitState = 0;
  }

}

import {Component, Input, OnInit} from "@angular/core";
import {MottoVorschlag} from "../../model/MottoVorschlag";
import {MottoVorschlaegeService} from "../../services/motto-vorschlaege.service";

@Component({
  selector: "app-vorschlag-form",
  templateUrl: "./vorschlag-form.component.html",
  styleUrls: ["./vorschlag-form.component.css"]
})
export class VorschlagFormComponent implements OnInit {
  public model = new MottoVorschlag("");
  // noinspection JSMismatchedCollectionQueryUpdate
  @Input()
  public vorschlagsList: Array<MottoVorschlag>;
  public submitState = 0;

  constructor(private mottoService: MottoVorschlaegeService) {
  }

  public ngOnInit() {
  }

  public onSubmit() {
    this.mottoService
      .addMotto(this.model.motto, this.model.name)
      .subscribe(
        motto => this.onSubmitSuccess(motto),
        error => this.onSubmitError(error)
      );
    return false;
  }

  public onSubmitSuccess(motto: MottoVorschlag) {
    this.vorschlagsList.push(motto);
    this.submitState = 1;
  }

  public onSubmitError(error: any) {
    this.submitState = 3;
  }

  public resetForm() {
    if (this.submitState !== 3) {
      this.model.motto = "";
    }
    this.submitState = 0;
  }

}

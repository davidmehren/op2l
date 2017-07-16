import {Component, OnInit} from "@angular/core";
import {Person} from "../../../model/Person";
import {MinorSubject} from "../../../model/MinorSubject";
import {Food} from "../../../model/Food";
// import { ClothesSizeString } from "../../../model/Clothes";
import {Group} from "../../../model/Group";
import {TeamerRegistrationService} from "../services/teamer-registration.service";
import {GlobalConfigService} from "../../../services/global-config.service";
import {Angulartics2} from "angulartics2";
import {Clothes} from "../../../model/Clothes";
import {Language} from "../../../model/Languages";

@Component({
  selector: "app-teamer-registration-form",
  templateUrl: "./teamer-registration-form.component.html",
  styleUrls: ["./teamer-registration-form.component.css"]
})
export class TeamerRegistrationFormComponent implements OnInit {
  public model: Person = new Person();
  public tempClotheSize: string;
  public subjectList = MinorSubject.subjectList;
  public langList = Language.languages;
  public foodTypeList = Food.typeList;
  public clothesSizeList = Clothes.sizeList;
  public workGroupList = Group.workGroups;
  public enableTeamerTrip = false;
  public submitState = 0;
  public loading = false;
  public siteKey = "";

  constructor(private tRegService: TeamerRegistrationService,
              private gConfService: GlobalConfigService, private angulartics2: Angulartics2) {
  }

  public ngOnInit() {
    this.gConfService.teamerTripEnabled().then((res) => this.enableTeamerTrip = res);
    this.gConfService.recaptchaSiteKey().then(res => this.siteKey = res);
  }


  public onSubmit(event: any) {
    event.preventDefault();
    this.loading = true;
    this.tRegService.addPerson(this.model)
      .subscribe(
        () => this.onSubmitSuccess(),
        error => this.onSubmitError(error)
      );
    this.angulartics2.eventTrack.next({action: "teamer-registration-submit", properties: {category: "teamer"}});
    return false;
  }

  public onSubmitSuccess() {
    this.angulartics2.eventTrack.next({action: "teamer-registration-success", properties: {category: "teamer"}});
    this.submitState = 1;
    this.loading = false;
  }

  public onSubmitError(error: any) {
    if (error.status === 901) {
      this.submitState = 2;
      this.angulartics2.eventTrack.next({action: "teamer-registration-duplicate", properties: {category: "teamer"}});
    } else {
      this.submitState = 3;
      this.angulartics2.eventTrack.next({action: "teamer-registration-error", properties: {category: "teamer"}});
    }
    this.loading = false;
  }

  public resetForm() {
    if (this.submitState !== 3) {
      this.model = new Person();
      this.tempClotheSize = undefined;
    }
    this.submitState = 0;
  }
}

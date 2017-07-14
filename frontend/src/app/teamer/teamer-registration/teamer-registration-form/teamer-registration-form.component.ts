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
  model: Person = new Person();
  tempClotheSize: string;
  subjectList = MinorSubject.subjectList;
  langList = Language.languages;
  foodTypeList = Food.typeList;
  clothesSizeList = Clothes.sizeList;
  workGroupList = Group.workGroups;
  enableTeamerTrip = false;
  submitState: number = 0;
  loading = false;
  siteKey = "";

  constructor(private tRegService: TeamerRegistrationService, private gConfService: GlobalConfigService, private angulartics2: Angulartics2) {
  }

  ngOnInit() {
    this.gConfService.teamerTripEnabled().then((res) => this.enableTeamerTrip = res);
    this.gConfService.recaptchaSiteKey().then(res => this.siteKey = res);
  }


  public onSubmit(event: any) {
    event.preventDefault();
    this.loading = true;
    //this.model.food.type = this.foodTypeList.indexOf(this.model.food.type);
    //this.model.clothes.size = this.clothesSizeList.indexOf(this.tempClotheSize);
    this.tRegService.addPerson(this.model)
      .subscribe(
        () => this.onSubmitSuccess(),
        error => this.onSubmitError(error)
      );
    this.angulartics2.eventTrack.next({action: "teamer-registration-submit", properties: {category: "teamer"}});
    //this.model.food.type = this.foodTypeList[this.model.food.type];
    //this.model.clothes.size = this.clothesSizeList[this.model.clothes.size];
    return false;
  }

  onSubmitSuccess() {
    this.angulartics2.eventTrack.next({action: "teamer-registration-success", properties: {category: "teamer"}});
    this.submitState = 1;
    this.loading = false;
  }

  onSubmitError(error: any) {
    if (error.status == 901) {
      this.submitState = 2;
      this.angulartics2.eventTrack.next({action: "teamer-registration-duplicate", properties: {category: "teamer"}});
    }
    else {
      this.submitState = 3;
      this.angulartics2.eventTrack.next({action: "teamer-registration-error", properties: {category: "teamer"}});
    }
    this.loading = false;
  }

  resetForm() {
    if (this.submitState != 3) {
      this.model = new Person();
      this.tempClotheSize = undefined;
    }
    this.submitState = 0;
  }
}

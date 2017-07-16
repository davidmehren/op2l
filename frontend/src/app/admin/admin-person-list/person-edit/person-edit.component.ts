import {Component, Input, OnInit} from "@angular/core";
import {Person} from "../../../model/Person";
import {Group} from "../../../model/Group";
import {MinorSubject} from "../../../model/MinorSubject";
import {Language} from "../../../model/Languages";
import {Food} from "../../../model/Food";
import {Clothes} from "../../../model/Clothes";
import {GlobalConfigService} from "../../../services/global-config.service";
import {AdminPersonService} from "../../services/admin-persons.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: "app-person-edit",
  templateUrl: "./person-edit.component.html",
  styleUrls: ["./person-edit.component.css"]
})
export class PersonEditComponent implements OnInit {

  @Input()
  public person: Person;

  @Input()
  public modal: ModalDirective;

  public loading = false;
  public submitState = 0;

  public subjectList = MinorSubject.subjectList;
  public langList = Language.languages;
  public foodTypeList = Food.typeList;
  public clothesSizeList = Clothes.sizeList;
  public workGroupList = Group.workGroups;

  public enableTeamerTrip = false;

  constructor(private gConfService: GlobalConfigService, private personService: AdminPersonService) {
    this.gConfService.teamerTripEnabled().then((res) => this.enableTeamerTrip = res);
  }

  public ngOnInit() {
  }

  public onSubmit(event: any) {
    event.preventDefault();
    this.loading = true;
    this.personService.updatePerson(this.person)
      .subscribe(response => {
        this.loading = false;
        this.modal.hide();
      }, error => {
        console.log(error);
      });

  }

}

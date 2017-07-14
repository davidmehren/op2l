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
  person: Person;

  @Input()
  modal: ModalDirective;

  loading: boolean = false;
  submitState: number = 0;

  subjectList = MinorSubject.subjectList;
  langList = Language.languages;
  foodTypeList = Food.typeList;
  clothesSizeList = Clothes.sizeList;
  workGroupList = Group.workGroups;

  enableTeamerTrip = false;

  constructor(private gConfService: GlobalConfigService, private personService: AdminPersonService) {
    this.gConfService.teamerTripEnabled().then((res) => this.enableTeamerTrip = res);
  }

  ngOnInit() {
  }

  onSubmit(event: any) {
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

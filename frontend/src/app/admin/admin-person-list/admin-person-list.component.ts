import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {AdminPersonService} from "../services/admin-persons.service";
import {Person} from "../../model/Person";
import {Subject} from "rxjs/Subject";
import {ModalDirective} from "ngx-bootstrap";
import {DataTableDirective} from "angular-datatables";
import {isNullOrUndefined} from "util";

@Component({
  selector: "app-admin-person-list",
  templateUrl: "./admin-person-list.component.html",
  styleUrls: ["./admin-person-list.component.css"]
})
export class AdminPersonListComponent implements OnInit, AfterViewInit {

  @ViewChild("editModal")
  public editModal: ModalDirective;
  public isEditModalShown = false;
  public personToEdit: Person;

  @ViewChild("deleteModal")
  public deleteModal: ModalDirective;
  public isDeleteModalShown = false;

  public dtTrigger: Subject<any> = new Subject();
  public personList: Person[] = [];

  // noinspection JSUnusedGlobalSymbols
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;

  public dtOptions: any = {
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/German.json"
    },
    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      const self = this;
      // Unbind first in order to avoid any duplicate handler
      // (see https://github.com/l-lin/angular-datatables/issues/87)
      $("td", row).off("click");
      $("td", row).on("click", (eventObject) => {
        self.rowClickHandler(data, eventObject);
      });
      return row;
    },
    columns: [
      {data: "firstName"},
      {data: "lastName"},
      {data: "availableCommunication.email"},
      {data: "availableCommunication.telephone", visible: false},
      {data: "availableCommunication.telegram", render: (data => data ? "✓" : "✗"), visible: false},
      {data: "languages", visible: false},
      {
        data: "isHelper",
        render: (data => data ? "✓" : "✗")
      },
      {data: "prevCount", visible: false},
      {data: "canPresent", visible: false},
      {
        data: "food",
        render: ((data, t, row) => {
          if (!isNullOrUndefined(data.comment)) {
            return data.type + " <b>" + data.comment + "</b>";
          } else {
            return data.type;
          }
        }),
        visible: false
      },
      {
        data: "clothes",
        render: ((data, t, row) => {
          return data.girlie ? data.size + " <b>Girlie</b>" : data.size;
        }), visible: false
      },
      {data: "hasCar.trip", render: (data => data ? "✓" : "✗"), visible: false},
      {data: "hasCar.trip", render: (data => data ? "✓" : "✗"), visible: false},
      {data: "wantsTrip", render: (data => data ? "✓" : "✗"), visible: false},
      {data: "hasTraining", render: (data => data ? "✓" : "✗"), visible: false},
      {data: "workgroups", visible: false},
      {data: "partnerWish"},
      {data: "comment"},
      {
        data: null,
        orderable: false,
        render: ((data, t, row) =>
          "<button type=\"button\" id=\"edit\" class=\"btn btn-primary btn-sm\"\">Bearbeiten</a>" +
          "<button type=\"button\" id=\"delete\" class=\"btn btn-danger btn-sm ml-1\"\">Löschen</a>")
      }
    ],
    dom: "<'row mt-3'<'col-sm-3 d-flex align-items-center'l><'col-sm-3'B><'col-sm-6'f>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-5'i><'col-sm-7'p>>",
    // Configure the buttons
    buttons: {
      buttons: [
        {extend: "copy", className: "btn-sm"},
        {
          extend: "csv",
          className: "btn-sm",
          exportOptions: {
            columns: ( idx, data, node ) => {
              return node.getAttribute("aria-label") !== "Button";
            }
          }
        },
        {extend: "colvis", className: "btn-sm"}
      ]
    },
    lengthChange: true
  };

  constructor(private personService: AdminPersonService) {
  }

  public ngAfterViewInit(): void {
    $(() => {
      const table: any = $("#example").DataTable();
      table.buttons().container().appendTo("#personTableWrapper .col-md-6:eq(0)");
    });
  }


  public ngOnInit() {
    this.personService.getPersons().subscribe(
      pList => {
        // Update my list (do we still need this?)
        this.personList = pList;
        // update table data
        this.dtOptions.data = pList;
        // render table
        this.dtTrigger.next();
      },
      error => console.log(error)
    );
  }

  public rowClickHandler(data: any, event) {
    if (event.target.id === "edit") {
      this.personToEdit = data;
      this.showEditModal();
    }
    if (event.target.id === "delete") {
      this.personToEdit = data;
      this.showDeleteModal();
    }
  }

  public showDeleteModal(): void {
    this.isDeleteModalShown = true;
  }

  public hideDeleteModal(): void {
    this.deleteModal.hide();
  }

  public onDeleteHidden(): void {
    this.isDeleteModalShown = false;
  }


  public showEditModal(): void {
    this.isEditModalShown = true;
  }

  public hideEditModal(): void {
    this.editModal.hide();
  }

  public onEditHidden(): void {
    this.isEditModalShown = false;
  }
}

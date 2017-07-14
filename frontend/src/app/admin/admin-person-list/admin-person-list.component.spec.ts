import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AdminPersonListComponent} from "./admin-person-list.component";

describe("AdminPersonListComponent", () => {
  let component: AdminPersonListComponent;
  let fixture: ComponentFixture<AdminPersonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

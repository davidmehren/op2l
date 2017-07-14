import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AdminMottoListComponent} from "./admin-motto-list.component";

describe("AdminMottoListComponent", () => {
  let component: AdminMottoListComponent;
  let fixture: ComponentFixture<AdminMottoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMottoListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMottoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

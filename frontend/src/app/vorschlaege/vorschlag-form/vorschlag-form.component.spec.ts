/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {VorschlagFormComponent} from "./vorschlag-form.component";

describe("VorschlagFormComponent", () => {
  let component: VorschlagFormComponent;
  let fixture: ComponentFixture<VorschlagFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VorschlagFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VorschlagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

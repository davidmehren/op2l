/* tslint:disable:no-unused-variable */

import {inject, TestBed} from "@angular/core/testing";
import {MottoVorschlaegeService} from "./motto-vorschlaege.service";

describe("Service: MottoVorschlaege", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MottoVorschlaegeService]
    });
  });

  it("should ...", inject([MottoVorschlaegeService], (service: MottoVorschlaegeService) => {
    expect(service).toBeTruthy();
  }));
});

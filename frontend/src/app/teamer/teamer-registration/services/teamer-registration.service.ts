import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Person} from "../../../model/Person";
import "rxjs/add/operator/map";

@Injectable()
export class TeamerRegistrationService {

  constructor(private http: Http) {
  }

  private personUrl = "/api/person";


  public addPerson(person: Person): Observable<Person> {
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.personUrl, person, options)
      .map(TeamerRegistrationService.extractData);
  }

  private static extractData(res: Response): Person {
    const body = res.json();
    return body || {};
  }

  private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || "";
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

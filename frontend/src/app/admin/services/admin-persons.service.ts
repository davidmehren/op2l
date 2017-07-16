import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response, } from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Person} from "../../model/Person";

@Injectable()
export class AdminPersonService {

  constructor(private http: Http) {
  }

  private personListUrl = "api/person/list";
  private personUrl = "api/person";


  public getPersons(): Observable<Person[]> {
    return this.http.get(this.personListUrl)
      .map(AdminPersonService.extractData)
      .catch(AdminPersonService.handleError);
  }

  public addPerson(motto: string, name: string): Observable<Person> {
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.personUrl, {motto, name}, options)
      .map(AdminPersonService.extractData)
      .catch(AdminPersonService.handleError);
  }

  public updatePerson(person: Person): Observable<Response> {
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    return this.http.put(this.personUrl, person, options);
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

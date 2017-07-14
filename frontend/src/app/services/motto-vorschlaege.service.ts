import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {MottoVorschlag} from "../model/motto-vorschlag";

@Injectable()
export class MottoVorschlaegeService {

  constructor(private http: Http) {
  }

  private mottoListUrl = "api/motto/list";
  private mottoUrl = "api/motto";


  getMottos(): Observable<MottoVorschlag[]> {
    return this.http.get(this.mottoListUrl)
      .map(MottoVorschlaegeService.extractData)
      .catch(MottoVorschlaegeService.handleError);
  }

  addMotto(motto: string, name: string): Observable<MottoVorschlag> {
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.mottoUrl, {motto, name}, options)
      .map(MottoVorschlaegeService.extractData)
      .catch(MottoVorschlaegeService.handleError);
  }

  private static extractData(res: Response): MottoVorschlag {
    let body = res.json();
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

import { map, catchError } from "rxjs/operators";
import { Http } from "@angular/http";
import { environment } from "./../environments/environment";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PoiService {
  options: object = { withCredentials: true };
  url: string = environment.BASEURL;

  constructor(private http: Http) {}

  errorHandler(e) {
    console.log("PoiServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAll(id: any) {
    return this.http.get(`${this.url}/api/poi/${id}`, this.options).pipe(
      map(res => res.json()),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  getTrip(id: any) {
    return this.http.get(`${this.url}/api/trips/trip/${id}`, this.options).pipe(
      map(res => res.json()),
      catchError(e => of(this.errorHandler(e)))
    );
  }
  deletePoi(index,  tripId, tripDay) {
    return this.http
      .post(
        `${this.url}/api/poi/delete`,
        { index, tripId, tripDay},
        this.options
      )
      .pipe(
        map(res => res.json()),
        catchError(e => of(this.errorHandler(e)))
      );
  }
}

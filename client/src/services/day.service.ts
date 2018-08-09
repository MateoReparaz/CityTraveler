import { Http } from "@angular/http";
import { environment } from "./../environments/environment";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import "rxjs";

@Injectable({
  providedIn: "root"
})
export class DayService {
  options: object = { withCredentials: true };
  url: string = environment.BASEURL;

  constructor(private http: Http) {}

  errorHandler(e) {
    console.log("TripsServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
  getTrip(id: string) {
    return this.http.get(`${this.url}/api/poi/trip/${id}`, this.options).pipe(
      map(res => res.json()),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  getDay(idDay: string, idTrip: string) {
    return this.http
      .get(`${this.url}/api/trips/day/${idDay}/${idTrip}`, this.options)
      .pipe(
        map(res => res.json()),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getData(origin, destination) {
    return this.http
      .post(
        `${this.url}/api/day/data`,
        { origin, destination },
        this.options
      )
      .pipe(
        map(res => res.json()),
        catchError(e => of(this.errorHandler(e)))
      );
  }
}

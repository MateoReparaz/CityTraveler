import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TripsService {
  options: object = { withCredentials: true };
  url: string = environment.BASEURL;

  constructor(private http: Http) {}

  errorHandler(e) {
    console.log("TripsServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAll() {
    return this.http
      .get(`${this.url}/api/trips`, this.options)
      .pipe(map(res => res.json()));
  }

  newTrip(country, city, start, end) {
    return this.http
      .post(
        `${this.url}/api/trips`,
        { country, city, start, end },
        this.options
      )
      .pipe(
        map(res => res.json()),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  updateTrip(poi, tripDay, tripId) {
    return this.http
      .post(
        `${this.url}/api/trips/trip/update`,
        { poi, tripDay, tripId },
        this.options
      )
      .pipe(
        map(res => res.json()),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getById(id: string) {
    return this.http
      .get(`${this.url}/api/trips/${id}`, this.options)
      .pipe(map(res => res.json()));
  }

  createTrip() {
    return this.http
      .post(
        `${this.url}/api/trips/create`,
        {
          /*actualizar el viaje incluyendo los pois*/
        },
        this.options
      )
      .pipe(map(res => res.json()));
  }
}

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const url = environment.BASEURL;

@Injectable({
  providedIn: "root"
})
export class TripsService {
  options: object = { withCredentials: true };
  constructor(private http: Http) {}

  errorHandler(e) {
    console.log("TripsServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAll() {
    return this.http
      .get(`${url}/api/trips`, this.options)
      .pipe(map(res => res.json()));
  }

  createTrip(title: string, content: string) {
    return this.http
      .post(
        `${url}/api/trips/new`,
        {
          /* ............... */
        },
        this.options
      )
      .pipe(map(res => res.json()));
  }

  getById(id: string) {
    return this.http
      .get(`${url}/api/trips/${id}`, this.options)
      .pipe(map(res => res.json()));
  }

  newTrip(country, city, start, end) {
    return this.http
      .post(`${url}/api/trips`, { country, city, start, end }, this.options)
      .pipe(map(res => res.json()),
      catchError(e => of(this.errorHandler(e)))
    )
      
  }
}

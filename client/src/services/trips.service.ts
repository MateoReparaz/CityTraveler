
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs";
import { map } from "rxjs/operators";

const url = environment.BASEURL;

@Injectable({
  providedIn: "root"
})
export class TripsService {
  options: object = { withCredentials: true };
  constructor(private http: Http) {}
  getAll() {
    return this.http
      .get(`${url}/api/trips`, this.options)
      .pipe(map(res => res.json()));
  }
  createThread(title: string, content: string) {
    return this.http
      .post(`${url}/api/trips/new`, {/* ............... */ }, this.options)
      .pipe(map(res => res.json()));
  }
  getById(id: string) {
    return this.http
      .get(`${url}/api/trips/${id}`, this.options)
      .pipe(map(res => res.json()));
  }
}
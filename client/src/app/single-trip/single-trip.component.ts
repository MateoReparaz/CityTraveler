import { PoiService } from './../../services/poi.service';
import { ActivatedRoute } from "@angular/router";
import { DayService } from "./../../services/day.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-single-trip",
  templateUrl: "./single-trip.component.html",
  styleUrls: ["./single-trip.component.scss"]
})
export class SingleTripComponent implements OnInit {
  trip: any;
  pois: Array<any>;
  markers = [{}];
  lat: number;
  lng: number;

  constructor(public dayService: DayService, public poiService: PoiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.dayService.getTrip(params.id).subscribe(trip => {
        this.trip = trip;
      })
    );
    this.route.params.subscribe(params =>
      this.poiService.getAll(params.id).subscribe(pois => {
        this.pois = pois;
        this.lat = this.pois[0].location.lat;
        this.lng = this.pois[0].location.lng;
        this.createMarker();
      })
    );
  }

  createMarker() {
    this.pois.forEach(element => {
      this.markers.push({
        lat: element.location.lat,
        lng: element.location.lng,
        draggable: false,
        name: element.name,
        img: element.thumbnail_url,
        info: element.perex,
        duration:element.duration,
      });
    });
  }
}

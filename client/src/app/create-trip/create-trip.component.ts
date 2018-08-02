import { marker } from "../../interfaces/markers";
import { Component, OnInit } from "@angular/core";
import { PoiService } from "../../services/poi.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-create-trip",
  templateUrl: "./create-trip.component.html",
  styleUrls: ["./create-trip.component.scss"]
})
export class CreateTripComponent implements OnInit {

  pois: Array<any>;
  markers = [{}];
  lat: number  
  lng: number  
  zoom: number = 14;

  constructor(public poiService: PoiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.poiService.getAll(params.id).subscribe(pois => {
        this.pois = pois;
        this.lat = this.pois[1].location.lat;
        this.lng = this.pois[1].location.lng;
        console.log(this.pois)
        this.createMarker();
      })
    );
  }
  createMarker() {
    this.pois.forEach(element => {
      this.markers.push({
        lat: element.location.lat,
        lng: element.location.lng,
        label: (Math.round( element.rating * 10 ) / 10 ).toString(),
        draggable: false
      });
    });
  }
}
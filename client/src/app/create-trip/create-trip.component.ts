import { TripsService } from "./../../services/trips.service";
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
  lat: number;
  lng: number;
  zoom: number = 14;
  trip: object;
  /*   labelOptions = {
color: '#CC0000',
fontFamily: '',
fontSize: '14px',
fontWeight: 'bold',
text: 'Some Text',
} */

  constructor(
    public poiService: PoiService,
    public tripsService: TripsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.poiService.getAll(params.id).subscribe(pois => {
        this.pois = pois;
        this.lat = this.pois[0].location.lat;
        this.lng = this.pois[0].location.lng;

        this.createMarker();
      })
    );

    this.route.params.subscribe(params =>
      this.poiService.getTrip(params.id).subscribe(trip => {
        this.trip = trip;
      })
    );
  }
  createMarker() {
    this.pois.forEach(element => {
      this.markers.push({
        lat: element.location.lat,
        lng: element.location.lng,
        /* label: (Math.round( element.rating * 10 ) / 10 ).toString(), */
        draggable: false,
        name: element.name,
        img: element.thumbnail_url,
        info: element.perex,
        id: element.id
      });
    });
  }

  updateTrip(id, date) {
    // const schedule = {tripId: req.params.id, poiId, tripDay}
   
    this.route.params.subscribe(params =>
      this.tripsService.updateTrip(id, date, params.id).subscribe(() => {
        
        console.log("todo ok", params.id);
      })
    );
  }
}

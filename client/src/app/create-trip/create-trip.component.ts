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
  lastSelectedInfoWindow: any;
  save: any;
  pattern;
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
        /* label:,  */
        draggable: false,
        name: element.name,
        img: element.thumbnail_url,
        info: element.perex,
        duration: element.duration,
        poi: element
      });
    });
  }

  updateTrip(id, date) {
    this.route.params.subscribe(params =>
      this.tripsService.updateTrip(id, date, params.id).subscribe(() => {
      })
    );
  }
  saveOpen(i: any){
    this.save = i;
  }

  isInfoWindowOpen(id) {
    if(!id)
      return false;
    return id == this.save;
}
  
  markerClick(infoWindow: any) {
    console.log(infoWindow)
    infoWindow.close()
    if (infoWindow == this.lastSelectedInfoWindow) {
      return;
    }
    if (this.lastSelectedInfoWindow != null) {
      try {
        this.lastSelectedInfoWindow.close();
      } catch {} //in case if you reload your markers
    }
    this.lastSelectedInfoWindow = infoWindow;
  }


}

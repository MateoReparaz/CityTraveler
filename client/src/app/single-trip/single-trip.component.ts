import { TripsService } from "./../../services/trips.service";
import { PoiService } from "./../../services/poi.service";
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
  lastSelectedInfoWindow: any;
  save: any;


  constructor(
    public dayService: DayService,
    public poiService: PoiService,
    private route: ActivatedRoute,
    public tripsService: TripsService
  ) {}

  ngOnInit() {
    this.update();
  }
  deletePoi(index, tripId, day) {
    this.tripsService.deletePoi(index, tripId, day).subscribe(() => {
      this.update();
    });
  }
  update() {
    this.route.params.subscribe(params =>
      this.dayService.getTrip(params.id).subscribe(trip => {
        this.trip = trip;
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


import { TripsService } from './../../services/trips.service';
import { ActivatedRoute } from "@angular/router";
import { DayService } from "./../../services/day.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-day",
  templateUrl: "./day.component.html",
  styleUrls: ["./day.component.scss"]
})
export class DayComponent implements OnInit {
  day: any;
  lastSelectedInfoWindow: any;
  save: any;
  lat: number;
  lng: number;
  trip:any

  public origin: {};
  public destination: {};
  public renderOptions = {
    draggable: true
  };
  public waypoints: any 
  public travelMode: string = 'WALKING'
  public change(event: any) {
    this.waypoints = event.request.waypoints;
  } 

  constructor(public dayService: DayService, private route: ActivatedRoute,public tripsService: TripsService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dayService.getDay(params.idDay, params.idTrip).subscribe(day => {
        this.day = day;
        this.waypoints = [
          /* {
            location: { lat: this.day.pois[1].location.lat, lng: this.day.pois[1].location.lng },
            stopover:false,
        },
        {
          location: { lat: this.day.pois[2].location.lat, lng: this.day.pois[2].location.lng },
          stopover: false,
      } */
        ];
        this.getDirection();
      });
    });
  }
  
  getDirection() {
    this.origin = {
      lat: this.day.pois[0].location.lat,
      lng: this.day.pois[0].location.lng
    };
    this.destination = {
      lat: this.day.pois[this.day.pois.length - 1].location.lat,
      lng: this.day.pois[this.day.pois.length - 1].location.lng
    };
  }

  saveOpen(i: any) {
    this.save = i;
  }

  isInfoWindowOpen(id) {
    if (!id) return false;
    return id == this.save;
  }

  markerClick(infoWindow: any) {
    infoWindow.close();
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

  deletePoi(index, day) {
    this.route.params.subscribe(params => {
      this.tripsService.deletePoi(index, params.idTrip, day).subscribe(() => {
        this.update();
      });
    })
  }
  update() {
    this.route.params.subscribe(params =>
      this.dayService.getDay(params.idDay,params.idTrip).subscribe(day => {
        this.day = day;
      })
    );
  }
  
}

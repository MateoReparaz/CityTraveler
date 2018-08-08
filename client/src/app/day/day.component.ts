import { LoginComponent } from "./../login/login.component";
import { TripsService } from "./../../services/trips.service";
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
  trip: any;

  public origin: {};
  public destination: {};
  public renderOptions = {
    draggable: true
  };
  /* public waypoints: any; */
  public travelMode: string = "WALKING";
  /* public change(event: any) {
    this.waypoints = event.request.waypoints;
  } */
  public optimizeWaypoints: boolean = true

  constructor(
    public dayService: DayService,
    private route: ActivatedRoute,
    public tripsService: TripsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dayService.getDay(params.idDay, params.idTrip).subscribe(day => {
        this.day = day;
        /* this.waypoints = [
           {
            location: { lat: this.day.pois[1].location.lat, lng: this.day.pois[1].location.lng },
            stopover:false,
        },
        {
          location: { lat: this.day.pois[2].location.lat, lng: this.day.pois[2].location.lng },
          stopover: false,
      } 
        ]; */
        this.getDirection();
      });
    });
  }

  getDirection() {
    let maxX = -1000;
    let minX = 1000;
    let maxY = -1000;
    let minY = 1000;
    this.day.pois.forEach(element => {
      if (element.location.lng > maxX) {
        maxX = element.location.lng;
      }
      if (element.location.lng < minX) {
        minX = element.location.lng;
      }
      if (element.location.lat > maxY) {
        maxY = element.location.lat;
      }
      if (element.location.lat < minY) {
        minY = element.location.lat;
      }
    });
    if (maxX - minX > maxY - minY) {
      this.origin = this.day.pois.find(e => e.location.lng == minX).location;
      this.destination = this.day.pois.find(e => e.location.lng == maxX).location;
    } else {
      this.origin = this.day.pois.find(e => e.location.lat == minY).location;
      this.destination = this.day.pois.find(e => e.location.lat == maxY).location;
    }
    console.log(this.origin, this.destination)
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
    });
  }
  update() {
    this.route.params.subscribe(params =>
      this.dayService.getDay(params.idDay, params.idTrip).subscribe(day => {
        this.day = day;
      })
    );
  }
}

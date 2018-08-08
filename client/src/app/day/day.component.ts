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


  constructor(public dayService: DayService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.dayService
        .getDay(params.idDay, params.idTrip)
        .subscribe(day => this.day = day);
    });
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

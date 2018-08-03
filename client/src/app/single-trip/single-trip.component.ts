import { ActivatedRoute } from "@angular/router";
import { DayService } from "./../../services/day.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-single-trip",
  templateUrl: "./single-trip.component.html",
  styleUrls: ["./single-trip.component.scss"]
})
export class SingleTripComponent implements OnInit {
  trip: object;

  constructor(public dayService: DayService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.dayService.getTrip(params.id).subscribe(trip => {
        this.trip = trip;
        console.log(this.trip);
      })
    );
  }
}

import { ActivatedRoute, Router } from "@angular/router";
import { TripsService } from "./../../services/trips.service";
import { SessionService } from "./../../services/session.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.component.html",
  styleUrls: ["./trips.component.scss"]
})
export class TripsComponent implements OnInit {
  trips: any;

  constructor(
    public sessionService: SessionService,
    public tripsService: TripsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.tripsService.getAll().subscribe(trips => (this.trips = trips));
  }

  deleteTrip(id: any) {
    console.log("trip deleted", id);
    this.tripsService.deleteTrip(id).subscribe(() => {});
    this.tripsService.getAll().subscribe(trips => (this.trips = trips));
  }
}

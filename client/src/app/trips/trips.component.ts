import { TripsService } from './../../services/trips.service';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  trips:any;

  constructor(public sessionService:SessionService, public tripsService:TripsService) { }

  ngOnInit() {
    this.tripsService.getAll().subscribe(trips => this.trips = trips)
  }

}

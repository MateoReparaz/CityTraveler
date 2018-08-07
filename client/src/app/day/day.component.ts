import { ActivatedRoute } from '@angular/router';
import { DayService } from './../../services/day.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  trip : object;
  
  constructor(public dayService:DayService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.dayService.getTrip(params.id).subscribe(trip => {
        this.trip = trip;
    })

    )}

}

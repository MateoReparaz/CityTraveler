import { Component, OnInit } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {

  pois:any;

  constructor(public poiService:PoiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
    this.poiService.getAll(params.id).subscribe(pois => this.pois = pois))
  }

}

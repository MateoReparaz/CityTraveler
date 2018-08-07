import { Component, OnInit } from '@angular/core';
import { countries } from "../../interfaces/countries";
import { cities } from "../../interfaces/cities";
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export class NewTripComponent implements OnInit {
  today;
  countryList = Object.keys(countries);
  countryID;
  cityList;
  country;
  city;
  start;
  end;
  error;
  now;
  constructor(private tripService:TripsService, private router: Router) { }

  ngOnInit() {
    this.today = Date.now
  }
  updateCities(){
    this.cityList = undefined;
    this.error = undefined;
    this.countryID = countries[this.country]
    if(cities[this.countryID]){
      this.cityList =  Object.keys(cities[this.countryID]);
    } else{
      this.error = "Sorry, we don't support this country (yet!)"
    }
  }
  newTrip(){

    this.tripService
      .newTrip(this.country,this.city, this.start, this.end)
      .subscribe(data => this.router.navigate(["trips/create",data._id ]), err => (this.error = err));
  }
}
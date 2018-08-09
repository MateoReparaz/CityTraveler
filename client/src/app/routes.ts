import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TripsComponent } from './trips/trips.component';
import { NewTripComponent } from './new-trip/new-trip.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { LandingComponent } from './landing/landing.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { DayComponent } from './day/day.component';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path:'home', component:LandingComponent},
  { path:'trips', component:TripsComponent},
  { path:'signup', component:SignupComponent},
  { path:'login', component:LoginComponent},
  { path: "trips/new", component: NewTripComponent},
  { path: "trips/create/:id", component: CreateTripComponent},
  { path: "trips/:id", component: SingleTripComponent},
  { path:'trips/delete/:id', component:TripsComponent},
  { path: "day/:idDay/:idTrip", component: DayComponent}
];

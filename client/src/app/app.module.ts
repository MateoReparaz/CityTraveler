import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { HttpModule } from '@angular/http';
import { TripsComponent } from './trips/trips.component';
import { NewTripComponent } from './new-trip/new-trip.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { LandingComponent } from './landing/landing.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { DayComponent } from './day/day.component';
import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TripsComponent,
    NewTripComponent,
    SingleTripComponent,
    LandingComponent,
    CreateTripComponent,
    DayComponent,
    FooterComponent,
    HeaderComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJ-HnA4GOnAkxPy2N4d24-yvb-GgdRp7A'
    })
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

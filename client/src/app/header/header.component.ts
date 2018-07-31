import { Router } from '@angular/router';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public sessionService:SessionService, public router: Router) { }

  ngOnInit() {
  }
  logout(){
    this.sessionService.logout().subscribe(() => this.router.navigate(['']));
  }
}

import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { NgClass }  from '@angular/common';
// import { Routes , ROUTER_DIRECTIVES} from '@angular/router';

// Route component
import { DocsComponent } from './+docs';
import { LoginComponent } from './+login';

// Components

// Services
import { AuthService } from './shared/services/auth/auth.service';


@Component({
  moduleId: module.id,
  selector: 'notar-app',
  templateUrl: 'notar.component.html',
  styleUrls: ['notar.component.css'],
  directives: [LoginComponent,
    DocsComponent,
    NgClass,
    ROUTER_DIRECTIVES],
  providers: [AuthService],
  encapsulation: ViewEncapsulation.None
})

export class NotarAppComponent implements OnInit {

  public isSignedIn: boolean = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {

  }
}

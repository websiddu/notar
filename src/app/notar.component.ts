import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { NgClass }  from '@angular/common';
// import { Routes , ROUTER_DIRECTIVES} from '@angular/router';

// Route component
import { DocComponent } from './+doc';
import { LoginComponent } from './+login';

// Components
import { SideBarComponent } from './shared/common/side-bar/side-bar.component';
import { TagsBarComponent } from './shared/common/tags-bar/tags-bar.component';

// Services
import { AuthService } from './shared/services/auth/auth.service';


@Component({
  moduleId: module.id,
  selector: 'notar-app',
  templateUrl: 'notar.component.html',
  styleUrls: ['notar.component.css'],
  directives: [LoginComponent,
    DocComponent,
    TagsBarComponent,
    SideBarComponent,
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
    this.auth.checkAuth().then(() => {
      this.isSignedIn = true;
    });
  }
}

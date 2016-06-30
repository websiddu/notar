import { Component, ViewEncapsulation } from '@angular/core';
// import { Routes , ROUTER_DIRECTIVES} from '@angular/router';
import { DocComponent } from './+doc';
import { LoginComponent } from './+login';

import { ROUTER_DIRECTIVES }  from '@angular/router';

const CLIENT_ID = '155734877039-ftadpu31p6i79iied572licad72ji4bt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
declare var gapi: any;

@Component({
  moduleId: module.id,
  selector: 'notar-app',
  templateUrl: 'notar.component.html',
  styleUrls: ['notar.component.css'], 
  directives: [LoginComponent, DocComponent, ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})

export class NotarAppComponent {
  constructor() {
  }
}

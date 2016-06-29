import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthService } from '../shared/services/auth/auth.service'; 


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'], 
  providers: [ AuthService ]
}) 

export class LoginComponent implements OnInit {

  constructor(public af: AngularFire, private auth: AuthService) {
  
  }

  login() {
    this.auth.doAuth();
  }

  logout() {
    this.auth.removeAuth(); 
  }


  ngOnInit() {

  }

}

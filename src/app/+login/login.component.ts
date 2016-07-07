import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth/auth.service';

declare var gapi;

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [ AuthService ]
})

export class LoginComponent implements OnInit {

  isSignedIn: boolean = false;
  currentUser: any;

  constructor(public af: AngularFire, private auth: AuthService, public router: Router) {

  }

  login() {
    this.auth.doAuth();
  }

  logout() {
    this.auth.removeAuth();
  }

  ngOnInit() {
    this.auth.checkAuth().then((isSignedIn) => {
      if (isSignedIn) {
        this.router.navigate(['/docs/1']);
      }
    });
  }

}

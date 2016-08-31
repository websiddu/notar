import { Component, OnInit } from '@angular/core';
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

  constructor(private auth: AuthService, public router: Router) {

  }

  login() {
    this.auth.doAuth();
  }

  logout() {
    this.auth.removeAuth();
  }

  ngOnInit() {
    this.auth.checkAuth().subscribe((isSignedIn) => {
      if (isSignedIn) {
        this.router.navigate(['/docs']);
      }
    });
  }

}

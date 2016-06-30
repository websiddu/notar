import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth/auth.service'; 


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
    this.auth.checkAuth().subscribe((e) => {
      if (this.auth.isSignedIn) {
        // Todo: capture where the user was going and nav there.
        // Meanwhile redirect the user to the crisis admin
        this.router.navigate(['/doc']);
      }
    })
  }

}

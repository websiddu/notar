import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


import { Config } from '../config.service';


declare var gapi: any;
declare var firebase: any;
declare var Promise: any;


@Injectable()
export class AuthService {

  auth2: any;
  currentUser: any;
  isSignedIn: boolean = false;

  constructor(
    public router: Router,
    private config: Config) {

  }

updateSigninStatus(isSignedIn, that) {
  if (isSignedIn) {
    that.router.navigate(['/docs']);
  } else {
    that.router.navigate(['/login']);
  }
}

refreshToken() {
  return Observable.create( (observer) => {
    gapi.auth.authorize(this.config.authProperties, (data) => {
      observer.next(true);
      observer.complete();
    });
  });
}

checkAuth() {
    let that = this;
    return Observable.create( (observer) => {

      gapi.auth2.init(that.config.authProperties).then( () => {
        that.auth2 = gapi.auth2.getAuthInstance();

        if (this.auth2.isSignedIn.get() == true) {
          that.router.navigate(['/docs']);
        }

        that.auth2.isSignedIn.listen( (isSignedIn) => {
          that.updateSigninStatus(isSignedIn, that);
        });
        observer.next(true);
      });
      observer.complete();
    });
  }

  doAuth() {
    this.auth2.signIn();
  }

  // Signout
  removeAuth() {
    this.auth2.signOut();
    this.router.navigate(['/login']);
  }

}

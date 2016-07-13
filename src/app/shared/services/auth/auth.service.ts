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

  constructor(public router: Router,
   private config: Config) {


  }


  checkAuth() {
    return  Observable.create( (observer) => {
     gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init(this.config.authProperties);
          this.auth2.then(() => {
            let currentUser = gapi.auth2.getAuthInstance().currentUser.get();

            if (currentUser.isSignedIn()) {
              this.isSignedIn = true;
              this.currentUser = currentUser;
              observer.next(true);
            } else {
              observer.next(false);
              this.router.navigate(['/login']);
            }
            observer.complete();
          }, () => {
            console.log('Can not Login!');
          });
        });
    });

  }

  doAuth() {
    this.auth2.signIn().then((googleUser) => {
      this.handleAuthResult(googleUser);
    });
  }

  // Signout
  removeAuth() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    this.currentUser = null;
    this.isSignedIn = false;
  }

  handleAuthError(error) {
    if (!gapi.auth2) {
      this.router.navigate(['/login']);
    }
  }

  handleAuthSuccess() {
    this.router.navigate(['/docs/1']);
  }

  handleAuthResult(authResult) {

    if (!authResult.isSignedIn()) {
      return;
    }

    let unsubscribe = firebase.auth().onAuthStateChanged( (firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this._isUserEqual(authResult, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          authResult.getAuthResponse().id_token);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).catch( (error) => {

        });
      } else {
        console.log('User already signed-in Firebase.');
      }

      this.currentUser = authResult;
      this.isSignedIn = true;
      this.handleAuthSuccess();
    });

  }

  private
  // Util functions
  _isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          return true;
        }
      }
    }
    return false;
  }

}

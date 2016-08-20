import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

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
    private config: Config,
    private af: AngularFire) {

  }

  refreshToken() {

    return Observable.create( (observer) => {

        gapi.auth.authorize(this.config.authProperties, (data) => {
          console.log("Refresh token "); 
          console.log(data); 

          observer.next(true);
          observer.complete();  

        });
    }); 

     
  }

  checkAuth() {
    let that = this; 
    return Observable.create( (observer) => {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let token = user.getToken(); 
        
        gapi.auth.authorize(that.config.authProperties, () => {
          that.checkAuth(); 
        }); 

        observer.next(true);
      } else {
        // this.signIn();
        observer.next(false); 
      }

      observer.complete(); 
    }); 

    });
  }

  doAuth() {
    this.initAuth();
  }

  initAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/docs']);
      } else {
        this.signIn(); 
      }
    }); 
  }

  signIn() {
    if(!firebase.auth().currentUser) {
      let provider = new firebase.auth.GoogleAuthProvider(); 
      provider.addScope('https://www.googleapis.com/auth/drive');
      firebase.auth().signInWithPopup(provider).then( (result) => {
        firebase.database().ref('users/' + result.uid).set({
          foldername: '',
          displayName: result.displayName,
          tags: {}
        });
      }).catch((error) => {
        console.log(error); 
        if(error.code == 'auth/account-exists-with-different-credential') {
          console.log('You have already signed up with a different auth provider for that email...'); 
        } else {
          console.log(error); 
        }
      })
    }
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
    this.router.navigate(['/docs']);
  }

}

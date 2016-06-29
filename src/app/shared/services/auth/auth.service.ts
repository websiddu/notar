import { Injectable } from '@angular/core';

const CLIENT_ID = '155734877039-ftadpu31p6i79iied572licad72ji4bt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const AUTH_PROPERTIES = {
        client_id: CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        immediate: false, 
        scope: SCOPES.join(' ')
      }


declare var gapi: any;
declare var firebase: any;


@Injectable()
export class AuthService {
  
  auth2: any;
  currentUser: any; 
  isSignedIn: Boolean; 

  constructor() {
    gapi.load('auth2', () => this.checkAuth());
    this.isSignedIn = false;  
  }

  checkAuth() {
    this.auth2 = gapi.auth2.init(AUTH_PROPERTIES);

    this.auth2.then(()=> {
      let currentUser = gapi.auth2.getAuthInstance().currentUser.get();
      if(currentUser.isSignedIn()) {
        this.isSignedIn = true;
        this.currentUser = currentUser; 
      }
    }, ()=> {
      console.log("Can not Login!"); 
    })
  }
  
  doAuth() {
    this.auth2.signIn().then((googleUser) => {
      this.handleAuthResult(googleUser)
    })
  }

  // Signout 
  removeAuth() {
    gapi.auth2.getAuthInstance().signOut(); 
    this.currentUser = null; 
    this.isSignedIn = false;
  }
  
  handleAuthResult(authResult) {
    
    if(!authResult.isSignedIn()) {
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
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }

      this.currentUser = authResult; 
      this.isSignedIn = true;
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

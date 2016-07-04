import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NotarAppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/notar.routes';

import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig} from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(NotarAppComponent, [
  FIREBASE_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  defaultFirebase({
    apiKey: 'AIzaSyCNuE4FTljf5fa4mPOowxT2vmLae6XHyRo',
    authDomain: 'project-1922609808476689818.firebaseapp.com',
    databaseURL: 'https://project-1922609808476689818.firebaseio.com',
    storageBucket: 'project-1922609808476689818.appspot.com'
  }),
  firebaseAuthConfig({
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect,
    scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents']
  })
]).catch(err => console.error(err));
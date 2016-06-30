import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


declare var gapi: any;
declare var firebase: any;

const CLIENT_ID = '155734877039-ftadpu31p6i79iied572licad72ji4bt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const AUTH_PROPERTIES = {
  client_id: CLIENT_ID,
  cookiepolicy: 'single_host_origin',
  immediate: true,
  scope: SCOPES
}

const SCRIPT_ID = "1585tQzTyZ0DXBT_X0K1mHgUFx0hG_EQNAyEvkLAR9jSXMAZrQ4tpyMQP";



@Injectable()
export class ApiService {

  constructor() {
    gapi.auth.authorize(AUTH_PROPERTIES);
  }

  createNewDoc() {
    let createNewDocObserver = Observable.create((observer) => {
      let request = {
        'function': 'doPost'
      };

      let op = gapi.client.request({
        'root': 'https://script.googleapis.com',
        'path': 'v1/scripts/' + SCRIPT_ID + ':run',
        'method': 'POST',
        'body': request
      });

      op.execute((resp) => {
        if (resp.error && resp.error.status) {
          console.log(error);
        } else if (resp.error) {
          var error = resp.error.details[0];
          if (error.scriptStackTraceElements) {
          }
        } else {
          observer.next(resp.response.result);
          observer.complete();
        }
      });
    });

    return createNewDocObserver;
  }
}

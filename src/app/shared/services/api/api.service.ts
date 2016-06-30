import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


declare var gapi: any;
declare var firebase: any;

const CLIENT_ID = '155734877039-ftadpu31p6i79iied572licad72ji4bt.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents'];
const AUTH_PROPERTIES = {
  client_id: CLIENT_ID,
  cookiepolicy: 'single_host_origin',
  immediate: true,
  scope: SCOPES.join(' ')
}

const SCRIPT_ID = "1585tQzTyZ0DXBT_X0K1mHgUFx0hG_EQNAyEvkLAR9jSXMAZrQ4tpyMQP";

@Injectable()
export class ApiService {

  constructor() {
    
  }

  getAuth() {
    let authObserver = Observable.create((observer) => {
      gapi.auth.authorize(AUTH_PROPERTIES, (authResult) => {
         
       if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          observer.next(true); 
          observer.complete();
        } else {
          let authProperties = AUTH_PROPERTIES; 
          authProperties.immediate = false; 
          gapi.auth.authorize(authProperties);  
        }
      });
    }); 
    return authObserver; 
  }

  getDocsList(folderId?: string) {
    let getDocsObserver = Observable.create((observer) => {

      let request = {
        'function': 'getDocsList'
      };

      let op = this._request(request);
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

    return getDocsObserver; 
  }

  createNewDoc() {
    let createNewDocObserver = Observable.create((observer) => {
      let request = {
        'function': 'createDoc'
      };

      let op = this._request(request); 

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

  private 
  _request(options: any) {
    return gapi.client.request({
        'root': 'https://script.googleapis.com',
        'path': 'v1/scripts/' + SCRIPT_ID + ':run',
        'method': 'POST',
        'body': options
      });
  }

}

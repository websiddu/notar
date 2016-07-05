import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../config.service';

declare var gapi: any;
declare var firebase: any;
declare var Promise: any;

@Injectable()
export class ApiService {
  private headers: Headers;

  constructor(private http: Http, private config: Config) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  // Get the list of files
  getFiles() {
    let filesObserver = new Promise((resolve, reject) => {
      gapi.client.load('drive', 'v3', () => {
        var request = gapi.client.drive.files.list({
          'pageSize': 10,
          'fields': 'nextPageToken, files(id, name, webViewLink, createdTime, modifiedByMeTime)',
          'q': encodeURI(`mimeType='application/vnd.google-apps.document'`)
        });
        request.execute((resp) => {
          resolve(resp);
        });
      });
    });
    return filesObserver;
  }


  getAuth() {
    let authObserver = new Promise((resolve, reject) => {
      gapi.auth.authorize(this.config.authProperties, (authResult) => {

       if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          resolve(true);
        } else {
          let authProperties = this.config.authProperties;
          authProperties.immediate = false;
          gapi.auth.authorize(authProperties);
        }
      });
    });
    return authObserver;
  }

  getDocsList(folderId?: string) {
    let getDocsObserver = new Promise((resolve, reject) => {

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
          resolve(resp.response.result);
        }
      });
    });

    return getDocsObserver;
  }

  createNewDoc() {
    let createNewDocObserver = new Promise((resolve, reject) => {
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
          resolve(resp.response.result);
        }
      });
    });

    return createNewDocObserver;
  }

  private;
  _request(options: any) {
    return gapi.client.request({
        'root': 'https://script.googleapis.com',
        'path': 'v1/scripts/' + this.config.scriptId + ':run',
        'method': 'POST',
        'body': options
      });
  }

}

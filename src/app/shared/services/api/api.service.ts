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
          'pageSize': 20,
          'fields': 'nextPageToken, files(id, name, webViewLink, createdTime, modifiedByMeTime)',
          'q': `'${localStorage['folderId']}' in parents and mimeType='application/vnd.google-apps.document'`
        });
        request.execute((resp) => {
          resolve(resp);
        });
      });
    });
    return filesObserver;
  }

  //'0B73Qoo-AGhMMRHpBb18yU0xvSVk' in parents and mimeType='application/vnd.google-apps.document'
  // '0B73Qoo-AGhMMRHpBb18yU0xvSVk' in parents


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


  // Create a folder based on the given users name
  //
  // folderName: string – Name of the folder
  createFolder(folderName: string) {
    if (!folderName) {
      return;
    }
    return gapi.client.request({
      'path': '/drive/v3/files',
      'method': 'POST',
      'body': {
        'name': folderName,
        'mimeType': 'application/vnd.google-apps.folder'
      }
    });
  }


  // Create a new Doucment
  createNewDoc(docname = 'Untitled' ) {
    if (!docname) {
      return;
    }
    return gapi.client.request({
      'path': '/drive/v3/files',
      'method': 'POST',
      'body': {
        'name': docname,
        'parents': [localStorage['folderId']],
        'mimeType': 'application/vnd.google-apps.document'
      }
    });
  }


}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

  // Get a document data
  getDoc(id: string) {
    if (!id) {
      return;
    }

    return gapi.client.request({
      'path': `/drive/v3/files/${id}`,
      'method': 'GET',
      'params': {
        'fields': 'appProperties,contentHints,createdTime,description,explicitlyTrashed,' +
          'fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,' +
          'isAppAuthorized,kind,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,' +
          'name,originalFilename,ownedByMe,parents,properties,quotaBytesUsed,shared,' +
          'size,spaces,starred,thumbnailLink,trashed,version,viewedByMeTime,' +
          'viewersCanCopyContent,webContentLink,webViewLink,writersCanShare'
      }
    });
  }


  patchDoc(id: string, body: any) {
    return gapi.client.request({
      'path': `/drive/v3/files/${id}`,
      'method': 'PATCH',
      'body': body
    });
  }


  getDocWithObserver(id: string) {
    return  Observable.create( (observer) => {
      this.getDoc(id).then(function(doc){
        observer.next(doc);
        observer.complete();
      });
    });
  }

  // Get the list of files
  getFiles() {
    let filesObserver = new Promise((resolve, reject) => {
      gapi.client.load('drive', 'v3', () => {
        var request = gapi.client.drive.files.list({
          'pageSize': 10,
          'fields': 'nextPageToken, files(id, name, webViewLink, createdTime, modifiedByMeTime)',
          'q': `mimeType contains 'application/vnd.google-apps.drive-sdk'`
        });
        request.execute((resp) => {
          resolve(resp);
        });
      });
    });
    return filesObserver;
  }

  updateTags(tags, uid) {
    firebase.database().ref('users/' + uid + '/tags').set(tags.split(','));
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
  createNewDoc(docname = 'Untitled document' ) {
    if (!docname) {
      return;
    }
    return gapi.client.request({
      'path': '/drive/v3/files',
      'method': 'POST',
      'body': {
        'name': docname,
        'parents': [localStorage['folderId']],
        'mimeType': 'application/vnd.google-apps.drive-sdk'
      }
    });
  }


}

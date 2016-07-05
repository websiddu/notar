import { Component, OnInit } from '@angular/core';

import {NgClass} from '@angular/common';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {DomSanitizationService, SafeResourceUrl} from '@angular/platform-browser';

import { Document } from './doc.model';

import { ApiService } from '../shared/services/api/api.service';
import { AuthService } from '../shared/services/auth/auth.service';


import { DocListComponent } from '../shared/doc/doc-list/doc-list.component';


declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  providers: [ApiService],
  directives: [ DocListComponent ]
})

export class DocComponent implements OnInit {

  public currentDoc: Document;
  public docs: Document[] = [];
  items: any;

  constructor(private sanitationService: DomSanitizationService,
    private api: ApiService,
    private af: AngularFire,
    private auth: AuthService) {

  }

  logout() {
    this.auth.removeAuth();
  }

  loadFiles() {
    // this.api.getDocsList().then((result) => {
    //   for (let i = 0; i < result.length; i++) {
    //     let file = new Document(result[i]);
    //     this.files.unshift(file);
    //   }
    // });

    this.api.getFiles().then((data: any) => {
        this.docs = data.files;
        this.currentDoc = this.docs[0];
        if (data.ok) {
          // this.auth.handleAuthError(data);
        }
      },
      (error) => {
        this.auth.handleAuthError(error);
      },
      () => {
        console.log('Get all Items complete');
      });
  }

  createDoc() {
    this.api.createNewDoc().then((result) => {
      this.currentDoc = new Document(result);
      this.docs.unshift(this.currentDoc);
      this.items.push(result);
    });
  }

  // Util funcitons

  getSafeUrl(url: string) {
    return this.sanitationService.bypassSecurityTrustResourceUrl(url);
  }


  ngOnInit() {
    this.api.getAuth().then((isSignedIn) => {
      this.loadFiles();
    });
  }
}

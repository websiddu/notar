import { Component, OnInit } from '@angular/core';

import {NgClass} from '@angular/common';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {DomSanitizationService, SafeResourceUrl} from '@angular/platform-browser';

import { Document } from './doc.model';

import { ApiService } from '../shared/services/api/api.service';
import { AuthService } from '../shared/services/auth/auth.service';

import { CardComponent } from '../shared/doc/card/card.component';
import { DocframeComponent } from '../shared/docframe/docframe.component';


declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  providers: [ApiService],
  directives: [DocframeComponent, CardComponent, NgClass]
})

export class DocComponent implements OnInit {

  public currentDoc: Document;
  public files: Document[] = [];
  items: any;

  constructor(private sanitationService: DomSanitizationService,
    private api: ApiService,
    private af: AngularFire,
    private auth: AuthService) {

      // this.items = af.database.list('/notes');

      // var notes = firebase.database().ref('notes').on('value', (snapshot) => {
      //   // updateStarCount(postElement, snapshot.val());
      //   this.items = snapshot.val();
      // });
      // // this.items = notes;
  }

  logout() {
    this.auth.removeAuth();
  }

  getSafeUrl(url: string) {
    return this.sanitationService.bypassSecurityTrustResourceUrl(url);
  }

  openDoc(doc) {
    this.currentDoc = doc;
  }

  loadFiles() {
    // this.api.getDocsList().then((result) => {
    //   for (let i = 0; i < result.length; i++) {
    //     let file = new Document(result[i]);
    //     this.files.unshift(file);
    //   }
    // });

    this.api.getFiles().then((data: any) => {
        this.files = data.files;
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
      this.files.unshift(this.currentDoc);
      this.items.push(result);
    });
  }

  ngOnInit() {
    this.api.getAuth().then((isSignedIn) => {
      this.loadFiles();
    });
  }
}

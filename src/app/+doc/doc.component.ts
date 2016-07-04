import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api/api.service';
import { DocframeComponent } from '../shared/docframe/docframe.component';
import { CardComponent } from '../shared/doc/card/card.component';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { Document } from './doc.model';

import {DomSanitizationService, SafeResourceUrl} from '@angular/platform-browser';


declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  providers: [ApiService],
  directives: [DocframeComponent, CardComponent]
})

export class DocComponent implements OnInit {

  public currentDoc: Document;
  public files: Document[] = [];
  items: any;

  constructor(private sanitationService: DomSanitizationService,
    private api: ApiService,
    private af: AngularFire) {

      // this.items = af.database.list('/notes');

      // var notes = firebase.database().ref('notes').on('value', (snapshot) => {
      //   // updateStarCount(postElement, snapshot.val());
      //   this.items = snapshot.val();
      // });
      // // this.items = notes;
  }

  getSafeUrl(url: string) {
    return this.sanitationService.bypassSecurityTrustResourceUrl(url);
  }

  openDoc(doc) {
    this.currentDoc = doc;
  }

  loadFiles() {
    this.api.getDocsList().then((result) => {
      for (let i = 0; i < result.length; i++) {
        let file = new Document(result[i]);
        this.files.unshift(file);
      }
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
    this.api.getAuth().then(() => {
      this.loadFiles();
    });
  }
}

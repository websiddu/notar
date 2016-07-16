import { Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { ROUTER_DIRECTIVES } from '@angular/router';

import { OnboardingComponent } from './shared/onboarding/onboarding.component';


import { ApiService } from '../shared/services/api/api.service';
import { AuthService } from '../shared/services/auth/auth.service';

import { SideBarComponent } from './side-bar/side-bar.component';
import { TagsBarComponent } from './tags-bar/tags-bar.component';

// import { Document } from './doc.model';

declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-docs',
  templateUrl: 'docs.component.html',
  styleUrls: ['docs.component.css'],
  providers: [ApiService, AuthService],
  directives: [ROUTER_DIRECTIVES, OnboardingComponent, SideBarComponent, TagsBarComponent]
})

export class DocsComponent implements OnInit, OnDestroy {

  isFirstTime: boolean = false;
  docs: any;
  currentDoc: any;

  constructor(private sanitationService: DomSanitizationService,
    private router: Router,
    private af: AngularFire,
    private auth: AuthService,
    private api: ApiService) {

  }

  loadFiles() {
    this.api.getFiles().then((data: any) => {
      this.docs = data.files;
      this.currentDoc = data.files[0];
    },
    (error) => {
      this.auth.handleAuthError(error);
    },
    () => {
      console.log('Get all Items complete');
    });
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    setTimeout( () => {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref(`users/${userId}/folder`).once('value').then( (snapshot) => {
        if (snapshot.val().id) {
          this.isFirstTime = false;
          localStorage['folderId'] = snapshot.val().id;
          this.loadFiles();
        } else {
          this.isFirstTime = true;
        }
      });
    }, 100);
  }
}

import { Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { ROUTER_DIRECTIVES } from '@angular/router';

import { OnboardingComponent } from './shared/onboarding/onboarding.component';


// import { Document } from './doc.model';

declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-docs',
  templateUrl: 'docs.component.html',
  styleUrls: ['docs.component.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES, OnboardingComponent]
})

export class DocsComponent implements OnInit, OnDestroy {

  isFirstTime: boolean = false;

  constructor(private sanitationService: DomSanitizationService,
    private router: Router,
    private af: AngularFire) {

  }

  ngOnDestroy() {
  }

  ngOnInit() {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${userId}/folder`).once('value').then( (snapshot) => {
      if (snapshot.val().id) {
        this.isFirstTime = false;
        localStorage['folderId'] = snapshot.val().id;
      } else {
        this.isFirstTime = true;
      }
    });
  }
}

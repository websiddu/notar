import { Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router } from '@angular/router';


import { ROUTER_DIRECTIVES } from '@angular/router';

import { ApiService } from '../shared/services/api/api.service';
import { DocService } from '../shared/services/doc/doc.service';
import { AuthService } from '../shared/services/auth/auth.service';

import { OnboardingComponent } from './shared/onboarding/onboarding.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TagsBarComponent } from './tags-bar/tags-bar.component';

declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-docs',
  templateUrl: 'docs.component.html',
  styleUrls: ['docs.component.css'],
  providers: [ApiService, AuthService, DocService],
  directives: [ROUTER_DIRECTIVES, OnboardingComponent, SideBarComponent, TagsBarComponent]
})

export class DocsComponent implements OnInit, OnDestroy {

  isFirstTime: boolean = false;
  docs: any;
  currentDoc: any;

  constructor(private sanitationService: DomSanitizationService,
    private router: Router,
    private auth: AuthService,
    private docService: DocService,
    private api: ApiService) {

  }

  loadFiles() {
    console.log("Loading files...");
    this.api.getFiles().then((data: any) => {
      this.docService.setDocs(data.files);
      this.docService.setDoc(data.files[0]);
    },
    (error) => {
      // this.auth.handleAuthError(error);
    },
    () => {
      console.log('Get all Items complete');
    });
  }


  ngOnDestroy() {
  }

  ngOnInit() {
    this.loadFiles();
  }
}

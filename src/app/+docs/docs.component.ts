import { Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private sanitationService: DomSanitizationService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnDestroy() {
  }

  ngOnInit() {

  }
}

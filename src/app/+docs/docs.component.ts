import { Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';



// import { Document } from './doc.model';

declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-docs',
  templateUrl: 'docs.component.html',
  styleUrls: ['docs.component.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES]
})

export class DocsComponent implements OnInit, OnDestroy {

  private sub: any;
  public doc: any = {};

  constructor(private sanitationService: DomSanitizationService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  // Util funcitons

  getSafeUrl(url: string) {
    return this.sanitationService.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    
  }
}

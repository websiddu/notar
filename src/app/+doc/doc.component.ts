import { Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

// import { Document } from './doc.model';

declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  providers: [],
  directives: []
})

export class DocComponent implements OnInit, OnDestroy {

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
    this.sub = this.route.params.subscribe(params => {
       let id = params['id'];
       this.doc.url = `//docs.google.com/document/d/${id}/edit?usp=drivesdk`;
     });
  }
}

import { Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  directives: [ROUTER_DIRECTIVES]
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
        this.doc.url = id != 1 ? `//docs.google.com/document/d/${id}/edit?usp=drivesdk` : '';
     });
  }
}

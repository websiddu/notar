import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ApiService } from '../../shared/services/api/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ApiService]
})

export class DocComponent implements OnInit, OnDestroy, AfterViewInit {

  private sub: any;
  public doc: any = {
    url: ''
  };

  constructor(private sanitationService: DomSanitizationService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService) {

  }

  // Util funcitons

  getSafeUrl(url: string) {
    return this.sanitationService.bypassSecurityTrustResourceUrl(url);
  }


  ngAfterViewInit() {
    if (!this.doc.id) {
      return;
    }
    this.api.getDoc(this.doc.id).then( (res) => {
      this.doc.info = res.result;
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        let url = id != 1 ? `https://docs.google.com/document/d/${id}/edit?usp=drivesdk` : '';
        this.doc.id = id;
        this.doc.url = this.sanitationService.bypassSecurityTrustResourceUrl(url);
     });
  }
}

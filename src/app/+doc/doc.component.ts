import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api/api.service';
import { DocframeComponent } from '../shared/docframe/docframe.component';
import { CardComponent } from '../shared/doc/card/card.component';

import {DomSanitizationService, SafeResourceUrl} from '@angular/platform-browser'; 

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'], 
  providers: [ApiService], 
  directives: [DocframeComponent, CardComponent]
})
export class DocComponent implements OnInit {
  
  public docUrl: any; 
  public files: any; 

  constructor(private sanitationService:DomSanitizationService, private api: ApiService) {
    
  }

  loadFiles() {
    this.api.getDocsList().then((result) => {
      this.files = result;
    })
  }

  createDoc() {
    this.api.createNewDoc().then((result) => {
      this.docUrl = this.sanitationService.bypassSecurityTrustResourceUrl(result);  
    })
  }

  ngOnInit() {
    this.api.getAuth().then(()=> {
      this.loadFiles();
    });  
  }
}

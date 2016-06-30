import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api/api.service';
import { DocframeComponent } from '../shared/docframe/docframe.component';
import {DomSanitizationService, SafeResourceUrl} from '@angular/platform-browser'; 

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'], 
  providers: [ApiService], 
  directives: [DocframeComponent]
})
export class DocComponent implements OnInit {
  
  public docUrl: any; 


  constructor(private sanitationService:DomSanitizationService, private api: ApiService) {
  }

  createDoc() {
    this.api.createNewDoc().subscribe(
      this._updateDocUrl.bind(this),
      this._logError.bind(this)
    )    
  }

  _updateDocUrl(docUrl) {
    this.docUrl = this.sanitationService.bypassSecurityTrustResourceUrl(docUrl);
  }

  _logError() {

  }

  ngOnInit() {
  }

}

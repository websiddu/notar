import { Component, OnInit, OnDestroy, AfterViewInit,
    Input, ElementRef} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { REACTIVE_FORM_DIRECTIVES, FormGroup} from '@angular/forms';

import { CKEditor } from 'ng2-ckeditor';

import { SideBarComponent } from '../side-bar/side-bar.component';
import { TagsBarComponent } from '../tags-bar/tags-bar.component';


import { ApiService } from '../../shared/services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { DocService } from '../../shared/services/doc/doc.service';

declare var utils;
declare var gapi;

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  directives: [ROUTER_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES, CKEditor, SideBarComponent, TagsBarComponent],
  providers: [ApiService]
})

export class DocComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() currentDoc: any;


  modelForm: FormGroup;
  ckeditorContent: string = '';
  title: string = '';

  collaborativeString: any;
  ckeditorConfig: any = {

  };

  private sub: any;
  public doc: any = {
    url: '',
    name: ''
  };
  content: string;

  constructor(private sanitationService: DomSanitizationService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private docService: DocService,
    private auth: AuthService,
    private ele: ElementRef) {

  }

  onTitleChange() {
    this.docService.setDoc(this.doc);
  }

  onBodyChange(content) {
    this.collaborativeString.setText(content);
  }

  onFileLoaded(doc) {
    this.collaborativeString = doc.getModel().getRoot().get('body');
    this.ckeditorContent = this.collaborativeString.getText();
  }

  initializeModel(model) {
    var str = model.createString();
    model.getRoot().set('body', str);
  }

  initRealTime(id) {
    let that = this;
    gapi.drive.realtime.load(id, (doc) => {
      that.onFileLoaded(doc);
    }, that.initializeModel, () => { that.onError(id); } );
  }

  onError(id) {
    this.api.getAuth().then((e) => {
      this.initRealTime(id);
    });
  }

  // Component life hooks
  //
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        let url = id != 1 ? `https://docs.google.com/document/d/${id}/edit?usp=drivesdk` : '';
        this.doc.id = id;
        this.doc.url = this.sanitationService.bypassSecurityTrustResourceUrl(url);
        this.initRealTime(id);
        this.ngAfterViewInit();
     });
  }

  ngAfterViewInit() {
    this.api.getDoc(this.doc.id).then( (res) => {
      this.doc = res.result;
      this.docService.setDoc(res.result);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Util funcitons
  //
  getSafeUrl(url: string) {
    return this.sanitationService.bypassSecurityTrustResourceUrl(url);
  }


}

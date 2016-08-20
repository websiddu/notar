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
declare var _;

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  directives: [ROUTER_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    // SELECT2_DIRECTIVES,
    CKEditor, SideBarComponent, TagsBarComponent],
  providers: [ApiService]
})

export class DocComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() currentDoc: any;

  modelForm: FormGroup;
  ckeditorContent: string = '';

  collaborativeString: any;
  ckeditorConfig: any = {

  };

  private sub: any;
  public doc: any = {
    name: '',
    tags: ''
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

  onTitleChange(e) {
    this.docService.setDoc(this.doc);
    this.collaborativeString.set('title', this.doc.name);
    this.api.patchDoc(this.doc.id, {
      name: this.doc.name
    }).then((err) =>  {
      console.log(err);
    });
  }

  onTagChange(e) {
    this.collaborativeString.set('tags', this.doc.tags);
    this.api.updateTags(this.doc.tags, localStorage['uid']);
  }

  onBodyChange(content) {
    if (this.doc.body != content) {
      this.collaborativeString.set('body', content);
    }
  }

  onFileLoaded(doc) {

    this.collaborativeString = doc.getModel().getRoot().get('doc');

    this.ckeditorContent = this.collaborativeString.get('body');
    this.doc.body = this.collaborativeString.get('body');
    this.doc.name = this.collaborativeString.get('title');
    this.doc.tags = this.collaborativeString.get('tags');

    this.getFullDoc();
    // this.docService.setDoc(this.doc);
  }

  initializeModel(model) {
    var map = model.createMap({
      title: 'Untitled document',
      body: '',
      tags: ''
    });
    model.getRoot().set('doc', map);
  }

  initRealTime(id) {
    let that = this;
    gapi.drive.realtime.load(id, (doc) => {
      that.onFileLoaded(doc);
    }, that.initializeModel, (e) => {
      console.log(e); 
      if(e.type == 'token_refresh_required') {
        this.auth.refreshToken().subscribe( (res) => {})
      }
      if (e.isFatal) {
        // TODO: Handle all the errors together
      } else {
        that.onError(id);
      }
    });
  }

  onError(id) {
    this.api.getAuth().then((e) => {
      this.initRealTime(id);
    });
  }

  getFullDoc() {
    this.api.getDoc(this.doc.id).then( (res) => {
      this.doc = _.merge(this.doc, res.result);
      this.docService.setDoc(this.doc);
    });
  }

  // Component life hooks
  //
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        this.doc.id = id;
        this.auth.refreshToken().subscribe( (res) => {
          this.initRealTime(id);
        })
     });
  }

  ngAfterViewInit() {

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

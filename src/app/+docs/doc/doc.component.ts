import { Component, OnInit, OnDestroy, AfterViewInit, Input, ElementRef} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { REACTIVE_FORM_DIRECTIVES,
    FormGroup,
    FormControl,
    FormBuilder,
    Validators } from '@angular/forms';

import { CKEditor } from 'ng2-ckeditor';


import { ApiService } from '../../shared/services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';

declare var utils;
declare var gapi;

@Component({
  moduleId: module.id,
  selector: 'app-doc',
  templateUrl: 'doc.component.html',
  styleUrls: ['doc.component.css'],
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, CKEditor],
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
    url: ''
  };
  content: string;

  constructor(private sanitationService: DomSanitizationService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private ele: ElementRef) {

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
      this.title = this.doc.info.name;
    });
    console.log(this.currentDoc);
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmitModelForm(form) {
    console.log(form);
  }

  onSubmitTemplateForm(form) {
    console.log(form);
  }

  onChange(content) {
    this.collaborativeString.setText(content);
  }

  onFileLoaded(doc) {
    console.log("Onfile loaded")
    this.collaborativeString = doc.getModel().getRoot().get('body');
    console.log(this.collaborativeString.getText());
    this.ckeditorContent = this.collaborativeString.getText();

    doc.getModel().getRoot().get('body').addEventListener(
      gapi.drive.realtime.EventType.VALUE_CHANGED,
      (event) => {
        console.log('value changd..');
        console.log(event);
      });


    // gapi.drive.realtime.databinding.bindString(collaborativeString, this.ele.nativeElement.querySelector('textarea'));
  }

  initializeModel(model) {
    var str = model.createString();
    model.getRoot().set('body', str);
  }

  onError(id) {
    console.log("On error....");
    console.log(id);
    this.api.getAuth().then((e) => {
      console.log(e);
      this.initRealTime(id);
    });
  }

  initRealTime(id) {
    let that = this;
    gapi.drive.realtime.load(id, (doc) => {
      that.onFileLoaded(doc);
    }, that.initializeModel, () => {that.onError(id); } );
  }

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        let url = id != 1 ? `https://docs.google.com/document/d/${id}/edit?usp=drivesdk` : '';
        this.doc.id = id;
        this.doc.url = this.sanitationService.bypassSecurityTrustResourceUrl(url);
        this.initRealTime(id);

     });
  }
}

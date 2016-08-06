import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES,
    FormGroup,
    FormControl,
    FormBuilder,
    Validators } from '@angular/forms';

import { CKEditor } from 'ng2-ckeditor';


@Component({
  moduleId: module.id,
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.css'],
  directives: [CKEditor, REACTIVE_FORM_DIRECTIVES]
})
export class EditorComponent implements OnInit {

  modelForm: FormGroup;
  content: 'THis is the content';

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmitModelForm(form) {
    console.log(form);
  }

  onSubmitTemplateForm(form) {
    console.log(form);
  }
}

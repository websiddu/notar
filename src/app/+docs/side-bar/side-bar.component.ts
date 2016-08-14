import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../shared/services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { DocService } from '../../shared/services/doc/doc.service';

import { DocListComponent } from '../../shared/doc/doc-list/doc-list.component';
import { ProfileBarComponent } from '../shared/profile-bar/profile-bar.component';

import { SpinnerComponent } from '../../shared/common/spinner/spinner.component';

@Component({
  moduleId: module.id,
  selector: 'app-side-bar',
  templateUrl: 'side-bar.component.html',
  styleUrls: ['side-bar.component.css'],
  providers: [AuthService, ApiService],
  directives: [DocListComponent, ProfileBarComponent, SpinnerComponent],
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {

  @Input() docs: any;
  @Input() currentDoc: any;

  public isRequesting: boolean = false;

  constructor(private api: ApiService,
  private auth: AuthService,
  private docService: DocService,
  private router: Router) {

  }

  onFileCreated(doc: any) {
    this.docService.addDoc(doc);
    this.docs.unshift(doc);
    this.currentDoc = this.docService.currentDoc;
  }

  ngOnInit() {
    this.api.getAuth().then((isSignedIn) => {
      this.isRequesting = false;
      this.docs = this.docService.docs;
    });
  }

}

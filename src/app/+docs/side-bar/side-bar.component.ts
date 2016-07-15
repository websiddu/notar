import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';

import { DocListComponent } from '../../shared/doc/doc-list/doc-list.component';
import { ProfileBarComponent } from '../shared/profile-bar/profile-bar.component';

import { SpinnerComponent } from '../../shared/common/spinner/spinner.component';

@Component({
  moduleId: module.id,
  selector: 'app-side-bar',
  templateUrl: 'side-bar.component.html',
  styleUrls: ['side-bar.component.css'],
  providers: [AuthService, ApiService],
  directives: [DocListComponent, ProfileBarComponent, SpinnerComponent]
})
export class SideBarComponent implements OnInit {

  public docs: any;
  public currentDoc: any;
  public isRequesting: boolean = false;

  constructor(private api: ApiService, private auth: AuthService) {

  }

  loadFiles() {
    this.api.getFiles().then((data: any) => {
        this.docs = data.files;
        this.currentDoc = this.docs[0];
      },
      (error) => {
        this.auth.handleAuthError(error);
      },
      () => {
        console.log('Get all Items complete');
      });
  }

  ngOnInit() {
    this.api.getAuth().then((isSignedIn) => {
      this.loadFiles();
      this.isRequesting = false;
    });
  }

}

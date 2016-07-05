import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';

import { DocListComponent } from '../../doc/doc-list/doc-list.component';
import { ProfileBarComponent } from '../profile-bar/profile-bar.component';

@Component({
  moduleId: module.id,
  selector: 'app-side-bar',
  templateUrl: 'side-bar.component.html',
  styleUrls: ['side-bar.component.css'],
  providers: [AuthService, ApiService],
  directives: [DocListComponent, ProfileBarComponent]
})
export class SideBarComponent implements OnInit {

  public docs: any;
  public currentDoc: any;

  constructor(private api: ApiService, private auth: AuthService) {

  }

  loadFiles() {
    this.api.getFiles().then((data: any) => {
        this.docs = data.files;
        this.currentDoc = this.docs[0];
        if (data.ok) {
          // this.auth.handleAuthError(data);
        }
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
    });
  }

}

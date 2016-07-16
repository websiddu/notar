import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  @Input() docs: any;
  @Input() currentDoc: any;

  public isRequesting: boolean = false;

  constructor(private api: ApiService,
  private auth: AuthService,
  private router: Router) {

  }

  onFileCreated(doc: any) {
    this.docs.unshift(doc);
  }

  ngOnInit() {
    this.api.getAuth().then((isSignedIn) => {
      this.isRequesting = false;
    });
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';

// Services
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ApiService } from '../../../shared/services/api/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-profile-bar',
  templateUrl: 'profile-bar.component.html',
  styleUrls: ['profile-bar.component.css'],
  providers: [AuthService]
})
export class ProfileBarComponent implements OnInit {

  currentUserName: string = '';
  currentUserImg: string = '';

  @Output() onFileCreated = new EventEmitter<any>();

  constructor(private auth: AuthService,
    private api: ApiService,
    private router: Router) {

  }

  createNewDoc(docname: string) {
    let that = this;
    this.api.createNewDoc().then( (response) => {
      let id = response.result.id;
      this.onFileCreated.emit(response.result);
      that.router.navigate([`/docs/${id}`]);
    });
  }

  ngOnInit() {
    this.auth.checkAuth().subscribe(() => {
      let basicProfile = this.auth.currentUser.getBasicProfile();
      this.currentUserName = basicProfile.getName();
      this.currentUserImg = basicProfile.getImageUrl();
    });
  }

}

import { Component, OnInit } from '@angular/core';


// Services
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.auth.checkAuth().then(() => {
      let basicProfile = this.auth.currentUser.getBasicProfile();
      this.currentUserName = basicProfile.getName();
      this.currentUserImg = basicProfile.getImageUrl();
    });
  }

}

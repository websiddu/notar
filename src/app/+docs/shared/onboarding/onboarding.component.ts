import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire } from 'angularfire2';


import { ModalComponent } from '../../../shared/common/modal/modal.component';

import { CarouselComponent } from '../../../shared/common/carousel/carousel.component';
import { SlideComponent } from '../../../shared/common/carousel/slide/slide.component';

import { ApiService } from '../../../shared/services/api/api.service';

declare var firebase;

@Component({
  moduleId: module.id,
  selector: 'app-onboarding',
  templateUrl: 'onboarding.component.html',
  styleUrls: ['onboarding.component.css'],
  directives: [ ModalComponent, CarouselComponent, SlideComponent ],
  providers: [ApiService]
})
export class OnboardingComponent implements OnInit {

  folderName: string;
  folderId: string;

  constructor(private api: ApiService, private af: AngularFire) {}

  onSubmit() {
    if (!this.folderName) {
      return;
    }
    this.api.createFolder(this.folderName).then( (response) => {
      this.folderId = response.result.id;
      let uid = firebase.auth().currentUser.uid;
      firebase.database().ref(`users/${uid}/folder`).set({
          'id': this.folderId,
          'name': this.folderName,
        });
    });
  }

  ngOnInit() {

  }

}

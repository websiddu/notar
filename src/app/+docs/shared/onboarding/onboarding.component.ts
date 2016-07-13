import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../../shared/common/modal/modal.component';

import { CarouselComponent } from '../../../shared/common/carousel/carousel.component';
import { SlideComponent } from '../../../shared/common/carousel/slide/slide.component';

import { ApiService } from '../../../shared/services/api/api.service';

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

  constructor(private api: ApiService) {}

  onSubmit() {
    if (!this.folderName) {
      return;
    }
    this.api.createFolder(this.folderName).then( (response) => {
      this.folderId = response.body.id;
      this.api.updateUserConfig();
    });
  }

  ngOnInit() {

  }

}

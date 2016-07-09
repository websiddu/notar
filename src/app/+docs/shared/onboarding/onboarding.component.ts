import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../../shared/common/modal/modal.component';


@Component({
  moduleId: module.id,
  selector: 'app-onboarding',
  templateUrl: 'onboarding.component.html',
  styleUrls: ['onboarding.component.css'],
  directives: [ ModalComponent ]

})
export class OnboardingComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}

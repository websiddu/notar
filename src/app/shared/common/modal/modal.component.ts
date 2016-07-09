import { Component, OnInit, Input } from '@angular/core';

import { OverlayComponent } from './overlay/overlay.component';

@Component({
  moduleId: module.id,
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
  directives: [OverlayComponent]
})
export class ModalComponent implements OnInit {

  @Input() public header: string;

  constructor() {}

  ngOnInit() {
  }

}

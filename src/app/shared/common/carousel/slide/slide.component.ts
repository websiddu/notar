import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'slide',
  templateUrl: 'slide.component.html',
  styleUrls: ['slide.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlideComponent implements OnInit {

  @Input() isActive: boolean = false;

  constructor() {}

  ngOnInit() {
  }

}

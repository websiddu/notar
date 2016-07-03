import { Component, OnInit, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'slide',
  templateUrl: 'slide.component.html',
  styleUrls: ['slide.component.css']
})
export class SlideComponent implements OnInit {

  @Input() isActive: boolean = false;

  constructor() {}

  ngOnInit() {
  }

}

import { Component, OnInit, ContentChildren,
   AfterViewInit, QueryList, ViewEncapsulation} from '@angular/core';

import { SlideComponent } from './slide/slide.component';

@Component({
  moduleId: module.id,
  selector: 'carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['carousel.component.css'],
  directives: [ SlideComponent ],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit, AfterViewInit  {

  @ContentChildren(SlideComponent) slideComponents: QueryList<SlideComponent>;

  currentSlide: SlideComponent;
  currenIndex: number;

  constructor() {}

  nextSlide() {
    this.slideComponents.map((item, index) => {
      item.isActive = false;
      let next = this.currenIndex + 1 >= this.slideComponents.length ? 0 : this.currenIndex + 1;
      if (index == next) {
        item.isActive = true;
      }
    });
    this.currenIndex >= this.slideComponents.length - 1 ? this.currenIndex = 0 : this.currenIndex++;
  }

  prevSlide() {

    this.slideComponents.map((item, index) => {
      item.isActive = false;
      let prev = this.currenIndex - 1 < 0 ? this.slideComponents.length - 1 : this.currenIndex - 1;
      if (index == prev) {
        item.isActive = true;
      }
    });

    this.currenIndex <= 0 ? this.currenIndex = this.slideComponents.length - 1 : this.currenIndex--;

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.slideComponents.forEach((item, index) => {
      if (item.isActive) {
        this.currentSlide = item;
        this.currenIndex = index;
      }
    });
  }

}

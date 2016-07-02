import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-card',
  templateUrl: 'card.component.html',
  inputs: ['file'],
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {
  @Input() file: any;

  constructor() {
    console.log("The file is..."); 
    console.log(this.file); 
  }

  ngOnInit() {
  }

}

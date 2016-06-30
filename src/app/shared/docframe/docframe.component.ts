import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-docframe',
  templateUrl: 'docframe.component.html',
  styleUrls: ['docframe.component.css'], 
  inputs: ['embedUrl']
})

export class DocframeComponent implements OnInit {
  
  embedUrl: string; 
  
  constructor() {
    
  }

  ngOnInit() {
  }

}

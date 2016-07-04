import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../../+doc/doc.model';

@Component({
  moduleId: module.id,
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {

  @Input() file: Document;
  @Input() currentDoc: any;

  constructor() {
  }

  ngOnInit() {
  }

}

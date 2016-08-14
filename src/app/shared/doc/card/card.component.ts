import { Component, OnInit, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { DocService } from '../../services/doc/doc.service';

import { Document } from '../../../models/doc.model';

@Component({
  moduleId: module.id,
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
  directives: [NgClass]
})
export class CardComponent implements OnInit {

  @Input() doc: Document;
  @Input() currentDoc: any;

  constructor(private docService: DocService) {
  }

  ngOnInit() {
  }

}

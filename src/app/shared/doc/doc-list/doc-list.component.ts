import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CardComponent } from '../card/card.component';


@Component({
  moduleId: module.id,
  selector: 'app-doc-list',
  templateUrl: 'doc-list.component.html',
  styleUrls: ['doc-list.component.css'],
  directives: [CardComponent]
})
export class DocListComponent implements OnInit {

  @Input() docs: any;
  @Input() currentDoc: any;

  constructor(private router: Router) {}

  openDoc(doc) {
    this.router.navigate(['/doc', doc.id]);
  }

  ngOnInit() {
  }

}

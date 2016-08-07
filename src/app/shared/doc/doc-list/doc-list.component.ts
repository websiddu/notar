import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CardComponent } from '../card/card.component';
import { DocService } from '../../services/doc/doc.service';


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

  constructor(private router: Router,
  private docService: DocService) {}

  openDoc(doc) {
    // this.docService.setDoc(doc);
    this.router.navigate(['/docs', doc.id]);
  }

  ngOnInit() {
  }

}

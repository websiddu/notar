import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgClass }  from '@angular/common';

import { Router } from '@angular/router';

// Route component
import { DocsComponent } from './+docs';
import { LoginComponent } from './+login';

// Services
import { UtilService } from './shared/services/util.service';
import { AuthService } from './shared/services/auth/auth.service';
import { ApiService } from './shared/services/api/api.service';


@Component({
  moduleId: module.id,
  selector: 'notar-app',
  templateUrl: 'notar.component.html',
  styleUrls: ['notar.component.css'],
  directives: [LoginComponent,
    DocsComponent,
    NgClass],
  providers: [AuthService, UtilService],
  encapsulation: ViewEncapsulation.None
})

export class NotarAppComponent implements OnInit {

  public isSignedIn: boolean = false;

  constructor(
    public router: Router,
    private auth: AuthService,
    private utils: UtilService,
    private api: ApiService) {
  }

  ngOnInit() {
    let params = this.utils.getParams();
    if (params['state'] && params['state']['action'] == 'create') {
      this.api.createNewDoc('Hot and sexy...').then((res) => {
        let doc = JSON.parse(res.body);
        this.router.navigate([`/docs/${doc.id}`]);
      });
    }
  }
}

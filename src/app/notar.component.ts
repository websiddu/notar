import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgClass }  from '@angular/common';

// Route component
import { DocsComponent } from './+docs';
import { LoginComponent } from './+login';

// Services
import { AuthService } from './shared/services/auth/auth.service';


@Component({
  moduleId: module.id,
  selector: 'notar-app',
  templateUrl: 'notar.component.html',
  styleUrls: ['notar.component.css'],
  directives: [LoginComponent,
    DocsComponent,
    NgClass],
  providers: [AuthService],
  encapsulation: ViewEncapsulation.None
})

export class NotarAppComponent implements OnInit {

  public isSignedIn: boolean = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {

  }
}

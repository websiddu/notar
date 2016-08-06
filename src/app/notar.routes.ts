import { provideRouter, RouterConfig } from '@angular/router';


import { DocsComponent } from './+docs/docs.component';
import { DocComponent } from './+docs/doc/doc.component';
import { SideBarComponent } from './+docs/side-bar/side-bar.component';
import { TagsBarComponent } from './+docs/tags-bar/tags-bar.component';

import { AuthService } from './shared/services/auth/auth.service';
import { AuthGuard } from './shared/services/auth/auth.guard.service';

import { LoginComponent } from './+login/login.component';

// import { CanDeactivateGuard } from './interfaces';

export const routes: RouterConfig = [
  {
    path: '',
    // pathMatch: 'prefix', //default
    redirectTo: 'login',
    terminal: true
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'docs',
    component: DocsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: DocComponent
      },
      {
        path: ''
        // component: DocsComponent
      }
    ]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes, {enableTracing: true}),
  AuthGuard,
  AuthService
];

import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from './+docs/docs.component';
import { DocComponent } from './+docs/doc/doc.component';
import { NotarAppComponent } from './notar.component';

// import { AuthService } from './shared/services/auth/auth.service';
import { AuthGuard } from './shared/services/auth/auth.guard.service';
import { LoginComponent } from './+login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotarAppComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'docs',
    component: DocsComponent,
    canActivate: [AuthGuard],
    children: [{
      path: ':id',
      component: DocComponent
    }, {
      path: ''
    }]
  },

];

export const routingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

import { RouterConfig } from '@angular/router';
import { DocsComponent } from './docs.component';

import { AuthGuard } from '../shared/services/auth/auth.guard.service';
import { CanDeactivateGuard } from '../shared/services/auth/auth.interfaces';

export const DocsRoutes: RouterConfig = [
  { path: 'docs', component: DocsComponent, canActivate: [AuthGuard] },
  { path: 'docs/:id', component: DocsComponent, canDeactivate: [CanDeactivateGuard]}
];

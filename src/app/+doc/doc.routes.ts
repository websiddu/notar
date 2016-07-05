import { RouterConfig } from '@angular/router';
import { DocComponent } from './doc.component';

import { AuthGuard } from '../shared/services/auth/auth.guard.service';
import { CanDeactivateGuard } from '../shared/services/auth/auth.interfaces';

export const DocRoutes: RouterConfig = [
  { path: 'doc', component: DocComponent, canActivate: [AuthGuard] },
  { path: 'doc/:id', component: DocComponent, canDeactivate: [CanDeactivateGuard]}
];

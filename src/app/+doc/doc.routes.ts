import { RouterConfig }          from '@angular/router';
import { DocComponent } from './doc.component';
// import { CrisisAdminComponent }  from './crisis-admin.component';

// import { CanDeactivateGuard }    from '../interfaces';
// import { AuthGuard }             from '../auth.guard';

export const DocRoutes: RouterConfig = [
  {
    path: 'doc',
    component: DocComponent,
    // children: [
    //   {
    //     path: 'admin',
    //     component: CrisisAdminComponent,
    //     canActivate: [AuthGuard]
    //   },
    //   {
    //     path: ':id',
    //     component: CrisisDetailComponent,
    //     canDeactivate: [CanDeactivateGuard]
    //   },
    //   {
    //     path: '',
    //     component: CrisisListComponent
    //   }
    // ]
  }
];
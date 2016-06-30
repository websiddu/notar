import { RouterConfig }          from '@angular/router';
// import { CrisisDetailComponent } from './crisis-detail.component';
// import { CrisisListComponent }   from './crisis-list.component';
import { AuthGuard } from '../shared/services/auth/auth.guard.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { LoginComponent } from './login.component';
// import { CrisisAdminComponent }  from './crisis-admin.component';

// import { CanDeactivateGuard }    from '../interfaces';
// import { AuthGuard }             from '../auth.guard';

export const LoginRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: '/login',
    terminal: true
  },
  {
    path: 'login',
    component: LoginComponent,
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

export const AUTH_PROVIDERS = [AuthGuard, AuthService];
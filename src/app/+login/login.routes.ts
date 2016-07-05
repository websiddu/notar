import { AuthGuard } from '../shared/services/auth/auth.guard.service';
import { AuthService } from '../shared/services/auth/auth.service';

import { LoginComponent } from './login.component';


export const LoginRoutes = [
  {
    path: '',
    redirectTo: '/login',
    terminal: true
  },
  { path: 'login', component: LoginComponent }
];

export const AUTH_PROVIDERS = [AuthGuard, AuthService];
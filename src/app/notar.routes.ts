import { provideRouter, RouterConfig } from '@angular/router';
import { LoginRoutes, AUTH_PROVIDERS } from './+login/login.routes';
import { DocRoutes } from './+doc/doc.routes';

// import { CanDeactivateGuard } from './interfaces';

export const routes: RouterConfig = [
//   ...HeroesRoutes,
  ...LoginRoutes,
  ...DocRoutes
//   ...CrisisCenterRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
//   AUTH_PROVIDERS,
//   CanDeactivateGuard
];

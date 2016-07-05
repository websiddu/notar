import { RouterConfig } from '@angular/router';
import { DocComponent } from './doc.component';

export const DocRoutes: RouterConfig = [
  { path: 'doc', component: DocComponent },
  { path: 'doc/:id', component: DocComponent }
];

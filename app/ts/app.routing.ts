import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
  // otherwise redirect to dashboard
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

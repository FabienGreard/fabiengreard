import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin.component';

import { AuthGuard } from '../../guards/auth.guard';

const AdminRoute: Routes = [
  {
    path: '', component: AdminComponent,
    canActivate: [AuthGuard]
  },
];

export const routing = RouterModule.forChild(AdminRoute);

import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin.component';
import { AdminArticleComponent } from './components/admin-article.component';
import { AdminUserComponent } from './components/admin-user.component';

import { AuthGuard } from '../../guards/auth.guard';

const AdminRoute: Routes = [
  {
    path: '', component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'article', component: AdminArticleComponent },
      { path: 'user', component: AdminUserComponent }
    ]
  },
];

export const routing = RouterModule.forChild(AdminRoute);

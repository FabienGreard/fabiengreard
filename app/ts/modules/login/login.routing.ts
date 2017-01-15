import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const LoginRoutes: Routes = [
  { path: '', component: LoginComponent }
];

export const routing = RouterModule.forChild(LoginRoutes);

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component';

const LoginRoutes: Routes = [
  { path: '', component: LoginComponent }
];

export const routing = RouterModule.forChild(LoginRoutes);

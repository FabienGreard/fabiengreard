import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/index';
import { DashboardComponent } from './components/dashboard/index';
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
import { AdminComponent } from './components/admin/index';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent },

    // otherwise redirect to dashboard
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

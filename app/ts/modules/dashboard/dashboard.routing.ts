import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { ArticlePageComponent } from '../article/components/article-page.component';
import { ArticleDetailComponent } from '../article/components/article-detail.component';
import { LoginComponent } from '../login/components/login.component';

const DashboardRoute: Routes = [
  { path: '', component: DashboardComponent,
    children:[
      { path: '', component: ArticlePageComponent },
      { path: 'article', component: ArticleDetailComponent }
    ]
  },
  { path: 'admin', loadChildren: '../admin/admin.module#AdminModule' },
  { path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(DashboardRoute);

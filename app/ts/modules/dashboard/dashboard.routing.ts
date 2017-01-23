import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { ArticlePageComponent } from '../article/components/article-page.component';

const DashboardRoute: Routes = [
  { path: '', component: DashboardComponent,
    children:[
      { path: '', component: ArticlePageComponent }
    ]
  },
];

export const routing = RouterModule.forRoot(DashboardRoute);

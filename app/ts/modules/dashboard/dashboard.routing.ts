import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { ArticleComponent } from '../article/components/article.component';

const DashboardRoute: Routes = [
  { path: '', component: DashboardComponent,
    children:[
      { path: '', component: ArticleComponent }
    ]
  },
];

export const routing = RouterModule.forRoot(DashboardRoute);

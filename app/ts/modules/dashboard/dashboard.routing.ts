import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { ArticlePageComponent } from '../article/components/article-page.component';
import { ArticleDetailComponent } from '../article/components/article-detail.component';

const DashboardRoute: Routes = [
  { path: '', component: DashboardComponent,
    children:[
      { path: '', component: ArticlePageComponent },
      { path: 'article', component: ArticleDetailComponent }
    ]
  },
];

export const routing = RouterModule.forRoot(DashboardRoute);

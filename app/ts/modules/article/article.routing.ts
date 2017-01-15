import { RouterModule, Routes } from '@angular/router';

import { ArticleDetailComponent } from './components/article-detail.component';

const ArticleRoute: Routes = [
  { path: 'article', component: ArticleDetailComponent }
];

export const routing = RouterModule.forRoot(ArticleRoute);

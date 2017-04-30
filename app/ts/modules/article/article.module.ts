import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ROUTING */
import { routing } from './article.routing';

/* MODULES */
import { AlertModule } from '../alert/index';
import { DisqusModule } from '../disqus/index';

/* COMPONENTS */
import { ArticleComponent } from './components/article.component';
import { ArticlePageComponent } from './components/article-page.component';
import { ArticleDetailComponent } from './components/article-detail.component';

/* SERVICES */
import { ArticleHelper } from './article.helper';
import { ArticleService } from '../../services/api/index';

/* DIRECTIVES */
@NgModule({
  imports: [
    CommonModule,
    routing,
    AlertModule,
    DisqusModule
  ],
  declarations: [
    ArticleComponent,
    ArticlePageComponent,
    ArticleDetailComponent
  ],
  providers: [
    ArticleService,
    ArticleHelper
  ]
})
export class ArticleModule { }

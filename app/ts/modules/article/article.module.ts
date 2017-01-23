import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ROUTING */
import { routing } from './article.routing';

/* MODULES */

/* COMPONENTS */
import { ArticleComponent } from './components/article.component';
import { ArticlePageComponent } from './components/article-page.component';
import { ArticleDetailComponent } from './components/article-detail.component';

/* SERVICES */
import { ArticleService } from './article.service';

/* DIRECTIVES */
@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    ArticleComponent,
    ArticlePageComponent,
    ArticleDetailComponent
  ],
  providers: [ArticleService]
})
export class ArticleModule { }

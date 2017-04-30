import { Component, OnInit, OnDestroy, OnChanges, Inject, Input, trigger, style, transition, animate } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ConsoleLogService } from '../../console-log/index';
import { ArticleHelper } from '../article.helper';

@Component({
  selector: 'article-detail',
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity:0}),
        animate(300, style({opacity:1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate(300, style({opacity:0}))
      ])
    ])
  ],
  template: require('../html/article-detail.template.html'),
})
export class ArticleDetailComponent implements OnInit {
  private sub: any;
  url: any;
  idArticle: any;
  article: {'id': any, 'title': string, 'content': any, 'date': string, 'tags': Array<string>};
   constructor(
     private route: ActivatedRoute,
     private articleHelper: ArticleHelper,
     private consoleLogService: ConsoleLogService,
     @Inject(DOCUMENT) private document: any) {
       this.url = this.document.location.href;
     }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.idArticle = params['id'];
        this.loadArticle(this.idArticle);
   });
  }

  loadArticle(id: any){
    _.forEach(JSON.parse(localStorage.getItem('articles')), (article) =>{
      if(article.id == id){
        this.article = article;
      }
    });

    this.consoleLogService.message(this.article);
  }

  toggleTag(value: string){
    this.articleHelper.toggleTag(value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

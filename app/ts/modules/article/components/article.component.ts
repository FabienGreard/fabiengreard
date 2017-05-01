import { Component, OnInit, OnChanges, Input, trigger, style, transition, animate } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ArticleHelper } from '../article.helper';
import { ArticleService } from '../../../services/api/index';
import { AlertService } from '../../alert/index';
import { ConsoleLogService } from '../../console-log/index';

@Component({
  selector: 'article',
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
  template: require('../html/article.template.html'),
})
export class ArticleComponent implements OnChanges, OnInit {
  private articles : Array<{'id': any, 'title': string, 'content': any, 'date': string, 'tags': Array<string>}> = [];
  private tags: Array<{name: string, active: boolean}>;
  @Input() idArticle: string;

   constructor(
     private articleHelper: ArticleHelper,
     private articleService: ArticleService,
     private alertService: AlertService,
     private consoleLogService: ConsoleLogService) {}

  ngOnInit() {
    if(this.articles == []){
      this.get();
    }
  }

  ngOnChanges(changes) {
    if (changes.idArticle) {
       this.refresh();
    }
  }

  get(){
    this.articleService.get().subscribe(
      data => {
        this.initArticle();
        this.consoleLogService.message(data);
      },
      error =>{
        this.consoleLogService.message(error);
        this.alertService.error("Something went wrong");
      });
  }

  initArticle(){
    for(let i = parseInt(this.idArticle.split("-")[0]); i < parseInt(this.idArticle.split("-")[1]); i++){
      if(JSON.parse(localStorage.getItem('articles'))[i]){
        this.articles.push(JSON.parse(localStorage.getItem('articles'))[i]);
      }
    }
    // create a readeable post
    this.articles = this.defineArticleTemplate();
  }

  refresh(){
    this.articles = [];
    this.get();
  }

  defineArticleTemplate(): Array<{'id': any, 'title': string, 'content': any, 'date': string, 'tags': string[]}>{
    return _.forEach(this.articles, (article) => {
      let split = article.content.toString().split("");
      article.content = split.slice(0, 300).join("");
      return article.content += "[..]";
     });
  }

  checkIfTag(tags: string[]): boolean{
    let tagBoolean: boolean = false;

    //check if all tabs are false by default
    if(this.articleHelper.isEverything()){ return !tagBoolean; }

    //in case there is an url change (temporary fix)
    this.tags = this.articleHelper.getStaticTabs();

    _.forEach(this.tags, (tagActive) => {
      if(tagActive.active){
        if(_.includes(tags, tagActive.name)){
          tagBoolean = true;
        }
      }
    });

    return tagBoolean;
  }

  toggleTag(value: string){
    this.articleHelper.toggleTag(value);
  }
}

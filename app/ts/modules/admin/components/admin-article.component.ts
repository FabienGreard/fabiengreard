import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../../services/api/index';
import { ConsoleLogService } from '../../console-log/index';
import { AlertService } from '../../alert/index';

import { Article } from '../../../models/index';

@Component({
  selector: 'admin-article',
  template: require('../html/admin-article.template.html')
})
export class AdminArticleComponent implements OnInit {
  articles: Array<Article> = [];
  currentArticle: Article = {
    'date': new Date().toISOString().substr(0, 10),
  };

  constructor(
    private articleService: ArticleService,
    private alertService: AlertService,
    private consoleLogService: ConsoleLogService) {  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('articles'))){
      this.articles = JSON.parse(localStorage.getItem('articles'));
    }else{
      this.get();
    }
    this.consoleLogService.message(this.articles);
    this.consoleLogService.message(this.currentArticle);
  }

  selectArticle(article: Article){
    Object.assign(this.currentArticle, article);
    this.currentArticle.date = article.date.substr(0, 10);
  }

  send(){
    //check if http method will be and update or a post
    if(_.find(this.articles, { 'id': this.currentArticle.id })){
      this.put();
      this.consoleLogService.message(this.currentArticle);
    }else{
      this.formatTags();
      this.post();
      this.consoleLogService.message(this.currentArticle);
    }
  }

  formatTags(){
    if(this.currentArticle.tags){
      this.currentArticle.tags = this.currentArticle.tags.split(/[\s,]+/);
    }
  }

  get(){
    this.articleService.get().subscribe(
      data => {
        this.articles = data;
        this.currentArticle = {
          'date': new Date().toISOString().substr(0, 10),
        };
        this.consoleLogService.message(data);
      },
      error =>{
        this.consoleLogService.message(error);
        this.alertService.error("Something went wrong");
      });
  }

  put(){
    this.articleService.put(this.currentArticle).subscribe(
      data => {
        this.consoleLogService.message(data);
        this.get();
      },
      error =>{
        this.consoleLogService.message(error);
        this.alertService.error("Something went wrong");
      });
  }

  post(){
    this.articleService.post(this.currentArticle).subscribe(
      data => {
        this.consoleLogService.message(data);
        this.get();
      },
      error =>{
        this.consoleLogService.message(error);
        this.alertService.error("Something went wrong");
      });
  }

  delete(id: any){
    this.articleService.delete(id).subscribe(
      data => {
        this.consoleLogService.message(data);
        this.get();
      },
      error =>{
        this.consoleLogService.message(error);
        this.alertService.error("Something went wrong");
      });
  }
}

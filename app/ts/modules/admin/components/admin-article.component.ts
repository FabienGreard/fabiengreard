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
  showArticle: boolean = false;

  constructor(
    private articleService: ArticleService,
    private alertService: AlertService,
    private consoleLogService: ConsoleLogService) {  }

  ngOnInit() {
    this.get();
    this.consoleLogService.message(this.articles);
    this.consoleLogService.message(this.currentArticle);
  }

  selectArticle(article: Article){
    Object.assign(this.currentArticle, article);
    this.currentArticle.date = article.date.substr(0, 10);
  }

  new(){
    this.currentArticle = {
      'date': new Date().toISOString().substr(0, 10),
    };
  }

  show(){
    this.showArticle = !this.showArticle;
  }

  send(){
    //check if http method will be and update or a post
    if(_.find(this.articles, { 'id': this.currentArticle.id })){
      this.put();
      this.consoleLogService.message(this.currentArticle);
    }else{
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

  bold(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<span class='bold'></span>";
    }else{
      this.currentArticle.content = "<span class='bold'></span>";
    }
  }

  italic(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<span class='italic'></span>";
    }else{
      this.currentArticle.content = "<span class='italic'></span>";
    }
  }

  underline(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<span class='underline'></span>";
    }else{
      this.currentArticle.content = "<span class='underline'></span>";
    }
  }

  size(size: number){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<span class='size-" + size +"'></span>";
    }else{
      this.currentArticle.content = "<span class='size-" + size +"'></span>";
    }
  }

  font(font: string){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<span class='font-" + font.toLowerCase() +"'></span>";
    }else{
      this.currentArticle.content = "<span class='font-" + font.toLowerCase() +"'></span>";
    }
  }

  alignLeft(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<div class='align-left'></div>";
    }else{
      this.currentArticle.content = "<div class='align-left'></div>";
    }
  }

  alignCenter(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<div class='align-center'></div>";
    }else{
      this.currentArticle.content = "<div class='align-center'></div>";
    }
  }

  alignRight(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<div class='align-right'></div>";
    }else{
      this.currentArticle.content = "<div class='align-right'></div>";
    }
  }

  listOl(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<ol><li></li></ol>";
    }else{
      this.currentArticle.content = "<ol><li></li></ol>";
    }
  }

  listUl(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<ul><li></li></ul>";
    }else{
      this.currentArticle.content = "<ul><li></li></ul>";
    }
  }

  code(){
    if(typeof this.currentArticle.content !== 'undefined'){
      this.currentArticle.content += "<div class='code'></div>";
    }else{
      this.currentArticle.content = "<div class='code'></div>";
    }
  }
}

import { Component, OnInit, ViewChild  } from '@angular/core';

import { AlertComponent } from '../../alert/index';
import { ArticleService } from '../../../services/api/index';
import { ConsoleLogService } from '../../console-log/index';

@Component({
  selector: 'page',
  template: require('../html/article-page.template.html'),
})
export class ArticlePageComponent implements OnInit {
  pageWrapper: string = "0-9";
  pageActive: number = 0;
  pageArray: Array<number> = [];
  alertMessage: string = '';
  alert: boolean = false;
  private articles : Array<{'id': any, 'title': string, 'content': any, 'date': string, 'tags': Array<string>}> = [];
  @ViewChild(AlertComponent) AlertComponent: AlertComponent;

  constructor(
    private articleService: ArticleService,
    private consoleLogService: ConsoleLogService) { }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('articles'))){
      this.get();
    }

    const articles = JSON.parse(localStorage.getItem('articles'));

    for(let i = 0; i < this.pageNav(articles.length); i++){
      this.pageArray.push(i);
    }

  }

  get(){
    this.articleService.get().subscribe(
      data => {
        this.articles = data;
        // create a readeable post
        this.articles = this.defineArticleTemplate();
        this.consoleLogService.message(data);
      },
      error =>{
        this.consoleLogService.message(error);
      });
  }

  ngAfterContentChecked () {
    this.alert = (this.AlertComponent.message) ? true : false;
  }

  pageNav(length: number): number{
    return Math.ceil(length / 9);
  }

  pageHandlerEvent(pageNumber: number){
    if(this.pageActive == pageNumber){ return; }
    this.pageWrapper = (pageNumber * 9).toString() + "-" + (pageNumber * 9 + 9).toString();
    this.pageActive = pageNumber;
  }

  defineArticleTemplate(): Array<{'id': any, 'title': string, 'content': any, 'date': string, 'tags': string[]}>{
    return _.forEach(this.articles, (key) => {
      let split = key.content.split("");
      key.content = split.slice(0, 200).join("");
      return key.content += "[..]";
     });
  }

}

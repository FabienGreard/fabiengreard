import { Component, OnInit, ViewChild  } from '@angular/core';

import { AlertComponent } from '../../alert/index';

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

  constructor() { }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('articles'))){
      for(let i = 0; i < 50; i++){
        this.articles.push({id: i, title: 'Lorem ipsum dolor sit amet', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur in nulla sed tempus. Vestibulum sed sem at urna porttitor pharetra sit amet id felis. Quisque non dolor sapien. Etiam egestas sit amet dolor eu gravida. In convallis dictum lectus eu fermentum. Vestibulum ornare quis urna eu finibus. Nulla eleifend nibh at rhoncus vulputate', date: '13 janvier 2017', tags: ['#Random', '#Design', '#React']});
      }
      // create a readeable post
      this.articles = this.defineArticleTemplate();

      //set local storage
      localStorage.setItem('articles', JSON.stringify(this.articles));
    }

    const articles = JSON.parse(localStorage.getItem('articles'));

    for(let i = 0; i <= this.pageNav(articles.length); i++){
      this.pageArray.push(i);
    }

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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page',
  template: require('../html/article-page.template.html'),
})
export class ArticlePageComponent implements OnInit {
  pageWrapper: string = "0-9";
  pageActive: number = 0;
  pageArray: Array<number> = [];

  constructor() { }

  ngOnInit() {
    const articles = JSON.parse(localStorage.getItem('articles'));

    for(let i = 0; i <= this.pageNav(articles.length); i++){
      this.pageArray.push(i);
    }

  }

  pageNav(length: number): number{
    return Math.ceil(length / 9);
  }

  pageHandlerEvent(pageNumber: number){
    if(this.pageActive == pageNumber){ return; }
    this.pageWrapper = (pageNumber * 9).toString() + "-" + (pageNumber * 9 + 9).toString();
    this.pageActive = pageNumber;
  }

}

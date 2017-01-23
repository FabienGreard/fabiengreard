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

  @ViewChild(AlertComponent) AlertComponent: AlertComponent;

  constructor() { }

  ngOnInit() {
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

}

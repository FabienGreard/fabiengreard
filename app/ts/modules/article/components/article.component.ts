import { Component, OnInit, OnChanges, Input, trigger, style, transition, animate } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ArticleService } from '../article.service';
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
     private articleService: ArticleService,
     private alertService: AlertService,
     private consoleLogService: ConsoleLogService) {}

  ngOnInit() {
    if(this.articles == []){
      for(let i = parseInt(this.idArticle.split("-")[0]); i < parseInt(this.idArticle.split("-")[1]); i++){
        this.articles.push({id: i, title: 'Lorem ipsum dolor sit amet', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur in nulla sed tempus. Vestibulum sed sem at urna porttitor pharetra sit amet id felis. Quisque non dolor sapien. Etiam egestas sit amet dolor eu gravida. In convallis dictum lectus eu fermentum. Vestibulum ornare quis urna eu finibus. Nulla eleifend nibh at rhoncus vulputate', date: '13 janvier 2017', tags: ['#Random', '#Design', '#React']});
      }
    }

    // create a readeable post
    this.articles = this.defineArticleTemplate();

    //set local storage
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  ngOnChanges(changes) {
    if (changes.idArticle) {
       this.refresh();
    }
  }

  refresh(){
    this.articles = [];

    for(let i = parseInt(this.idArticle.split("-")[0]); i < parseInt(this.idArticle.split("-")[1]); i++){
      this.articles.push({id: i, title: 'Lorem ipsum dolor sit amet', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur in nulla sed tempus. Vestibulum sed sem at urna porttitor pharetra sit amet id felis. Quisque non dolor sapien. Etiam egestas sit amet dolor eu gravida. In convallis dictum lectus eu fermentum. Vestibulum ornare quis urna eu finibus. Nulla eleifend nibh at rhoncus vulputate', date: '13 janvier 2017', tags: ['#Random', '#Design', '#React']});
    }

    // create a readeable post
    this.articles = this.defineArticleTemplate();

    //set local storage
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  defineArticleTemplate(): Array<{'id': any, 'title': string, 'content': any, 'date': string, 'tags': string[]}>{
    return _.forEach(this.articles, (key) => {
      let split = key.content.split("");
      key.content = split.slice(0, 200).join("");
      return key.content += "[..]";
     });
  }

  checkIfTag(tags: string[]): boolean{
    let tagBoolean: boolean = false;

    //check if all tabs are false by default
    if(this.articleService.isEverything()){ this.alertService.clear(); return !tagBoolean; }

    //in case there is an url change (temporary fix)
    this.tags = this.articleService.getStaticTabs();

    _.forEach(this.tags, (tagActive) => {
      if(tagActive.active){
        if(_.includes(tags, tagActive.name)){ tagBoolean = true; } }
    });

    if(!tagBoolean){
      this.alertService.error("Sorry, there is no article (yet) with this tag.");
    }
    return tagBoolean;
  }

  toggleTag(value: string){

    this.articleService.toggleTag(value);
  }

}

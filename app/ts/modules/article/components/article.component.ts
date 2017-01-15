import { Component, OnInit, trigger, style, transition, animate } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ArticleService } from '../article.service';
import { AlertService } from '../../alert/index';

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
export class ArticleComponent implements OnInit {
  private articles : Array<{'id': any, 'title': string, 'content': any, 'date': string, 'tags': Array<string>}> = [];
  private tags: Array<{name: string, active: boolean}>;

   constructor(
     private articleService: ArticleService,
     private alertService: AlertService) {
     this.articleService.getTags().subscribe((tags) => { this.tags = tags; });

     for(let i = 0; i < 10; i++){
       this.articles.push({id: 'aeazer123azaz123', title: 'Lorem ipsum dolor sit amet', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur in nulla sed tempus. Vestibulum sed sem at urna porttitor pharetra sit amet id felis. Quisque non dolor sapien. Etiam egestas sit amet dolor eu gravida. In convallis dictum lectus eu fermentum. Vestibulum ornare quis urna eu finibus. Nulla eleifend nibh at rhoncus vulputate', date: '13 janvier 2017', tags: ['#Random', '#Design', '#React']});
     }
   }

  ngOnInit() {
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

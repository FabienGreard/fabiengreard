import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { ArticleService } from '../../services/api/index';
import { Article } from '../../models/index';

@Injectable()
export class ArticleHelper {
  private subject = new Subject<any>();
  private tags: Array<{name: string, active: boolean}>;
  constructor(private articleService: ArticleService) {
    if(!JSON.parse(localStorage.getItem('articles'))){
      this.get();
    }else{
      this.initTag(JSON.parse(localStorage.getItem('articles')));
    }
  }

  get(){
    this.articleService.get().subscribe(
      data => {
        this.initTag(data);
      },
      error =>{});
  }

  initTag(articles: Article){
    this.tags = [];
    _.each(articles, (article) =>{
      _.each(article.tags, (tag) =>{
        if(!_.find(this.tags, { 'name': tag })){
          this.addTag({ name: tag, active: false})
        }
      });
    });
  }

  toggleTag(value: string){
    _.find(this.tags, { 'name': value }).active = !_.find(this.tags, { 'name': value }).active;
    this.sendTag();
  }

  addTag(tag: {name: string, active: boolean}){
    this.tags.push(tag);
    this.sendTag();
  }

  sendTag(){
    this.subject.next(this.tags);
  }

  getStaticTabs(): Array<{name: string, active: boolean}>{
    return this.tags;
  }

  isEverything(){
    return _.isUndefined(_.find(this.tags, { 'active': true }));
  }

  getTags(): Observable<any>{
      return this.subject.asObservable();
  }
}

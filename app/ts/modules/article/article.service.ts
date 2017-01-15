import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ArticleService {
  private subject = new Subject<any>();
  private tags: Array<{name: string, active: boolean}>;
  constructor() {
    this.tags = [
      { name: '#Angular2', active: false},
      { name: '#Javascript', active: false},
      { name: '#React', active: false},
      { name: '#Python', active: false},
      { name: '#Random', active: false},
      { name: '#Design', active: false}
    ];
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

  isEverything(){
    return _.isUndefined(_.find(this.tags, { 'active': true }));
  }

  getTags(): Observable<any>{
      return this.subject.asObservable();
  }
}

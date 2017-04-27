import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConsoleLogService } from '../../modules/console-log/index';
import { Article } from '../../models/index';
import { ApiHelper } from './index';

@Injectable()
export class ArticleService extends ApiHelper{

    constructor(private http: Http, private consoleLogService: ConsoleLogService) {
      super();
      super.setApiUrl('articles')
    }

    get(){
      return this.http.get(super.getApiUrl() + "/")
      .map((res: Response) => {
          localStorage.setItem('articles', JSON.stringify(res.json()));
          //this.consoleLogService.message(res.json());
          return res.json();
        })
        .catch((err) => {
          return Observable.throw(err.message || err);
        });
    }

    delete(id: any){
      return this.http.delete(super.getApiUrl() + "/" + id + "?access_token=" + super.getToken())
      .map((res: Response) => {
          //this.consoleLogService.message(res.json());
          return res.json();
        })
        .catch((err) => {
          return Observable.throw(err.message || err);
        });
    }

    post(article: Article){
      return this.http.post(super.getApiUrl() + "/" + "?access_token=" + super.getToken(), article)
      .map((res: Response) => {
          //this.consoleLogService.message(res.json());
          return res.json();
        })
        .catch((err) => {
          return Observable.throw(err.message || err);
        });
    }

    put(article: Article){
      return this.http.put(super.getApiUrl() + "/" + article.id + "?access_token=" + super.getToken(), article)
      .map((res: Response) => {
          //this.consoleLogService.message(res.json());
          return res.json();
        })
        .catch((err) => {
          return Observable.throw(err.message || err);
        });
    }

    /*getArticleById(): Observable<any>{
    }

    update(article: Article){
      return this.http.put(super.getApiUrl() + "/" + JSON.parse(localStorage.getItem('currentUser')).id + "?access_token=" + super.getToken(), user)
      .map((res: Response) => {
          let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
          localStorage.setItem('currentUser', JSON.stringify({ id: res.json().id, username: res.json().username, token : currentUser.token, email: res.json().email}));
          //this.consoleLogService.message(res.json());
          return res.json();
        })
        .catch((err) => {
          return Observable.throw(err.message || err);
        });
    }*/
}

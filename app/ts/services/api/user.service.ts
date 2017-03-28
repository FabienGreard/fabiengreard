import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConsoleLogService } from '../../modules/console-log/index';
import { User } from '../../models/index';
import { ApiHelper } from './index';

@Injectable()
export class UserService extends ApiHelper{

    constructor(private http: Http, private consoleLogService: ConsoleLogService) {
      super();
      super.setApiUrl('users')
    }

    getUserById(): Observable<any>{
      if(!JSON.parse(localStorage.getItem('currentUser'))){ return Observable.throw("cannot find user"); }
      return this.http.get(super.getApiUrl() + "/" + JSON.parse(localStorage.getItem('currentUser')).id + "?access_token=" + super.getToken())
      .map((res: Response) => {
          //this.consoleLogService.message(res.json());
          let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
          localStorage.setItem('currentUser', JSON.stringify({ id: currentUser.id, username: res.json().username, token : currentUser.token, email: res.json().email}));
          return res.json();
        })
        .catch((err) => {
          return Observable.throw(err.message || err);
        });
    }

    update(user: User){
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
    }
}

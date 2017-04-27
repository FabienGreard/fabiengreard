import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ConsoleLogService } from '../../modules/console-log/index';
import { ApiHelper } from './index';

@Injectable()
export class AuthentificationService extends ApiHelper{

    constructor(private http: Http, private consoleLogService: ConsoleLogService) {
      super();
      super.setApiUrl('users')
    }

    login(model: any): Observable<any> {
        return this.http.post(super.getApiUrl() + "/login", model)
        .map((res: Response) => {
            // store user id in local storage
            localStorage.setItem('currentUser', JSON.stringify({ id: res.json().userId, token : res.json().id }));
            //this.consoleLogService.message(res.json());
            return res.json();
          })
          .catch((err) => {
            return Observable.throw(err.message || err);
          });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
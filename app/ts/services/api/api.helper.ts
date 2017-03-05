import { RequestOptions } from '@angular/http';
import { User } from '../../models/index';

export class ApiHelper {
  protected apiUrl: string = 'http://213.32.91.42:3000/api/';

  constructor(){}

  //set api url
  setApiUrl(collection: string){
    this.apiUrl = this.apiUrl + collection;
  }

  getApiUrl(){
    return this.apiUrl;
  }

  getToken(){
    if(JSON.parse(localStorage.getItem('currentUser'))){
      let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser.token) {
        return currentUser.token;
      }
    }
  }
}

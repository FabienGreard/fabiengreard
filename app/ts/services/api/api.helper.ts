import { RequestOptions } from '@angular/http';

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
    if(JSON.parse(localStorage.getItem('user'))){
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.token) {
        return user.token;
      }
    }
  }
}

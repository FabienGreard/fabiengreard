import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ConsoleLogService {
  subject = new Subject<any>();

  constructor() {}

  message(value: any){
    this.subject.next(value);
  }

  getMessage(): Observable<any>{
      return this.subject.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();

    constructor() { }

    success(message: string) {
        this.subject.next({ type: 'success', route: '/', title: 'Success', text: message });
    }

    info(message: string) {
        this.subject.next({ type: 'info', route: '/', title: 'Info', text: message });
    }

    error(message: string) {
        this.subject.next({ type: 'error', route: '/', title: 'Error', text: message });
    }

    clear(){
        this.subject.next('');
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

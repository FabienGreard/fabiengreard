import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();

    constructor() { }

    success(message: string) {
        this.subject.next({ route: '/', title: 'Succès', text: message });
    }

    info(message: string) {
        this.subject.next({ route: '/', title: 'Info', text: message });
    }

    error(message: string) {
        this.subject.next({ route: '/', title: 'Erreur', text: message });
    }

    clear(){
        this.subject.next('');
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

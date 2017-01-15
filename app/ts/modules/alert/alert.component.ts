import { Component, OnInit } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
    selector: 'alert',
    template: require('./alert.template.html'),
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }

    clear(){
      this.message = '';
    }
}

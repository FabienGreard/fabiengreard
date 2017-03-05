import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthentificationService } from '../../../services/api/index';
import { ConsoleLogService } from '../../../modules/console-log/index';
import { AlertService } from '../../alert/index';

@Component({
    selector: 'login',
    template: require('../html/login.template.html'),
})

export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authentificationService: AuthentificationService,
        private alertService: AlertService,
        private consoleLogService: ConsoleLogService) { }

    ngOnInit() {
        // reset login status
        this.authentificationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
      this.authentificationService.login(this.model)
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.alertService.error("Response with status: 401 Unauthorized");
          });
    }
}

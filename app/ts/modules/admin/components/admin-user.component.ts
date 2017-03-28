import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../alert/index';
import { ConsoleLogService } from '../../console-log/index';
import { User } from '../../../models/index';
import { UserService } from '../../../services/api/index';
import { AuthentificationService } from '../../../services/api/index';

@Component({
  selector: 'admin-user',
  template: require('../html/admin-user.template.html')
})
export class AdminUserComponent implements OnInit {
  userForm : FormGroup;
  currentUser: User;
  passwordBool: boolean = false;
  newPassword: any;

  constructor(
    private fb: FormBuilder,
    private consoleLogService: ConsoleLogService,
    private alertService: AlertService,
    private userService: UserService,
    private authentificationService: AuthentificationService) {
    this.userForm = fb.group({
        username: ['', Validators.required ],
        email: ['', Validators.required ],
        password: ['', Validators.required ],
        newPassword: ['']
    });
  }

  ngOnInit() {
    this.userService.getUserById()
      .subscribe(
        data => {
            this.userForm.setValue({ username: data.username, email: data.email, password: "", newPassword: "" });
        },
        error => {
          this.alertService.error(error);
        });
  }

  submit(value: User){
    this.authentificationService.login({ 'email': JSON.parse(localStorage.getItem('currentUser')).email, 'password': value.password })
    .subscribe(
      data => {
        if(this.newPassword != "" && typeof this.newPassword != 'undefined'){
          value = _.omit(value, ['newPassword']);
          value.password = this.newPassword;
          this.togglePasswordBool();
        }
        this.userService.update(value)
          .subscribe(
            data => {
                this.alertService.success("Update successful");
            },
            error => {
              this.alertService.error(error);
            });
      },
      error => {
        this.alertService.error("Wrong password");
      });
  }

  togglePasswordBool(){
    this.passwordBool = !this.passwordBool;
    this.newPassword = "";
  }

}

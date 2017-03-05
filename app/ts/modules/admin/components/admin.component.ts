import { Component, OnInit } from '@angular/core';

import { AuthentificationService } from '../../../services/api/index';
@Component({
  selector: 'admin',
  template: require('../html/admin.template.html')
})
export class AdminComponent implements OnInit {
  constructor(private authentificationService: AuthentificationService) {  }

  ngOnInit() {}

  logout(){
    this.authentificationService.logout();
  }
}

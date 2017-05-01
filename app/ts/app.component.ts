import { Component, OnInit } from '@angular/core';

import '../scss/app.scss';
import { ConsoleLogService } from './modules/console-log/index';

@Component({
  selector: 'app',
  template: require('./app.component.html')
})
export class AppComponent implements OnInit{
  prod: boolean = false;

  constructor(private consoleLogService: ConsoleLogService){}

  ngOnInit(){
    if (process.env.ENV !== 'production'){
      this.consoleLogService.message("developement mode enable");
      this.prod = true;
    }else{
      console.error("You shall not pass ! *Gandal is watching you*");
    }
  }
}

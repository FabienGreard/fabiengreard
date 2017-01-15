import { Component, OnInit } from '@angular/core';

import '../css/app.css';
import { ConsoleLogService } from './modules/console-log/index';

@Component({
  selector: 'app',
  template: require('./app.component.html')
})
export class AppComponent implements OnInit{
  constructor(private consoleLogService: ConsoleLogService){}

  ngOnInit(){
      this.consoleLogService.message("developement mode enable");
  }
}

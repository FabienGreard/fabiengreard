import { Component } from '@angular/core';

import { ConsoleLogService } from './console-log.service';

@Component({
  selector: 'console-log',
  template: require('./console-log.template.html')
})
export class ConsoleLogComponent {
  logs: Array<string> = [];
  display: boolean = true;

  constructor(private consoleService: ConsoleLogService) {
    //init console-log if dev build
  if (process.env.ENV !== 'production')
    this.consoleService.getMessage().subscribe(value => this.logs.push(value) );

  }

  toggleConsole(){
    this.display = !this.display;
  }

}

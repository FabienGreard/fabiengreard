import { Component } from '@angular/core';

import { ConsoleLogService } from './console-log.service';

@Component({
  selector: 'console-log',
  template: require('./console-log.template.html')
})
export class ConsoleLogComponent {
  logs: Array<string> = [];
  display: boolean = false;

  constructor(private consoleService: ConsoleLogService) {
    //init console-log if dev build
  if (process.env.ENV !== 'production')
    this.consoleService.getMessage().subscribe(value => {this.logs.push(JSON.stringify(value)); console.log(value)});
  }

  toggleConsole(){
    this.display = !this.display;
  }

}

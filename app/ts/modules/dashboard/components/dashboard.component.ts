import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';

@Component({
  selector: 'dashboard',
  template: require('../html/dashboard.template.html')
})
export class DashboardComponent implements OnInit {
  constructor(private consoleLogService: ConsoleLogService) {}

  ngOnInit() {}
}

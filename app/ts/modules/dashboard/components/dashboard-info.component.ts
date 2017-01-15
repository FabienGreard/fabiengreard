import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';

@Component({
  selector: 'dashboard-info',
  template: require('../html/dashboard-info.template.html')
})
export class DashboardInfoComponent implements OnInit {
  constructor(private consoleLogService: ConsoleLogService) {}

  ngOnInit() {}
}

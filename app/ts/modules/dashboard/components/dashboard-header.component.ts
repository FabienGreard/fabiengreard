import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';

@Component({
  selector: 'dashboard-header',
  template: require('../html/dashboard-header.template.html')
})
export class DashboardHeaderComponent implements OnInit {
  constructor(private consoleLogService: ConsoleLogService) {}

  ngOnInit() {}
}

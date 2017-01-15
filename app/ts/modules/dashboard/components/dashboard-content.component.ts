import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';

@Component({
  selector: 'dashboard-content',
  template: require('../html/dashboard-content.template.html')
})
export class DashboardContentComponent implements OnInit {
  private id: string = "mdr";
  constructor(private consoleLogService: ConsoleLogService) {}

  ngOnInit() {}
}

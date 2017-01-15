import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';

@Component({
  selector: 'dashboard-footer',
  template: require('../html/dashboard-footer.template.html')
})
export class DashboardFooterComponent implements OnInit {
  year: number;
  constructor(private consoleLogService: ConsoleLogService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {}
}

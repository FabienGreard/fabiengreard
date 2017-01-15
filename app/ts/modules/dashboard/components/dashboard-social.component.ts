import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';

@Component({
  selector: 'dashboard-social',
  template: require('../html/dashboard-social.template.html')
})
export class DashboardSocialComponent implements OnInit {
  constructor(private consoleLogService: ConsoleLogService) {}

  ngOnInit() {}
}

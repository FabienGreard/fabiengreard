import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';

import '../../../../images/picture.jpg';

@Component({
  selector: 'dashboard-info',
  template: require('../html/dashboard-info.template.html')
})
export class DashboardInfoComponent implements OnInit {
  constructor(private consoleLogService: ConsoleLogService) {}

  image = '../../../../images/picture.jpg';
  offset = 100;

  ngOnInit() {}
}

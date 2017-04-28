import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';
import { ArticleHelper } from '../../article/index';

@Component({
  selector: 'dashboard-tag',
  template: require('../html/dashboard-tag.template.html')
})
export class DashboardTagComponent implements OnInit {
  private tags: Array<{name: string, active: boolean}>;
  constructor(
    private consoleLogService: ConsoleLogService,
    private articleHelper: ArticleHelper) { }

  ngOnInit() {
    this.articleHelper.getTags().subscribe((tags) => { this.tags = tags });
    //init list
    this.articleHelper.sendTag();
  }

  toggleTag(value: string){
    this.articleHelper.toggleTag(value);
  }
}

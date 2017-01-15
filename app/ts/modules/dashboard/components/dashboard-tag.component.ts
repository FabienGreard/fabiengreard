import { Component, OnInit } from '@angular/core';

import { ConsoleLogService } from '../../console-log/index';
import { ArticleService } from '../../article/index';

@Component({
  selector: 'dashboard-tag',
  template: require('../html/dashboard-tag.template.html')
})
export class DashboardTagComponent implements OnInit {
  private tags: Array<{name: string, active: boolean}>;
  constructor(
    private consoleLogService: ConsoleLogService,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getTags().subscribe((tags) => { this.tags = tags });
    //init list
    this.articleService.sendTag();
  }

  toggleTag(value: string){
    this.articleService.toggleTag(value);
  }
}

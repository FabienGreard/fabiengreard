import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'article-detail',
  template: require('../html/article-detail.template.html'),
})
export class ArticleDetailComponent implements OnInit {
  private sub: any;
  idArticle: any;
   constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.idArticle = params['id'];
        console.log(params);
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

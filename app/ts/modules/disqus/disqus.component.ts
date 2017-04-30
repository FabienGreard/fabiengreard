import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

declare var DISQUS: any;

@Component({
    selector: 'disqus',
    template: '<div id="disqus_thread"><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a></div>'
})

export class DisqusComponent implements OnChanges {
    @Input('page-identifier') pageIdentifier: string;
    @Input('page-url') pageUrl: string;
    @Input('page-title') pageTitle: string;

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        const pageIdentifier = (changes['pageIdentifier'] && changes['pageIdentifier'].currentValue) ? changes['pageIdentifier'].currentValue : this.pageIdentifier;
        //const pageUrl = (changes['pageUrl'] && changes['pageUrl'].currentValue) ? changes['pageUrl'].currentValue : this.pageUrl;
        //const pageTitle = (changes['pageTitle'] && changes['pageTitle'].currentValue) ? changes['pageTitle'].currentValue : this.pageTitle;


            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = pageIdentifier;
                    //this.page.url = pageUrl;
                    //this.page.title = pageTitle;
                    this.language = 'en';
                }
            });

    }
}

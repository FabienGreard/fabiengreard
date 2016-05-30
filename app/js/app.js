var App = function(){

};

App.prototype.init = function(){

    // Init website with loader
    this.loader();
};

App.prototype.loader = function() {

    var loaderElem = $('section#loader');
    var loaderElemInner = $('section#loader > div');

    loaderElemInner.addClass('active');

    // Animate
    var tl = new TimelineMax();
    tl.to(loaderElem, 0.2, {
        scale: 1.3,
        opacity: 0,
        delay: 2.5,
        ease: Power2.easeInOut,
        onComplete: function(){
            loaderElem.css('z-index','-1');
            // Init frontpage
            //this.frontpage();
        }
    });
};

App.prototype.frontpage = function(){

};

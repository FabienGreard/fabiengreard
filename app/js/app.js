var App = function(){

};

App.prototype.init = function(){

    // Init website with loader
    this.loader();

    this.frontpage();
};

App.prototype.loader = function() {

  var loader = $('#loader');
  var mask = $('.h1-mask');
  var h1 = $('.h1');
  var background = $('.background');
  var html = $('html');
  var frontpage = $('#frontpage');

  mask.addClass('active');
  h1.addClass('active');

  var tl = new TimelineMax();
      tl.to(loader, 1, {
          opacity: 1,
          delay: 2.5,
          onComplete: function(){
          background.addClass("active");
          }
      });

  tl.to(loader, 1, {
    onComplete: function(){
    loader.css('display','none');
    html.css('background-color', '#f29c1f');
    frontpage.css('display', 'block');
    }
  }, "-=0.35");

};

App.prototype.frontpage = function(){

  var contener = $('.arrow-contener');
  var arrow = $('.arrow');

    var tl = new TimelineMax();
        tl.to(arrow, 0.6, {
            y: 3,
            repeat: -1,
  		      repeatDelay: 0,
            yoyo: true,
            ease: Power0.easeNone
        });

};

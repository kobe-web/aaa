/*
  Brave Front-end Framework
  https://github.com/brave/brave-website
*/

var Brave = Brave || window.Brave || { app: {} };

/*
  About View
*/

(function() {

  Brave.app.publishers = new Brave.View({

    name: 'publishers',

    events: [
      [window, 'scroll', 'handleScroll'],
      [window, 'resize', 'resizeTeamImages'],
      ['.arrow', 'click', 'handleArrowClick']
    ],

    properties: {

      hasPhotographicHeader: true,

      carousel: {
        index: 1,
        length: 4,
        interval: 0,   /* 1000 minimum interval for auto-pagination; 0 disables auto-pagination */
        duration: 500,
        timeout: 1000
      },

      bootstrap: {
        offsetHeight: 116
      }

    },

    resizeTeamImages: function(event) {
      return $('.team-img').height($('.team-img').width());
    },

    tick: function() {
      var index = this.properties.carousel.index++;
      $('#press-carousel').children().each(this.makeSlideInactive.bind(this));
      this.makeSlideActive(index, $('#press-carousel')[0].children[index]);
      if(index === (this.properties.carousel.length - 1)) {
        this.properties.carousel.index = 0;
      }
      return this.state.timeout;
    },

    handleArrowClick: function(event) {
      this.cooldown('.arrow', this.properties.carousel.timeout);
      this.stopCarousel();
      this.tick();
      if(this.properties.carousel.interval > 0) {
        setTimeout(this.startCarousel.bind(this), this.properties.carousel.duration);
      }
    },

    handleScroll: function(event) {
      if(this.isNearPageTop()) {
        this.unCollapseHeader();
        if(this.properties.hasPhotographicHeader) {
          requestAnimationFrame(this.invertHeader.bind(this));
        }
      }
      else {
        this.collapseHeader();
        if(this.properties.hasPhotographicHeader) {
          requestAnimationFrame(this.unInvertHeader.bind(this));
        }
      }
    },

    init: function() {
      if(this.properties.carousel.interval > 0) {
        this.startCarousel();
      }
      this.resizeTeamImages();
      return this.handleScroll();
    }

  });

}());

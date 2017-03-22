/*
  Brave Front-end Framework
  https://github.com/brave/brave-website
*/

var Brave = Brave || window.Brave || { app: {} };

/*
  Interior Page View
*/

(function() {

  Brave.app.interior = new Brave.View({

    name: 'interior',

    events: [
      [window, 'scroll', 'handleScroll'],
      ['.navbar-fixed-top ul.navbar-nav li', 'click', 'handleMenuItemClick']
    ],

    properties: {

      hasPhotographicHeader: false,

      bootstrap: {

        offsetHeight: 116,

        carousel: { interval: 15000 },

        tooltips: [
          { selector: '.tooltips', className: '' },
          { selector: '.tooltips-show', className: 'show' },
          { selector: '.tooltips-hide', className: 'hide' },
          { selector: '.tooltips-toggle', className: 'toggle' },
          { selector: '.tooltips-destroy', className: 'destroy' }
        ],

        popovers: [
          { selector: '.popovers', className: '' },
          { selector: '.popovers-show', className: 'show' },
          { selector: '.popovers-hide', className: 'hide' },
          { selector: '.popovers-toggle', className: 'toggle' },
          { selector: '.popovers-destroy', className: 'destroy' }
        ]

      }

    },

    handleScroll: function(event) {
      if(this.isNearPageTop()) {
        this.unCollapseHeader();
        if(this.properties.hasPhotographicHeader) {
          requestAnimationFrame(this.invertHeader.bind(this));
        }
        else {
          requestAnimationFrame(this.unInvertHeader.bind(this));
        }
      }
      else {
        this.collapseHeader();
        if(this.properties.hasPhotographicHeader) {
          requestAnimationFrame(this.unInvertHeader.bind(this));
        }
      }
    },

    handleMenuItemClick: function(event) {
      if(this.isMenuShown()) {
        return $('button.navbar-toggle').click();
      }
    },

    initBootstrapUI: function() {
      if(this.properties.bootstrap.carousel.interval > 0) {
        jQuery('.carousel').carousel({
          interval: this.properties.bootstrap.carousel.interval,
          pause: 'hover'
        });
      }
      this.properties.bootstrap.tooltips.forEach(function(t, i) {
        jQuery(t.selector).tooltip(t.className.length > 1 ? t.className : null);
      });
      this.properties.bootstrap.popovers.forEach(function(p, i) {
        jQuery(p.selector).popover(p.className.length > 1 ? p.className : null);
      });
    },

    init: function() {
      if(this.isNearPageTop()) {
        this.unCollapseHeader();
      }
      else {
        this.collapseHeader();
      }
      this.initBootstrapUI();
      return $('body').scrollspy({ offset: this.properties.bootstrap.offsetHeight + 1 });
    }

  });

}());

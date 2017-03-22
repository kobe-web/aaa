/*
  Brave Front-end Framework
  https://github.com/brave/brave-website
*/

var Brave = Brave || window.Brave || { app: {} };

/*
  A reusable framework View
*/

(function() {

  Brave.View = function(params) {

    function View() {

      // All new instances should define a name, events hash, state, and properties
      // `state` refers to mutable params
      // `properties` refers to immutable params (not enforced)
      this.name = '';
      this.events = [];
      this.state = {};
      this.properties = {};

      // Shared View Utilities
      this.cooldown = function(element, duration) {
        this.events.forEach(function(e, i) {
          if((e[0] + '') === element) {
            $(e[0]).off(e[1]);
            setTimeout(function() {
              $(e[0]).on(e[1], this[e[2]].bind(this));
            }.bind(this), duration);
          }
        }, this);
      };

      this.startCarousel = function() {
        if(!this.properties || !this.properties.carousel) {
          return false;
        }
        this.state.interval = setInterval(this.tick.bind(this), this.properties.carousel.interval);
        return this.state.interval;
      };

      this.stopCarousel = function() {
        return !this.properties && !this.properties.carousel ? false : clearInterval(this.state.interval);
      };

      this.makeSlideInactive = function(index, element) {
        return !this.properties && !this.properties.carousel ? false : $(element).removeClass('inactive').removeClass('active').css({ display: 'none' });
      };

      this.makeSlideActive = function(index, element) {
        if(!this.properties || !this.properties.carousel) {
          return false;
        }
        $(element).css({ display: 'block' });
        this.state.timeout = setTimeout(function() { $(element).addClass('active'); }, this.properties.carousel.duration);
        return element;
      };

      this.isMenuShown = function() {
        return !!$('#fullsize-menu')[0] && $('#fullsize-menu').hasClass('in');
      };

      this.isOverlayShown = function() {
        return $('#brave-overlay').hasClass('show');
      };

      this.isTargetElement = function(event, selector) {
        return ((event.target.id === selector) || (event.target.className === selector) || (event.target.parentElement && event.target.parentElement.className && event.target.parentElement.className === selector));
      };

      this.isHomePage = function() {
        return (window.location.pathname.match('index.html') || window.location.pathname === '/');
      };

      this.isPlatform = function(userAgent) {
        return (window.navigator.userAgent.match && window.navigator.userAgent.match(userAgent));
      };

      this.collapseHeader = function() {
        return $('.navbar-fixed-top').addClass('top-nav-collapse');
      };

      this.unCollapseHeader = function() {
        return $('.navbar-fixed-top').removeClass('top-nav-collapse');
      };

      this.hideOverlay = function() {
        $('body').removeClass('no-scroll');
        $('#brave-overlay').removeClass('show');
        setTimeout(function() {
          $('#brave-overlay').css('display', 'none');
        }, 500);
      };

      this.showOverlay = function() {
        $('#brave-overlay').css('display', 'block');
        setTimeout(function() {
          $('body').addClass('no-scroll');
          $('#brave-overlay').addClass('show');
        }, 100);
      };

      this.isNearPageTop = function() {
        return ($(window).scrollTop() < this.properties.bootstrap.offsetHeight);
      };

      this.unInvertHeader = function() {
        $('#brave-logo').removeClass('invert');
        $('.navbar-nav.brave-nav, .navbar-toggle').removeClass('home');
      };

      this.invertHeader = function() {
        $('#brave-logo').addClass('invert');
        $('.navbar-nav.brave-nav, .navbar-toggle').addClass('home');
      };

      this.bindEvents = function() {
        this.events.forEach(function(e, i) {
          $(e[0]).on(e[1], this[e[2]].bind(this));
        }, this);
      };

      this.absorb = function(obj) {
        for(var key in obj) {
          this[key] = obj[key];
        }
      };

      this.off = function() {
        this.isOn = false;
        this.events.forEach(function(e, i) {
          $(e[0]).off(e[1]);
        }, this);
      };

      this.on = function() {
        this.isOn = true;
        this.bindEvents();
        return this.init();
      };

      // Absorb custom params, default to 'off' state
      this.absorb(params);
      this.isOn = false;

    }
    return new View;
  };

}());
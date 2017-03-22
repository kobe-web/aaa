/*
  Brave Front-end Framework
  https://github.com/brave/brave-website
*/

var Brave = Brave || window.Brave || { app: {} };

/*
  Home View
*/

(function() {

  Brave.app.home = new Brave.View({

    name: 'home',

    events: [
      [window, 'scroll', 'handleScroll'],
      ['#brave-download', 'click', 'handleDownloadButtonClick'],
      ['.navbar-fixed-top ul.navbar-nav li', 'click', 'handleMenuItemClick'],
      ['#devs .btn', 'click', 'handleDevButtonClick']
    ],

    state: {
      downloadURL: 'https://github.com/brave/browser-laptop/releases'
    },

    properties: {

      hasPhotographicHeader: true,

      platforms: [
        { name: 'Linux x64, Ubuntu', userAgent: 'Linux|Ubuntu', url: 'https://github.com/brave/browser-laptop/blob/master/docs/linuxInstall.md' },
        { name: 'macOS 10.9', userAgent: 'Macintosh', url: 'https://laptop-updates.brave.com/latest/osx' },
        { name: 'Windows 7', userAgent: 'Windows', url: 'https://laptop-updates.brave.com/latest/winia32' },
        { name: 'Windows 7 x64', userAgent: 'WOW64|Win64', url: 'https://laptop-updates.brave.com/latest/winx64' },
        { name: 'iOS 8', userAgent: 'iPhone|iPod|iPad', url: 'https://itunes.apple.com/us/app/brave-web-browser/id1052879175' },
        { name: 'Android 4.1', userAgent: 'Android', url: 'https://play.google.com/store/apps/details?id=com.brave.browser&hl=en' }
      ],

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

    toggleVideoButton: function() {
      if(this.isOverlayShown()) {
        return this.hideOverlay();
      }
      return this.showOverlay();
    },

    handleVideoButton: function(event) {
      if(this.isTargetElement(event, 'brave-overlay') || this.isTargetElement(event, 'brave-video') || this.isTargetElement(event, 'close')) {
        return this.toggleVideoButton();
      }
      return false;
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

    handleDevButtonClick: function(event) {
      window.location.href = event.target.dataset ? event.target.dataset.href : event.target.href;
    },

    handleMenuItemClick: function(event) {
      if(this.isMenuShown()) {
        return $('button.navbar-toggle').click();
      }
    },

    handleDownloadButtonClick: function(event) {
      window.location.href = this.state.downloadURL;
    },

    configureDownloadButton: function(platform, index) {
      if(this.isPlatform(platform.userAgent)) {
        $('.control-group').find('.label').not('a').html('For ' + platform.name + ' or later.');
        this.state.downloadURL = platform.url;
      }
    },

    reactToUserAgent: function(platforms) {
      var buttons = $('.brave-hero').find('.btn').remove();
      platforms.forEach(this.configureDownloadButton.bind(this), buttons);
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

    initCounter: function() {
      jQuery('.counter').counterUp({
        delay: 10,
        time: 1000
      });
    },

    init: function() {
      if(!this.isHomePage()) {
        this.properties.hasPhotographicHeader = false;
      }
      if(this.properties.hasPhotographicHeader && this.isNearPageTop()) {
        this.invertHeader();
      }
      else {
        this.unInvertHeader();
      }
      this.initBootstrapUI();
      this.reactToUserAgent(this.properties.platforms);
      return $('body').scrollspy({ offset: this.properties.bootstrap.offsetHeight + 1 });
    }

  });

}());

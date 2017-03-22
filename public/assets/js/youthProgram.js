/*
  Brave Front-end Framework
  https://github.com/brave/brave-website
*/

var Brave = Brave || window.Brave || { app: {} };

/*
  Youth Program View
*/

(function() {

  Brave.app.youthProgram = new Brave.View({

    name: 'youth-program',

    events: [
      [window, 'scroll', 'handleScroll'],
      ['.pager > li', 'click', 'handlePagerClick'],
      ['#brave-ambassador', 'click', 'showOverlay'],
      ['#brave-overlay, #ambassador-form > .close', 'click', 'handleClose'],
      ['#ambassador-submit', 'click', 'handleAmbassadorSubmit']
    ],

    properties: {

      hasPhotographicHeader: true,

      carousel: {
        index: 1,
        length: 5,
        interval: 5000,
        duration: 500,
        timeout: 2000
      },

      bootstrap: {
        offsetHeight: 116
      }

    },

    tick: function() {
      var index = this.properties.carousel.index++;
      $('#gallery-carousel').children().each(this.makeSlideInactive.bind(this));
      $('.pager > li').removeClass('active');
      setTimeout(function() { $('.pager > li').eq(index).addClass('active'); }, 1);
      this.makeSlideActive(index, $('#gallery-carousel')[0].children[index]);
      if(index === (this.properties.carousel.length - 1)) {
        this.properties.carousel.index = 0;
      }
      return this.state.timeout;
    },

    handleAmbassadorSubmit: function(event) {
      _paq.push(['trackEvent', 'FormSubmissions', 'Submitted', 'YouthProgramSignUp'])
      var formData = $('#ambassador-form').serializeObject()
      if (!formData.email || !formData.name || !formData.city || !formData.country || !formData.reason) {
        $("#ambassador-form-status").text("All fields are required. Please try again.")
        return false
      }
      formData.call = 'youth_program'
      formData.crumb = getCookieValue('crumb')
      if (!formData.crumb) {
        let newcookie = Math.random().toString()
        document.cookie = "crumb=" + newcookie + "; max-age=3600"
        formData.crumb = newcookie
      }
      $("#ambassador-submit").text('Sending...')
      $.ajax({
        url: '/api/mailchimp',
        type: 'POST',
        xhrFields: {
          withCredentials: true
        },
        dataType: 'json',
        data: formData,
        error: function(err) {
          $("#ambassador-form-status").text("An error occurred.")
          _paq.push(['trackEvent', 'FormSubmissions', 'Error', 'FooterNewsletterSignUp'])
        },
        success: function(data) {
          if (data.euid) {
            $("#ambassador-form img, #ambassador-form input, #ambassador-form textarea, #ambassador-submit").hide()
            $("#ambassador-form-status").text("Thank you for signing up!")
            _paq.push(['trackEvent', 'FormSubmissions', 'Success', 'YouthProgramSignUp'])
          } else {
            alert(data)
            _paq.push(['trackEvent', 'FormSubmissions', 'Failed', 'YouthProgramSignUp'])
          }
        }
      });
    },

    handleClose: function(event) {
      if((event.target.id === 'ambassador-form' || (event.target.className !== 'close' && event.target.parentElement.id === 'ambassador-form'))) {
        return false;
      }
      return this.hideOverlay();
    },

    handlePagerClick: function(event) {
      this.cooldown('.pager > li', this.properties.carousel.timeout);
      return false;
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
      return this.handleScroll();
    }

  });

}());

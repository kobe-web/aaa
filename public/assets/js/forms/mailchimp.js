//TODO: add timeout handler and ui notification

var crumbTries = 0;

/* Build Requests Form */
$("#formRequestBuildSubmit").on('click', function() {
  _paq.push(['trackEvent', 'FormSubmissions', 'Submitted', 'SliderDevBuildSignUp'])
  var formData = $('#formRequestBuild').serializeObject()
  if(formData.MERGE0 && formData.MERGE0 != '') {
    if(!validateEmail(formData.MERGE0))
    {
      alert('Please check Email format.')
      return false
    }
    $("#formRequestBuildSubmit").text('Sending...')
    formData.call = 'getbrave'
    formData.crumb = getCookieValue('crumb')
    recursiveCrumbSubmitBuildRequest(formData, function(data, err) {
      if(err) console.log(err)
      if(data.euid)
      {
        $("#formRequestBuild").html($('#formRequestBuildThankYou').html())
        _paq.push(['trackEvent', 'FormSubmissions', 'Success', 'SliderDevBuildSignUp'])
      }
      else
      {
        $("#formRequestBuild").html(data)
        _paq.push(['trackEvent', 'FormSubmissions', 'Failed', 'SliderDevBuildSignUp'])
      }
    })
  }
 })
function submitBuildRequest(formData, callback) {
  $.ajax({
     url: '/api/mailchimp',
     type: 'POST',
     xhrFields: {
        withCredentials: true
     },
     dataType: 'json',
     data: formData,
     error: function(err) {
        $("#formRequestBuild").html('<h2>'+err.responseText+'</h2>')
        _paq.push(['trackEvent', 'FormSubmissions', 'Error', 'SliderDevBuildSignUp'])
     },
     success: function(data) {
        callback(data)
     }
  })
 }
function recursiveCrumbSubmitBuildRequest(formData, callback) {
  if(formData.crumb) {
    submitBuildRequest(formData, callback)
  }
  else
  {
    getCrumbFromApi(formData, function(data, err) {
      crumbTries++
      if(err) console.log(err)
      if (data)
      {
        if (data.crumb)
          submitBuildRequest(data, callback)
        return false
      }
      if(crumbTries < 3) {
        recursiveCrumbSubmitBuildRequest(formData, callback)
      }
      else {
        var newcookie = Math.random().toString()
        document.cookie = "crumb=" + newcookie + "; max-age=3600"
        formData.crumb = newcookie
        submitBuildRequest(formData, callback)
      }

    })
  }
 }

/* Newsletter Subscription Form */
$("#formNewsletterSubscriptionSubmit").on('click', function() {
  _paq.push(['trackEvent', 'FormSubmissions', 'Submitted', 'FooterNewsletterSignUp'])
  var formData = $('#formNewsletterSubscription').serializeObject()
  if(formData.newsletteremail && formData.newsletteremail != '') {
    if(!validateEmail(formData.newsletteremail))
    {
      alert('Please check Email format.')
      return false
    }
    formData.call = 'newsletter'
    formData.crumb = getCookieValue('crumb')
    if (!formData.crumb) {
      let newcookie = Math.random().toString()
      document.cookie = "crumb=" + newcookie + "; max-age=3600"
      formData.crumb = newcookie
    }
    $("#formNewsletterSubscriptionSubmit").text('Sending...')
    $.ajax({
       url: '/api/mailchimp',
       type: 'POST',
       xhrFields: {
          withCredentials: true
       },
       dataType: 'json',
       data: formData,
       error: function(err) {
          alert(err.responseText)
          _paq.push(['trackEvent', 'FormSubmissions', 'Error', 'FooterNewsletterSignUp'])
       },
       success: function(data) {
          if(data.euid)
          {
            $("#mailchimpNewsletterConfirmationModal").modal('show')
            $("#formNewsletterSubscriptionSubmit").text('Subscribed!')
            $("#formNewsletterSubscriptionSubmit").attr('disabled',true)
            $("#newsletteremail").attr('disabled',true)
            _paq.push(['trackEvent', 'FormSubmissions', 'Success', 'FooterNewsletterSignUp'])
          }
          else
          {
            alert(data)
            _paq.push(['trackEvent', 'FormSubmissions', 'Failed', 'FooterNewsletterSignUp'])
          }
       }
    });
  }
 })

/* helpers */
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
 }
$.fn.serializeObject = function() {
  var o = {}
  var a = this.serializeArray()
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]]
          }
          o[this.name].push(this.value || '')
      } else {
          o[this.name] = this.value || ''
      }
  })
  return o
 }
function getCookieValue(cname, cookie) {
  var name = cname + "=";
  if(!cookie) cookie = document.cookie
  var ca = cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
 }
function getCrumbFromApi(formData, callback) {
  $.ajax({
   url: '/api/crumb',
   type: 'GET',
   xhrFields: {
      withCredentials: true
   },
   dataType: 'json',
   data: {"crumb":Math.random().toString()},
   error: function(err) {
      callback(null, err.responseText)
   },
   success: function(data) {
      if(data)
      {
        var c = getCookieValue('crumb',data.cookie)
        formData.crumb = c;
        callback(formData)
      }
      else
      {
        callback()
      }
   }
  })
 }

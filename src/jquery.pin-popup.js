(function($){
  $.fn.extend({ 
    //pass the options variable to the function
    lettrsPopup: function(options) {
      //Set the default values, use comma to separate the settings, example:
      var defaults = {
        overlay_css: {
          'bottom':     0,
          'left':       0,
          'overflow-x': 'auto',
          'overflow-y': 'scroll',
          'position':   'fixed',
          'right':      0,
          'top':        0,
          'z-index':    10000,
          'background-color': 'rgba(255, 255, 255, 0.93)'
        },
        box_css: {
          'margin':       '20px auto',
          'position':     'static',
          'font-size':    '13px',
          'padding':      '20px 30px 0',
          'top':          '110px !important',
          'width':        '1100px',
          'z-index':      2
        },
        fade_in_duration: 2000
      }

      var options =  $.extend(true, defaults, options);

      var _structure = function(){
        if ($('body #popup_overlay').length <= 0){
          $('body').append('<div id="popup_overlay"><div class="popup_box"/></div>');
        }
      }

      return this.each(function() {
        var obj = $(this); 

        obj.click(function(e){
          e.preventDefault();
          var href = obj.attr('href');
          _structure();
          $.get(href, function(html){
            $('.popup_box').html(html);
          }).success(function(){
            $('html, body').addClass('noscroll');
            $('#popup_overlay').css(options.overlay_css);
            $('.popup_box').hide().css(options.box_css).fadeIn(options.fade_in_duration);
          })
        })
      });
    }
  });
  
  $.fn.extend({ 
    lettrsPopupClose: function(options){
      var defaults = {
        fade_out_duration: 500
      }
      var options =  $.extend(true, defaults, options);
      $("#popup_overlay .popup_box").fadeOut(options.fade_out_duration, function(){
         $("#popup_overlay").remove();
      });
    }
  });
})(jQuery);
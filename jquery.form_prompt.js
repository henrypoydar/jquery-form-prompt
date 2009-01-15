/*
 * jQuery Form Input Prompt Plugin 0.1.0
 *
 * Seemingly populate form inputs with text that disappears when the field is focussed.
 * Works by not actually modifying the form field at all, instead an overlay div with
 * the prompt text is added to the DOM. This approach works better with AJAX-submitted forms.
 *
 * This script will become unnecessary once target browsers support HTML 5 and the 
 * placeholder attribute for form fields
 *
 * Usage
 *
 *  $('input#first_name').form_prompt('Don');
 *  $('input#email').form_prompt(function() {
 *    return $(this).attr('alt');
 *  });
 *  $('textarea#description').form_prompt('Type your message here', {
 *    className: 'form-prompt-class'
 *  });
 *
 * Copyright (c) Henry Poydar (henry@poydar.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */
 
(function($) {

  $.fn.form_prompt = function(text, options) {
    
    var prompt_text = '';
    
    // If text is passed as a callback, evaluate it
    if ($.isFunction(text)) { 
      prompt_text = text.call(this);
    } else {
      prompt_text = text;
    }
    
    // Evaluate options
    var className = options.className || 'form-prompt-text';
    var wrapperClassName = options.wrapperClassName || 'form-prompt-wrapper';
    
    return this.each(function() {
    
      // This may need adjustment for MSIE ...
      $(this).wrap("<div class='" 
        + wrapperClassName 
        + "' style='position:relative;overflow:hidden;display:inline-block;'></div>");
      
      $(this).after("<div class='" + className + "'>" + prompt_text + "</div>");
      
      var wrapper = $(this).parent('.' + wrapperClassName);
      var prompt = wrapper.find('.' + className);
     
      prompt.css("position", "absolute");
      prompt.css("top", "0");
      prompt.css("left", "0");
      prompt.css("z-index", "1000");
      
      $(this).click(function() {
        prompt.hide();
      });

      prompt.click(function() {
        prompt.hide();
        $(this).focus().select();
      });

      $(this).blur(function() {
        if ($(this).val() == '') { prompt.show(); }
      });
      
    });
  };

})(jQuery);
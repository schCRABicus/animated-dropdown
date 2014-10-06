/*
 * animatedDropdown
 * https://github.com/schcrabicus/animated-dropdown
 *
 * Copyright (c) 2014 schCRABicus
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.animatedDropdown = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.animatedDropdown = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.animatedDropdown.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.animatedDropdown.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].animatedDropdown = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));

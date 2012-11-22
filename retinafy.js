(function() {
  var hasRetinafyableSrc, isAlreadyRetinafied, isRetinaDisplay, retinaImageSrc, swapToRetinaImg;

  isRetinaDisplay = function() {
    var mediaQuery;
    mediaQuery = ['(-webkit-min-device-pixel-ratio: 1.5)', '(min--moz-device-pixel-ratio: 1.5)', '(-o-min-device-pixel-ratio: 3/2)', '(min-resolution: 1.5dppx)'].join(',');
    return window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(mediaQuery).matches);
  };

  hasRetinafyableSrc = function($element) {
    return $element.attr('src') || /url\(/.test($element.css('background-image'));
  };

  isAlreadyRetinafied = function($element, settings) {
    var imageSrc;
    imageSrc = $element.attr('src') || $element.css('background-url');
    return new RegExp("(.+)(" + settings.retina_suffix + "\\.\\w{3,4})").test(imageSrc);
  };

  retinaImageSrc = function($element, settings) {
    var imageSrc, rawBackground;
    if ($element.attr('src')) {
      imageSrc = $element.attr("src");
    } else {
      rawBackground = $element.css("background-image").replace(/(.+)(\.\w{3,4})$/, "$1" + settings.retina_suffix + "$2");
      imageSrc = rawBackground.substring(4, rawBackground.length - 1).replace(/"/g, '');
    }
    return imageSrc.replace(/(.+)(\.\w{3,4})/, "$1" + settings.retina_suffix + "$2");
  };

  swapToRetinaImg = function($element, settings) {
    if ($element.attr('src')) {
      return $element.attr("src", retinaImageSrc($element, settings));
    } else {
      return $element.css("background-image", "url(" + (retinaImageSrc($element, settings)) + ")");
    }
  };

  $.fn.retinaify = function(options) {
    var settings;
    settings = $.extend({
      retina_suffix: '@2x'
    }, options);
    if (isRetinaDisplay()) {
      this.each(function() {
        var $element;
        $element = $(this);
        if (hasRetinafyableSrc($element) && !isAlreadyRetinafied($element, settings)) {
          return $('<img>').attr("src", retinaImageSrc($element, settings)).load(function() {
            return swapToRetinaImg($element, settings);
          });
        }
      });
    }
    return this;
  };

}).call(this);

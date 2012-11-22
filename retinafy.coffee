isRetinaDisplay = ->
  mediaQuery = ['(-webkit-min-device-pixel-ratio: 1.5)',
                '(min--moz-device-pixel-ratio: 1.5)',
                '(-o-min-device-pixel-ratio: 3/2)',
                '(min-resolution: 1.5dppx)'].join(',')
  window.devicePixelRatio > 1 or (window.matchMedia and window.matchMedia(mediaQuery).matches)


hasRetinafyableSrc = ($element) ->
  $element.attr('src') or /url\(/.test($element.css('background-image'))


isAlreadyRetinafied = ($element, settings) ->
  imageSrc = $element.attr('src') or $element.css('background-url')
  new RegExp("(.+)(#{settings.retina_suffix}\\.\\w{3,4})").test(imageSrc)


retinaImageSrc = ($element, settings) ->
  if $element.attr('src')
    imageSrc = $element.attr("src")
  else
    rawBackground = $element.css("background-image").replace(/(.+)(\.\w{3,4})$/, "$1#{settings.retina_suffix}$2")
    imageSrc = rawBackground.substring(4, rawBackground.length-1).replace(/"/g, '')

  imageSrc.replace(/(.+)(\.\w{3,4})/, "$1#{settings.retina_suffix}$2")


swapToRetinaImg = ($element, settings) ->
  if $element.attr('src')
    $element.attr "src", retinaImageSrc($element, settings)
  else
    $element.css "background-image", "url(#{retinaImageSrc($element, settings)})"


$.fn.retinaify = (options) ->

  # Set default retina file suffix to '@2x'
  # Eg. some_image.jpg will become some_image@2x.jpg
  settings = $.extend({
    retina_suffix: '@2x',
  }, options)

  if isRetinaDisplay()
    @each ->
      $element = $(this)
      if hasRetinafyableSrc($element) and not isAlreadyRetinafied($element, settings)
        $('<img>').attr("src", retinaImageSrc($element, settings)).load -> swapToRetinaImg($element, settings)

  this
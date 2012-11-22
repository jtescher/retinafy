# Retinafy Assets

A lightweight jQuery plugin that swaps normal assets for retina assets when on a retina display.


## Usage

1. Grab a copy of jQuery and then include retina.js.

  ```html
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>`
    <script src="/path/to/retina.js"></script>
  ```

1. Then call retinafy on all elements with a non-retina source or background-image.

  E.g. If you have the following html:
  
  ```html
    <img src='/images/img.jpg' />
  ```

  And you run the following javascript function after DOM ready.

  ```js
    $('img').retinafy()
  ```
  
    Then the script will check your server to see if the retina version exists at: `/images/img@2x.jpg`
    And if it exists, it will set the new source.
    
  ```html
    <img src='/images/img@2x.jpg' />
  ```
  
  This also works with background-image css so 
  ```html
    <div style='background-image: url(/images/img.jpg)'>
  ```
  
  Would turn into:
  ```html
    <div style='background-image: url(/images/img@2x.jpg)'>
  ```
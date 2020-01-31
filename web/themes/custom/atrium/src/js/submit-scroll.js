(function($, Drupal) {
  "use strict";

  Drupal.behaviors.submitscroll = {
    attach: function(context) {
      // Define button.
      const $submitButton = $(".jcc-choice-section input[type=submit]");

      // Send status to sessionStorage, then submit form.
      $submitButton.click(function() {
        sessionStorage.submitted = true;
        $("form.cc-user-input").submit();
      });

      // Check sessionStorage for value.
      if (sessionStorage.submitted != undefined) {
        var $newPosition = $submitButton.offset().top;

        // Scroll based so Submit button is near the top of the page.
        $("html, body").animate({ scrollTop: $newPosition }, 300);
      }
    }
  };
})(jQuery, Drupal);

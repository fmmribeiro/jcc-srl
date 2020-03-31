(function($) {
  "use strict";

  Drupal.behaviors.feedback = {
    attach: function() {

      // Elements.
      const $window = $(window);
      const $feedback_trigger = $('[data-feedback^="trigger"]');
      const $feedback_container = $('[data-feedback="container"]');
      const $feedback_dialog = $('[data-feedback="dialog"]');
      const $feedback_confirmation = $(
        '[data-feedback="container"] .webform-confirmation'
      );

      // Functions.
      const feedbackOpen = () => {
        $feedback_dialog.attr("open", "open");
        $feedback_container.attr("open", "open");
      };

      const feedbackDismiss = () => {
        $feedback_container.hide();
      };

      const feedbackDismissPath = () => {
        return sessionStorage.feedback_dismissed_page ==
          window.location.pathname;
      };

      const feedbackConfirmed = () => {
        return $feedback_confirmation.length > 0;
      };

      const isScrolledToBottom = () => {
        const scrollPosition = $window.scrollTop();
        const windowHeight = $window.height();
        const windowHeightHalf = windowHeight / 2;
        const scrollDiff = (scrollPosition + windowHeight) - windowHeightHalf ;
        const halfPageHeight = $('.jcc-footer').offset().top / 2 ;
        
        return scrollDiff >= halfPageHeight;
      };
  
      const pageIsShorterThanWindow = () => {
        const $windowHeight = $window.height();
        const $footerPosition = $('.jcc-footer').offset().top;

        return $windowHeight < $footerPosition;
      };

      const isSmallScreen = () => {
        const mql = window.matchMedia('(max-width: 40em)');
        return mql.matches ? true : false;
      };

      // Scroll.
      $window.on('scroll', function(){
        if(
          (isScrolledToBottom() && isSmallScreen())
          || isSmallScreen() == false
        ) {
          $feedback_container.attr('visible', 'visible');
        } else {
          $feedback_container.removeAttr('visible');
        }
        
        if (pageIsShorterThanWindow()) {
          $feedback_container.attr('fixed', 'fixed');
        } else {
          $feedback_container.removeAttr('fixed');
        }
      });
  
      // Allow user to dismiss completely if confirmation is visible.
      if (feedbackConfirmed() == true) {
        if (feedbackDismissPath() == true) {
          feedbackDismiss();
        } else {
          window.scrollTo(0, document.body.scrollHeight);
          $feedback_dialog.removeAttr("style");
          feedbackOpen();
        }
      }
  
      // Click.
      $feedback_trigger.on("click", function(e) {
        e.preventDefault;
        if ($feedback_dialog.attr("open")) {
          if (
            feedbackConfirmed() &&
            $(this).attr("data-feedback") == "trigger-close"
          ) {
            sessionStorage.feedback_dismissed_page = window.location.pathname;
            feedbackDismiss();
          } else {
            $feedback_container.css("transition", "all .2s");
            $feedback_dialog.removeAttr("open");
            $feedback_container.removeAttr("open");
          }
        } else {
          feedbackOpen();
        }
      });
    }
  };
})(jQuery, Drupal);

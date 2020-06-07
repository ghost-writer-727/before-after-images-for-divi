// This script is loaded both on the frontend page and in the Visual Builder.

// Internal Dependencies
import './jquery.twentytwenty.js';

jQuery(function($) {
    
    function loadBeforeAfterImages(){
        
        $( '.twentytwenty-container' ).each(function(){
            
            // Set Defaults
            var baie_offset_pct = 0.5; // How much of the before image is visible when the page loads
            var baie_orientation = 'horizontal'; // Orientation of the before and after images ('horizontal' or 'vertical')
            var baie_before_label = 'Before'; // Set a custom before label
            var baie_after_label = 'After'; // Set a custom after label
            var baie_no_overlay = false; // Do not show the overlay with before and after
            var baie_move_slider_on_hover = false; // Move slider on mouse hover?
            var baie_move_with_handle_only = true; // Allow a user to swipe anywhere on the image to control slider movement. 
            var baie_click_to_move = false; // Allow a user to click (or tap) anywhere on the image to move the slider to that location.

            // Update variables
            /**
             * Change the before/after image labels
             * Determined by options selected in module settings.
             */
            // Before Label
            var beforeImage = $( this ).find( '.baie_before_image' );
            var beforeImageLabel = beforeImage.attr( 'data-before-label' );
            if( beforeImageLabel != '' ){
                baie_before_label = beforeImageLabel;
            }

            // After Label
            var afterImage = $( this ).find( '.baie_after_image' );
            var afterImageLabel = afterImage.attr( 'data-after-label' );
            if( afterImageLabel != '' ){
                baie_after_label = afterImageLabel;
            };
                
            /**
             * Slider offset position.
             * Determined by options selected in module settings.
             */
            var sliderOfferString = beforeImage.attr( 'data-slider-offset' );
            var sliderOffset = parseInt(sliderOfferString)/100;
            if( sliderOfferString != '' ){
                baie_offset_pct = sliderOffset;
            }

            $( this ).twentytwenty({
                default_offset_pct: baie_offset_pct, 
                orientation: baie_orientation,
                before_label: baie_before_label,
                after_label: baie_after_label,
                no_overlay: baie_no_overlay,
                move_slider_on_hover: baie_move_slider_on_hover,
                move_with_handle_only: baie_move_with_handle_only,
                click_to_move: baie_click_to_move
            });

            // Modify the TwentyTwenty output
            /**
             * Max-Width
             * This value should be the width of the thinnest/shorest image.
             */
            var maxWidth = (beforeImage.offsetWidth <= afterImage.offsetWidth) ? beforeImage.offsetWidth : afterImage.offsetWidth;
            $( this ).find( '.twentytwenty-overlay' ).css( 'max-width', maxWidth  );
        });
    }
    $(window).on( 'load', function(){
        loadBeforeAfterImages();
    });
});

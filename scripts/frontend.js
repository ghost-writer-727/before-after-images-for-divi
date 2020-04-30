// This script is loaded both on the frontend page and in the Visual Builder.

// Internal Dependencies
import './jquery.twentytwenty.js';

jQuery(function($) {
    
    function loadBeforeAfterImages( target, before_label ){
        
        // Set Defaults
        var baie_offset_pct = 0.5; // How much of the before image is visible when the page loads
        var baie_orientation = 'horizontal'; // Orientation of the before and after images ('horizontal' or 'vertical')
        var baie_before_label = 'Before'; // Set a custom before label
        var baie_after_label = 'After'; // Set a custom after label
        var baie_no_overlay = false; // Do not show the overlay with before and after
        var baie_move_slider_on_hover = false; // Move slider on mouse hover?
        var baie_move_with_handle_only = true; // Allow a user to swipe anywhere on the image to control slider movement. 
        var baie_click_to_move = false; // Allow a user to click (or tap) anywhere on the image to move the slider to that location.

       

            /*var beforeImage = $( this ).children( '.twentytwenty-before' );
            var beforeImageLabel = beforeImage.attr( 'data-before-label' );
            console.log( 'baie_before_label is ' + baie_before_label );
            if( beforeImageLabel != '' ){
                baie_before_label = beforeImageLabel;
            }*/
            console.log( 'baie_before_label is ' + baie_before_label );

            baie_before_label = before_label;
            console.log( 'baie_before_label is ' + baie_before_label );
            // Update variables
            /**
             * Change the before/after image labels
             * Determined by options selected in module settings.
             *
            // Before Label
            var beforeImage = $( this ).find( '.twentytwenty-before' );
            var beforeImageLabel = beforeImage.attr( 'data-before-label' );
            if( beforeImageLabel != '' ){
                baie_before_label = beforeImageLabel;
            }

            // After Label
            var afterImage = $( this ).find( '.twentytwenty-after' );
            var afterImageLabel = afterImage.attr( 'data-after-label' );
            if( afterImageLabel != '' ){
                baie_after_label = beforeImageLabel;
            };
                
            /**
             * Get the before + after image slider offset position.
             * Determined by options selected in module settings.
             *
            var sliderOfferString = beforeImage.attr( 'data-slider-offset' );
            var sliderOffset = parseInt(sliderOfferString)/100;
            if( sliderOfferString != '' ){
                baie_offset_pct = sliderOffset;
            }*/

            $( target ).twentytwenty({
                default_offset_pct: baie_offset_pct, 
                orientation: baie_orientation,
                before_label: baie_before_label,
                after_label: baie_after_label,
                no_overlay: baie_no_overlay,
                move_slider_on_hover: baie_move_slider_on_hover,
                move_with_handle_only: baie_move_with_handle_only,
                click_to_move: baie_click_to_move
            });
    }
    
    /*
    // Load images when the window loads
    $(window).on( 'load', function(){
        if($("body").hasClass("et-fb")){
            // Abort if the user is in the Divi Builder
            return
        } else{
            loadBeforeAfterImages();
        }
    });
    // Load images in Visual Builder
    if($("body").hasClass("et-fb")){
        loadBeforeAfterImages();
    }
    */
    
    // Lazy Load helpers
    /*
    // Load images after lazy loading function runs
    $('.baie_before_after_image img[data-lazy-src]').on( 'load', function(){
        if($("body").hasClass("et-fb")){
            // Abort if the user is in the Divi Builder
            return
        } else{
            loadImages();
        }
    });
    $('.baie_before_after_image img[data-lazy-type]').on( 'load', function(){
        if($("body").hasClass("et-fb")){
            // Abort if the user is in the Divi Builder
            return
        } else{
            loadImages();
        }
    });
    $('.baie_before_after_image img.lazy-loaded').on( 'load', function(){
        if($("body").hasClass("et-fb")){
            // Abort if the user is in the Divi Builder
            return
        } else{
            loadImages();
        }
    });
    */
});

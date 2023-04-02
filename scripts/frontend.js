// This script is loaded both on the frontend page and in the Visual Builder.

// Internal Dependencies
import './jquery.twentytwenty.js';

jQuery( function( $ ){
    
    // Define the function to initialize the TwentyTwenty script by Zurb with options.
    function loadBeforeAfterImages(){
        
        // Loop over every element with the "twentytwenty-container" class.
        $( '.twentytwenty-container' ).each( function(){
            
            // Define variables with default values.
            var baie_offset_pct = 0.5; // How much of the before image is visible when the page loads.
            var baie_orientation = 'horizontal'; // Orientation of the before and after images ('horizontal' or 'vertical').
            var baie_before_label = 'Before'; // Set a custom before label.
            var baie_after_label = 'After'; // Set a custom after label.
            var baie_no_overlay = false; // Do not show the overlay with before and after.
            var baie_move_slider_on_hover = false; // Move slider on mouse hover?
            var baie_move_with_handle_only = true; // Allow a user to swipe anywhere on the image to control slider movement.
            var baie_click_to_move = false; // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
            var beforeImage = $( this ).find( '.baie_before_image' );
            var beforeImageLabel = beforeImage.attr( 'data-before-label' ); // Determined by options selected in module settings.
            var afterImage = $( this ).find( '.baie_after_image' );
            var afterImageLabel = afterImage.attr( 'data-after-label' ); // Determined by options selected in module settings.
            var sliderOffsetString = beforeImage.attr( 'data-slider-offset' ); // Determined by options selected in module settings.
            var sliderOffset = parseInt( sliderOffsetString )/100;

            // Overwrite "Before" label default if the user set the label in the module settings.
            baie_before_label = ( beforeImageLabel == '' ? baie_before_label : beforeImageLabel );

            // Overwrite "After" label default if the user set the label in the module settings.
            baie_after_label = ( baie_after_label != '' ? baie_after_label : afterImageLabel );

            // Overwrite slider offset default value if the user set an offset in the module settings.
            baie_offset_pct = ( sliderOffsetString == '' ? baie_offset_pct : sliderOffset );

            // Initialize the TwentyTwenty script by Zurb with options.
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
            
            // Get the width of the thinnest or shorest image.
            var maxWidth = ( beforeImage[0].offsetWidth <= afterImage[0].offsetWidth ) ? beforeImage[0].offsetWidth : afterImage[0].offsetWidth;

            // Apply a max-width style to all before-and-after elements within the .twentytwenty-container element.
            $( this ).find( '.twentytwenty-overlay' ).css( 'max-width', maxWidth  );
        });
    }

    // When the whole page has loaded...
    $( window ).on( 'load', function(){

        // Load the before-and-after images.
        loadBeforeAfterImages();
    });
});

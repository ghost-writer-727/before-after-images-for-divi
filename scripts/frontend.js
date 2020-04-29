// This script is loaded both on the frontend page and in the Visual Builder.

// Internal Dependencies
import './jquery.twentytwenty.js';

jQuery(function($) {
    
    function loadBeforeAfterImages(){
        
        $( '.twentytwenty-container' ).twentytwenty();
        $( '.twentytwenty-wrapper' ).each( function( index ){

            /**
             * Get the before + after image dimensions
             * Determined by options selected in module settings.
             */
            // Before Image
            var beforeImage = $( this ).find( '.twentytwenty-before' );
            var beforeImageWidth = beforeImage.width();
            var beforeImageHeight = beforeImage.height();

            // After Image
            var afterImage = $( this ).find( '.twentytwenty-after' );
            var afterImageWidth = afterImage.width();
            var afterImageHeight = afterImage.height();

            /**
             * Set the max width and max height of the before + after image slider.
             */
            var maxWidth = ( beforeImageWidth < afterImageWidth ) ? beforeImageWidth :  afterImageWidth;
            var maxHeight = ( beforeImageHeight  > afterImageHeight ) ? beforeImageHeight  :  afterImageHeight;
            
            /**
             * Get the before + after image slider offset position.
             * Determined by options selected in module settings.
             */
            var sliderOfferString = beforeImage.attr( 'data-slider-offset' );
            var sliderOffset = parseInt(sliderOfferString)/100;
            
            /**
             * Combine selected width and height with slider offset to clip images appropriately.
             */
            beforeImage.css( 'clip', 'rect(0px, ' + ( maxWidth * sliderOffset ) + 'px, ' + maxHeight + 'px, 0px)' );
            afterImage.css( 'clip', 'rect(0px, ' + maxWidth + 'px, ' + maxHeight + 'px, ' + ( maxWidth * sliderOffset ) + 'px)' );
            $( this ).find( '.baie_before_after_image .twentytwenty-overlay' ).css( 'maxWidth', maxWidth );
            $( this ).find( '.baie_before_after_image .twentytwenty-handle' ).css( 'left', maxWidth * sliderOffset );

            /**
             * Change the before/after image labels
             * Determined by options selected in module settings.
             */
            // Before
            var beforeImageLabel = beforeImage.attr( 'data-before-label' );
            if( beforeImageLabel != '' ){
                $( this ).find( '.baie_before_after_image .twentytwenty-before-label' ).attr( 'data-content', beforeImageLabel );
            }

            // After
            var afterImageLabel = afterImage.attr( 'data-after-label' );
            if( afterImageLabel != '' ){
                $( this ).find( '.baie_before_after_image .twentytwenty-after-label' ).attr( 'data-content', afterImageLabel )
            };
        });
    }
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

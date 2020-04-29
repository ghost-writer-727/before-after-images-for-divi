// This script is loaded both on the frontend page and in the Visual Builder.

// Internal Dependencies
import './jquery.twentytwenty.js';

jQuery(function($) {
    
    function loadBeforeAfterImages(){
        $( '.twentytwenty-container' ).twentytwenty();
        $( '.twentytwenty-wrapper' ).each( function( index ){

            var beforeImage = $( this ).find( '.twentytwenty-before' );
            var sliderOfferString = beforeImage.attr( 'data-slider-offset' );
            var sliderOffset = parseInt(sliderOfferString)/100;
            
            var beforeImageLabel = beforeImage.attr( 'data-before-label' );
            var beforeImageWidth = beforeImage.width();
            var beforeImageHeight = beforeImage.height();

            var afterImage = $( this ).find( '.twentytwenty-after' );
            var afterImageLabel = afterImage.attr( 'data-after-label' );
            var afterImageWidth = afterImage.width();
            var afterImageHeight = afterImage.height();

            var maxWidth = ( beforeImageWidth < afterImageWidth ) ? beforeImageWidth :  afterImageWidth;
            var maxHeight = ( beforeImageHeight  > afterImageHeight ) ? beforeImageHeight  :  afterImageHeight;

            beforeImage.css( 'clip', 'rect(0px, ' + ( maxWidth * sliderOffset ) + 'px, ' + maxHeight + 'px, 0px)' );
            afterImage.css( 'clip', 'rect(0px, ' + maxWidth + 'px, ' + maxHeight + 'px, ' + ( maxWidth * sliderOffset ) + 'px)' );
            $( this ).find( '.baie_before_after_image .twentytwenty-overlay' ).css( 'maxWidth', maxWidth );
            $( this ).find( '.baie_before_after_image .twentytwenty-handle' ).css( 'left', maxWidth * sliderOffset );

            if( beforeImageLabel != '' ){
                $( this ).find( '.baie_before_after_image .twentytwenty-before-label' ).attr( 'data-content', beforeImageLabel );
            }
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

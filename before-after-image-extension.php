<?php
/*
Plugin Name: Before + After Images for Divi
Description: This extension adds a Divi module that allows the user to create a simple composite Before/After image from two unique images at a set size.
Version:     1.2.3
Author:      Aaron Bolton
Author URI:  https://www.boltonstudios.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: baie-before-after-image-extension
Domain Path: /languages

Before + After Images for Divi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

Before + After Images for Divi is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Before + After Images for Divi. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
*/


if ( ! function_exists( 'baie_initialize_extension' ) ):
/**
 * Creates the extension's main class instance.
 *
 * @since 1.0.0
 */
function baie_initialize_extension() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/BeforeAfterImageExtension.php';
}
add_action( 'divi_extensions_init', 'baie_initialize_extension' );

function baie_initialize_twentytwenty(){
    ?>
    <script>
        function baieLoadImages(){
            jQuery( '.twentytwenty-container' ).twentytwenty();
            jQuery( '.twentytwenty-wrapper' ).each(function(index){

                var baieBefore = jQuery( this ).find( '.twentytwenty-before' );
                var baieSliderOffsetString = baieBefore.attr( 'data-slider-offset' );
                var baieSliderOffset = parseInt(baieSliderOffsetString)/100;
                
                var baieBeforeLabel = baieBefore.attr( 'data-before-label' );
                var baieBeforeWidth = baieBefore.width();
                var baieBeforeHeight= baieBefore.height();

                var baieAfter = jQuery( this ).find( '.twentytwenty-after' );
                var baieAfterLabel = baieAfter.attr( 'data-after-label' );
                var baieAfterWidth = baieAfter.width();
                var baieAfterHeight = baieAfter.height();

                var maxWidth = ( baieBeforeWidth < baieAfterWidth ) ? baieBeforeWidth :  baieAfterWidth;
                var maxHeight = ( baieBeforeHeight > baieAfterHeight ) ? baieBeforeHeight :  baieAfterHeight;

                baieBefore.css( 'clip', 'rect(0px, ' + (maxWidth*baieSliderOffset) + 'px, ' + maxHeight + 'px, 0px)' );
                baieAfter.css( 'clip', 'rect(0px, ' + maxWidth + 'px, ' + maxHeight + 'px, ' + (maxWidth*baieSliderOffset) + 'px)' );
                jQuery( this ).find( '.baie_before_after_image .twentytwenty-overlay' ).css( 'maxWidth', maxWidth );
                jQuery( this ).find( '.baie_before_after_image .twentytwenty-handle' ).css( 'left', maxWidth*baieSliderOffset );

                if( baieBeforeLabel != '' ){
                    jQuery( this ).find( '.baie_before_after_image .twentytwenty-before-label' ).attr( 'data-content', baieBeforeLabel );
                }
                if( baieAfterLabel != '' ){
                    jQuery( this ).find( '.baie_before_after_image .twentytwenty-after-label' ).attr( 'data-content', baieAfterLabel )
                };
            });
        }
    </script>

    <script>
        // Load images in Visual Builder
        if(jQuery("body").hasClass("et-fb")){
            baieLoadImages();
        }
        // Load images when the window loads
        jQuery(window).on( 'load', function(){
            if(jQuery("body").hasClass("et-fb")){
                // Abort if the user is in the Divi Builder
                return
            } else{
                baieLoadImages();
            }
        });
        // Load images after lazy loading function runs
        jQuery('.baie_before_after_image img[data-lazy-src]').on( 'load', function(){
            if(jQuery("body").hasClass("et-fb")){
                // Abort if the user is in the Divi Builder
                return
            } else{
                baieLoadImages();
            }
        });
        jQuery('.baie_before_after_image img[data-lazy-type]').on( 'load', function(){
            if(jQuery("body").hasClass("et-fb")){
                // Abort if the user is in the Divi Builder
                return
            } else{
                baieLoadImages();
            }
        });
        jQuery('.baie_before_after_image img.lazy-loaded').on( 'load', function(){
            if(jQuery("body").hasClass("et-fb")){
                // Abort if the user is in the Divi Builder
                return
            } else{
                baieLoadImages();
            }
        });
    </script>
    <?php
}
add_action( 'wp_footer', 'baie_initialize_twentytwenty', 999 );

endif;

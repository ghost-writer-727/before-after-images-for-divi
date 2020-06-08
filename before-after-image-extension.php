<?php
/*
Plugin Name: Before + After Images for Divi
Description: Create before-and-after image sliders in the Divi Visual Builder easily.
Version:     1.3.5
Author:      Aaron Bolton
Author URI:  https://www.boltonstudios.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: before-after-images-for-divi
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
        require_once plugin_dir_path( __FILE__ ) . 'includes/class-before-after-images-for-divi.php';
    }
    add_action( 'divi_extensions_init', 'baie_initialize_extension' );

endif;

<?php

/**
 * The core plugin class.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Before_After_Images_For_Divi
 * @subpackage Before_After_Images_For_Divi/includes
 * @author     Aaron Bolton <aaron@boltonstudios.com>
 */

if ( ! class_exists( 'Before_After_Images_For_Divi' ) ) {

    class Before_After_Images_For_Divi extends DiviExtension {

        /**
         * The gettext domain for the extension's translations.
         *
         * @since 1.0.0
         *
         * @var string
         */
        public $gettext_domain;

        /**
         * The extension's WP Plugin name.
         *
         * @since 1.0.0
         *
         * @var string
         */
        public $name;

        /**
         * The extension's version
         *
         * @since 1.0.0
         *
         * @var string
         */
        public $version;

        /**
         * Before_After_Images_For_Divi constructor.
         *
         * @param string $name
         * @param array  $args
         */
        public function __construct( $name = 'before-after-images-for-divi', $args = array() ) {

            $this->plugin_dir     = plugin_dir_path( __FILE__ );
            $this->plugin_dir_url = plugin_dir_url( $this->plugin_dir );
            $this->version = '1.3.5';
            $this->gettext_domain = 'before-after-images-for-divi';
            parent::__construct( $name, $args );
        }
    }
}
new Before_After_Images_For_Divi;

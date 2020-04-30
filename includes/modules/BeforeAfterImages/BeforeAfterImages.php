<?php

/**
 * The Module Class that extends the Divi Builder
 *
 * This defines all of the server-side logic of the module.
 *
 * @since      1.0.0
 * @package    Before_After_Images_For_Divi
 * @subpackage Before_After_Images_For_Divi/includes
 * @author     Aaron Bolton <aaron@boltonstudios.com>
 */

if ( ! class_exists( 'Before_After_Images_For_Divi_Module' ) ) {

    class Before_After_Images_For_Divi_Module extends ET_Builder_Module {

        /**
         * The identifier for this module.
         *
         * @since 1.0.0
         *
         * @var string      Do not change this property value. Changing this value will break current installations.
         */
        public $slug = 'baie_before_after_image';

        /**
         * The module's level of compatibility with the Divi Visual Builder.
         *
         * @since 1.0.0
         *
         * @var string      off (default), partial, or on
         */
        public $vb_support = 'on';

        /**
         * Credits that appear at the bottom of the module settings modal.
         *
         * @since 1.0.0
         *
         * @var array 
         */
        protected $module_credits = array(
            'module_uri' => 'https://www.boltonstudios.com/',
            'author'     => 'Aaron Bolton',
            'author_uri' => 'https://www.boltonstudios.com/',
        );
        
        /**
         * 
         * @since 1.3.0
         * 
         * @var array $image_size_list
         */
        private $image_size_list;

        // Initialize class
        public function init() {
            
            $this->name = esc_html__( 'Before + After Images', 'before-after-images-for-divi' );
            $this->icon_path = plugin_dir_path( __FILE__ ) . 'icon.svg';
            $this->settings_modal_toggles = array(
                'general'  => array(
                    'toggles' => array(
                        'main_content' => esc_html__( 'Before + After Images', 'before-after-images-for-divi' )
                    ),
                ),
                'advanced' => array(
                    'toggles' => array(
                        'alignment'  => esc_html__( 'Alignment', 'before-after-images-for-divi' ),
                        'width'      => array(
                            'title'    => esc_html__( 'Sizing', 'before-after-images-for-divi' ),
                            'priority' => 65,
                        ),
                    ),
                ),
                'custom_css' => array(
                    'toggles' => array(
                        'animation' => array(
                            'title'    => esc_html__( 'Animation', 'before-after-images-for-divi' ),
                            'priority' => 90,
                        ),
                        'attributes' => array(
                            'title'    => esc_html__( 'Attributes', 'before-after-images-for-divi' ),
                            'priority' => 95,
                        ),
                    ),
                ),
            );
            $this->advanced_fields = array(
                'margin_padding' => array(
                    'css' => array(
                        'important' => array( 'custom_margin' ),
                    ),
                ),
                'borders'               => array(
                    'default' => array(
                        'css' => array(
                            'main' => array(
                                'border_radii'  => "%%order_class%% .et_pb_image_wrap",
                                'border_styles' => "%%order_class%% .et_pb_image_wrap",
                            ),
                        ),
                    ),
                ),
                'box_shadow'            => array(
                    'default' => array(
                        'css' => array(
                            'main'         => '%%order_class%% .et_pb_image_wrap',
                            'custom_style' => true,
                        ),
                    ),
                ),
                'max_width'             => array(
                    'options' => array(
                        'max_width' => array(
                            'depends_show_if' => 'off',
                        ),
                    ),
                ),
                'fonts'                 => false,
                'text'                  => false,
                'button'                => false,
            );
            $this->image_size_list = $this->get_image_dimensions();
        }
        
        /** 
         * Module settings are defined in the get_fields() method.
         * 
         * @return  array   $fields
         * */ 
        public function get_fields() {
            
            $fields = array(
                'src_before' => array(
                    'label'           => esc_html__( 'Before Image', 'before-after-images-for-divi' ),
                    'type'               => 'upload',
                    'option_category'    => 'basic_option',
                    'upload_button_text' => esc_attr__( 'Upload an image', 'before-after-images-for-divi' ),
                    'choose_text'        => esc_attr__( 'Choose an Image', 'before-after-images-for-divi' ),
                    'update_text'        => esc_attr__( 'Set As Image', 'before-after-images-for-divi' ),
                    'hide_metadata'      => true,
                    'affects'            => array(
                        'alt',
                        'title_text',
                        'size'
                    ),
                    'description'        => esc_html__( 'Upload your desired image, or type in the URL to the image you would like to display.', 'before-after-images-for-divi' ),
                    'toggle_slug'        => 'main_content',
                ),
                'label_before' => array(
                    'label'           => esc_html__( 'Before Label', 'before-after-images-for-divi' ),
                    'type'            => 'text',
                    'option_category' => 'basic_option',
                    'default' => 'Before',
                    'description'     => esc_html__( 'Set the label for the before image. The default label is "Before".' ),
                    'toggle_slug'     => 'main_content',
                ),
                'src_after' => array(
                    'label'           => esc_html__( 'After Image', 'before-after-images-for-divi' ),
                    'type'               => 'upload',
                    'option_category'    => 'basic_option',
                    'upload_button_text' => esc_attr__( 'Upload an image', 'before-after-images-for-divi' ),
                    'choose_text'        => esc_attr__( 'Choose an Image', 'before-after-images-for-divi' ),
                    'update_text'        => esc_attr__( 'Set As Image', 'before-after-images-for-divi' ),
                    'hide_metadata'      => true,
                    'affects'            => array(
                        'alt',
                        'title_text',
                        'size'
                    ),
                    'description'        => esc_html__( 'Upload your desired image, or type in the URL to the image you would like to display.', 'before-after-images-for-divi' ),
                    'toggle_slug'        => 'main_content',
                ),
                'label_after' => array(
                    'label'           => esc_html__( 'After Label', 'before-after-images-for-divi' ),
                    'type'            => 'text',
                    'option_category' => 'basic_option',
                    'default' => 'After',
                    'description'     => esc_html__( 'Set the label for the after image. The default label is "After".' ),
                    'toggle_slug'     => 'main_content',
                ),
                'alt' => array(
                    'label'           => esc_html__( 'Image Alternative Text', 'before-after-images-for-divi' ),
                    'type'            => 'text',
                    'option_category' => 'basic_option',
                    'depends_show_if' => 'on',
                    'depends_on'      => array(
                        'src',
                    ),
                    'description'     => esc_html__( 'This defines the HTML ALT text. A short description of your image can be placed here.', 'before-after-images-for-divi' ),
                    'tab_slug'        => 'custom_css',
                    'toggle_slug'     => 'attributes',
                ),
                'title_text' => array(
                    'label'           => esc_html__( 'Image Title Text', 'before-after-images-for-divi' ),
                    'type'            => 'text',
                    'option_category' => 'basic_option',
                    'depends_show_if' => 'on',
                    'depends_on'      => array(
                        'src',
                    ),
                    'description'     => esc_html__( 'This defines the HTML Title text.', 'before-after-images-for-divi' ),
                    'tab_slug'        => 'custom_css',
                    'toggle_slug'     => 'attributes',
                ),
                'size' => array(
                    'label' => esc_html__( 'Image Size', 'before-after-images-for-divi' ),
                    'type' => 'select',
                    'depends_show_if' => 'on',
                    'depends_on' => array(
                        'src_before',
                        'src_after'
                    ),
                    'option_category' => 'basic_option',
                    'options' =>  $this->image_size_list, 'before-after-images-for-divi',
                    'description' => esc_html__( 'This defines the size of the image.' ),
                    'tab_slug' => 'custom_css',
                    'toggle_slug' => 'attributes'
                ),
                'slider_offset' => array(
                    'label' => esc_html__( 'Slider Offset', 'before-after-images-for-divi' ),
                    'type' => 'range',
                    'option_category' => 'basic_option',
                    'options'           => array(
                        'min'      => esc_html__( '0%', 'et_builder' ),
                        'max'     => esc_html__( '100%', 'et_builder' ),
                        'step'     => esc_html__( '10%', 'et_builder' ),
                    ),
                    'default_on_front' => '50%',
                    'description' => esc_html__( 'This defines how much of the before image is visible when the page loads.' ),
                    'tab_slug' => 'custom_css',
                    'toggle_slug' => 'attributes'
                ),
                'show_bottom_space' => array(
                    'label'             => esc_html__( 'Show Space Below The Image', 'et_builder' ),
                    'type'              => 'yes_no_button',
                    'option_category'   => 'layout',
                    'options'           => array(
                        'on'      => esc_html__( 'Yes', 'et_builder' ),
                        'off'     => esc_html__( 'No', 'et_builder' ),
                    ),
                    'default_on_front' => 'on',
                    'tab_slug'          => 'advanced',
                    'toggle_slug'       => 'margin_padding',
                    'description'       => esc_html__( 'Here you can choose whether or not the image should have a space below it.', 'et_builder' ),
                ),
                'align' => array(
                    'label'           => esc_html__( 'Image Alignment', 'et_builder' ),
                    'type'            => 'text_align',
                    'option_category' => 'layout',
                    'options'         => et_builder_get_text_orientation_options( array( 'justified' ) ),
                    'default_on_front' => 'left',
                    'tab_slug'        => 'advanced',
                    'toggle_slug'     => 'alignment',
                    'description'     => esc_html__( 'Here you can choose the image alignment.', 'et_builder' ),
                    'options_icon'    => 'module_align',
                ),
                'force_fullwidth' => array(
                    'label'             => esc_html__( 'Force Fullwidth', 'et_builder' ),
                    'type'              => 'yes_no_button',
                    'option_category'   => 'layout',
                    'options'           => array(
                        'off' => esc_html__( 'No', 'et_builder' ),
                        'on'  => esc_html__( 'Yes', 'et_builder' ),
                    ),
                    'default_on_front' => 'off',
                    'tab_slug'    => 'advanced',
                    'toggle_slug' => 'width',
                    'affects' => array(
                        'max_width',
                    ),
                ),
                'always_center_on_mobile' => array(
                    'label'             => esc_html__( 'Always Center Image On Mobile', 'et_builder' ),
                    'type'              => 'yes_no_button',
                    'option_category'   => 'layout',
                    'options'           => array(
                        'on'  => esc_html__( 'Yes', 'et_builder' ),
                        'off' => esc_html__( 'No', 'et_builder' ),
                    ),
                    'default_on_front' => 'on',
                    'tab_slug'          => 'advanced',
                    'toggle_slug'       => 'alignment',
                ),
            );
            return $fields;
        }
        
        /**
         * 
         * @return mixed|string|void 
         */
        private function get_alignment() {

            $alignment = isset( $this->props['align'] ) ? $this->props['align'] : '';
            return et_pb_get_alignment( $alignment );
        }
        
        /** 
         * Render the module on the front end.
         * The following code contains lines of derivative code from Divi Builder, a plugin which is licensed GPLv2.
         * Original Copyright Elegant Themes <http://elegantthemes.com> and contributors.
         * 
         * @param   array   $attributes
         * @param   mixed|string|void|null   $content
         * @param   string  $render_slug
         * */ 
        public function render( $attributes, $content = null, $render_slug ) {
            
            /*
            echo "ATTRIBUTES";
            var_dump( $attributes );

            echo "PROPS";
            var_dump( $this->props );
            */

            // Get selected image source URL's.
            $src_before = isset( $attributes['src_before'] ) ? $attributes['src_before'] : '';
            $src_after = isset( $attributes['src_after'] ) ? $attributes['src_after'] : '';
            $srcs = array( $src_before, $src_after );
            $images = $this->get_images( $srcs, $attributes );

            // Construct the HTML output for the images.
            $is_src_svg = false;
            $max_width = 0;
            $images_output = '';
            foreach( $images as $image){

                // Concatenate string of image output
                $images_output .= $image['output'];

                // Set max width to the width of the smallest image.
                $max_width = $image[ 'size_width' ];
                if( $image[ 'size_width' ] < $max_width ){
                    $max_width = $image[ 'size_width' ];
                }

                // Set this vaule to true if either image is an SVG.
                if( $image[ 'is_svg' ] ){
                    $is_src_svg = true;
                };
            };
            
            // Get standard Divi Image properties.
            $show_bottom_space       = $this->props['show_bottom_space'];
            $align                   = $this->get_alignment();
            $align_tablet            = $this->get_alignment( 'tablet' );
            $align_phone             = $this->get_alignment( 'phone' );
            $force_fullwidth         = $this->props['force_fullwidth'];
            $always_center_on_mobile = $this->props['always_center_on_mobile'];
            $animation_style         = $this->props['animation_style'];
            $video_background          = $this->video_background();
            $parallax_image_background = $this->get_parallax_image_background();

            // Run standard Divi Image fields logic.
            if ( 'on' === $force_fullwidth ) {
                ET_Builder_Element::set_style( $render_slug, array(
                    'selector'    => '%%order_class%%',
                    'declaration' => 'max-width: 100% !important;',
                ) );

                ET_Builder_Element::set_style( $render_slug, array(
                    'selector'    => '%%order_class%% .et_pb_image_wrap, %%order_class%% img',
                    'declaration' => 'width: 100%;',
                ) );
            }

            if ( ! $this->_is_field_default( 'align', $align ) ) {
                ET_Builder_Element::set_style( $render_slug, array(
                    'selector'    => '%%order_class%%',
                    'declaration' => sprintf(
                        'text-align: %1$s;',
                        esc_html( $align )
                    ),
                ) );
            }

            if ( 'center' !== $align ) {
                ET_Builder_Element::set_style( $render_slug, array(
                    'selector'    => '%%order_class%%',
                    'declaration' => sprintf(
                        'margin-%1$s: 0;',
                        esc_html( $align )
                    ),
                ) );
            }

            // Set display block for svg image to avoid disappearing svg image
            if ( $is_src_svg ) {
                ET_Builder_Element::set_style( $render_slug, array(
                    'selector'    => '%%order_class%% .et_pb_image_wrap',
                    'declaration' => 'display: block;',
                ) );
            }

            // Responsive Image Alignment.
            // Set CSS properties and values for the image alignment.
            // 1. Text Align is necessary, just set it from current image alignment value.
            // 2. Margin {Side} is optional. Used to pull the image to right/left side.
            // 3. Margin Left and Right are optional. Used by Center to reset custom margin of point 2.
            $align_values = array(
                'desktop' => array(
                    'text-align'      => esc_html( $align ),
                    "margin-{$align}" => ! empty( $align ) && 'center' !== $align ? '0' : '',
                ),
                'tablet'  => array(
                    'text-align'             => esc_html( $align_tablet ),
                    'margin-left'            => 'left' !== $align_tablet ? 'auto' : '',
                    'margin-right'           => 'left' !== $align_tablet ? 'auto' : '',
                    "margin-{$align_tablet}" => ! empty( $align_tablet ) && 'center' !== $align_tablet ? '0' : '',
                ),
                'phone'   => array(
                    'text-align'            => esc_html( $align_phone ),
                    'margin-left'           => 'left' !== $align_phone ? 'auto' : '',
                    'margin-right'          => 'left' !== $align_phone ? 'auto' : '',
                    "margin-{$align_phone}" => ! empty( $align_phone ) && 'center' !== $align_phone ? '0' : '',
                ),
            );
            et_pb_responsive_options()->generate_responsive_css( $align_values, '%%order_class%%', '', $render_slug, '', 'alignment' );

            // Module classnames
            if ( ! in_array( $animation_style, array( '', 'none' ) ) ) {
                $this->add_classname( 'et-waypoint' );
            }

            if ( 'on' !== $show_bottom_space ) {
                $this->add_classname( 'et_pb_image_sticky' );
            }

            if ( 'on' === $always_center_on_mobile ) {
                $this->add_classname( 'et_always_center_on_mobile' );
            }
            
            // Module inline styles
            $inline_css = 'max-width: '. $max_width . 'px;';
            
            switch( $align ){
                case( "center" ):
                    $inline_css .= 'margin-left: auto; margin-right: auto;';
                    break;
                case("right"):
                    $inline_css .= 'margin-left: auto; margin-right: 0;';
                    break;
                default:
                    break;
            }
            $inline_styles = 'style="'. $inline_css .'"';

            //$inline_scripts = '';
            $beforeLabel = ( isset( $attributes['label_before']) ) ? $attributes['label_before'] : '';
            $inline_scripts = '<script>';
            $inline_scripts .='
            function loadBeforeAfterImages( target, before_label ){
        
                // Set Defaults
                var baie_offset_pct = 0.5; 
                var baie_orientation = "horizontal"; 
                var baie_before_label = "Before";
                var baie_after_label = "After";
                var baie_no_overlay = false;
                var baie_move_slider_on_hover = false; 
                var baie_move_with_handle_only = true; // Allow a user to swipe anywhere on the image to control slider movement. 
                var baie_click_to_move = false; // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
                
                console.log( "baie_before_label is " + baie_before_label);
                baie_before_label = before_label;
                console.log( "baie_before_label is " + baie_before_label);
                jQuery( target ).twentytwenty({
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
            ';
            $inline_scripts .= '
                jQuery(window).load(function() {
                    loadBeforeAfterImages( ".baie_before_after_image_0.twentytwenty-container", "'. $beforeLabel .'" );
              });
            ';
            $inline_scripts .= '</script>';
            
            // Put it all together and return the output.
            $output = sprintf(
                '<div%3$s class="%2$s et_pb_image_wrap twentytwenty-container" %6$s>
                    %5$s
                    %4$s
                    %1$s
                </div>',
                $images_output,
                $this->module_classname( $render_slug ),
                $this->module_id(),
                $video_background,
                $parallax_image_background,
                $inline_styles
            );
            $output .= $inline_scripts;
            return $output;
        }
        
        /**
         * Get the WordPress image objects for the images selected by the user.
         * Extract properties from the image objects and return an array with those values.
         * 
         * @param mixed $srcs 
         * @return array 
         */
        private function get_images( $srcs, $attributes ){

            // Initialize variables.
            $images = array();
            $size_width = 376;
            $size_height = 220;

            // Get selected image labels.
            $beforeLabel = ( isset( $attributes['label_before']) ) ? $attributes['label_before'] : '';
            $afterLabel = ( isset( $attributes['label_after']) ) ? $attributes['label_after'] : '';
            
            // Get selected slider offset.
            $sliderOffset = ( isset( $attributes['slider_offset']) ) ? $attributes['slider_offset'] : '';

            // Get selected image attributes.
            $alt = ( isset( $attributes[ 'alt' ] ) ) ? $attributes[ 'alt' ] : '';
            $title_text = ( isset( $attributes[ 'title_text' ] ) ) ? $attributes[ 'title_text' ] : '';
            $src_placeholder = "https://imgplaceholder.com/376x220/cccccc/757575/fa-image?font-size=64";
            
            // Use a placeholder image if the user did not select images. 
            if( $srcs[0] == null || $srcs[0] == '' ){
                
                array_push( $images, array(
                    'output' => '<img src="'. esc_attr( $src_placeholder ) .'" data-before-label="'. esc_attr( $beforeLabel ).'" data-after-label="'. esc_attr( $afterLabel ).'" data-slider-offset="'. esc_attr( $sliderOffset ).'" alt="'. esc_attr( $alt ) .'"'. ( '' !== $title_text ? sprintf( ' title="%1$s"', esc_attr( $title_text ) ) : '' ) .' class="" /><img src="'. esc_attr( $src_placeholder ) .'" data-before-label="'. esc_attr( $beforeLabel ).'" data-after-label="'. esc_attr( $afterLabel ).'" data-slider-offset="'. esc_attr( $sliderOffset ).'" alt="'. esc_attr( $alt ) .'"'. ( '' !== $title_text ? sprintf( ' title="%1$s"', esc_attr( $title_text ) ) : '' ) .' class="" />',
                    'size_width' => $size_width,
                    'size_height' => $size_height,
                    'is_svg' => false
                    )
                );
            } else{

                // Extract properties from selected WordPress image objects.
                foreach( $srcs as $src ){

                    $src_id = attachment_url_to_postid( $src );
                    if( $src_id == ''){
                        // Break if there is no src id, image missing, etc.
                        break;
                    }
                    $src_url = parse_url( $src );
                    $src_path = $src_url[ 'path' ];
                    $src_path_parts = pathinfo( $src_path );
                    $src_file_extension = $src_path_parts['extension'];

                    // Get selected size.
                    $size = $attributes['size']; // Width: 376px. Height: 220px. (cropped).
                    $size_explode = explode( '.', $size );
                    if( array_key_exists( 1, $size_explode ) ){

                        // If $size does not contain multiple strings, no size was selected and the named size will be set to a default size.
                        $size_width = (int) filter_var( $size_explode[0], FILTER_SANITIZE_NUMBER_INT );
                        $size_height = (int) filter_var( $size_explode[1], FILTER_SANITIZE_NUMBER_INT );
                    }

                    // Get named size.
                    // If no size was selected, set the named size to "large".
                    if( $size === "selectasize." ){
                        $named_size = "large";
                    } else if( $size === "fullsize." ){
                        $named_size = "full";
                    } else{
                        $named_size = self::get_named_size( array( $size_width, $size_height ) );
                    }
                
                    // Get image source URL at named size.
                    $src_url = wp_get_attachment_image_src( $src_id, $named_size );

                    // If there is no source URL at the named size, use the image placeholder.
                    ( $src_url ) ? $src_url = $src_url[0] : $src_placeholder;
                    
                    // Get the image source set.
                    $src_set = wp_get_attachment_image_srcset( $src_id, $named_size );
                    ($src_set) ? $src_set_output = 'srcset="'. esc_attr( $src_set ) .'"' : $src_set_output ='';
                    
                    // Create a 'sizes' attribute value for the image.
                    $src_sizes = wp_calculate_image_sizes( $named_size, $src_url, wp_get_attachment_metadata( $src_id ), $src_id );  
                    ($src_sizes) ? $src_sizes_output = 'sizes="'. esc_attr( $src_sizes ) .'"' : $src_sizes_output ='';
                    
                    // Handle svg image behaviour
                    $is_src_svg = isset( $src_file_extension ) ? 'svg' === $src_file_extension : false;
                    
                    array_push( $images, array(
                        'output' => '<img src="'. esc_attr( $src_url ) .'" '. $src_set_output .' '. $src_sizes_output .' data-before-label="'. esc_attr( $beforeLabel ).'" data-after-label="'. esc_attr( $afterLabel ).'" data-slider-offset="'. esc_attr( $sliderOffset ).'" alt="'. esc_attr( $alt ) .'"'. ( '' !== $title_text ? sprintf( ' title="%1$s"', esc_attr( $title_text ) ) : '' ) .' class="" />',
                        'size_width' => $size_width,
                        'size_height' => $size_height,
                        'is_svg' => $is_src_svg
                        )
                    );
                } 
            }
            return $images;
        }

        /**
         * Original function from https://codex.wordpress.org/Function_Reference/get_intermediate_image_sizes
         * Get size information for all currently-registered image sizes.
         * @global $_wp_additional_image_sizes
         * @uses   get_intermediate_image_sizes()
         * @return array $sizes Data for all currently-registered image sizes.
         */
        private function get_image_sizes() {

            global $_wp_additional_image_sizes;
            $sizes = array();

            foreach ( get_intermediate_image_sizes() as $_size ) {

                if ( in_array( $_size, array('thumbnail', 'medium', 'medium_large', 'large') ) ) {

                    $sizes[ $_size ]['width']  = get_option( "{$_size}_size_w" );
                    $sizes[ $_size ]['height'] = get_option( "{$_size}_size_h" );
                    $sizes[ $_size ]['crop']   = (bool) get_option( "{$_size}_crop" );
                } elseif ( isset( $_wp_additional_image_sizes[ $_size ] ) ) {

                    $sizes[ $_size ] = array(
                        'width'  => $_wp_additional_image_sizes[ $_size ]['width'],
                        'height' => $_wp_additional_image_sizes[ $_size ]['height'],
                        'crop'   => $_wp_additional_image_sizes[ $_size ]['crop'],
                    );
                }
            }
            return $sizes;
        }

        /**
         * Original function from https://wordpress.stackexchange.com/a/254064
         * Return the closest named size from an array of width and height values.
         *
         * Based off of WordPress's image_get_intermediate_size()
         * If the size matches an existing size then it will be used. If there is no
         * direct match, then the nearest image size larger than the specified size
         * will be used. If nothing is found, then the function will return false.
         * Uses get_image_sizes() to get all available sizes.
         *
         * @param  array|string $size   Image size. Accepts an array of width and height (in that order).
         * @return false|string $data   named image size e.g. 'thumbnail'.
         */
        private function get_named_size( $size ) {

            $data = array();
            $image_sizes = $this->get_image_sizes();

            // Find the best match when '$size' is an array.
            if ( is_array( $size ) ) {

                $candidates = array();

                foreach ( $image_sizes as $_size => $data ) {

                    // If there's an exact match to an existing image size, short circuit.
                    if ( $data['width'] == $size[0] && $data['height'] == $size[1] ) {
                        $candidates[ $data['width'] * $data['height'] ] = array( $_size, $data );
                        break;
                    }
                    // If it's not an exact match, consider larger sizes with the same aspect ratio.
                    if ( $data['width'] >= $size[0] && $data['height'] >= $size[1] ) {
                        if ( wp_image_matches_ratio( $data['width'], $data['height'], $size[0], $size[1] ) ) {
                            $candidates[ $data['width'] * $data['height'] ] = array( $_size, $data );
                        }
                    }
                }
                if ( ! empty( $candidates ) ) {

                    // Sort the array by size if we have more than one candidate.
                    if ( 1 < count( $candidates ) ) {
                        ksort( $candidates );
                    }

                    $data = array_shift( $candidates );
                    $data = $data[0];
                /*
                * When the size requested is smaller than the thumbnail dimensions, we
                * fall back to the thumbnail size to maintain backwards compatibility with
                * pre 4.6 versions of WordPress.
                */
                } elseif ( ! empty( $image_sizes['thumbnail'] ) && $image_sizes['thumbnail']['width'] >= $size[0] && $image_sizes['thumbnail']['width'] >= $size[1] ) {
                    $data = 'thumbnail';
                } else {
                    return false;
                }
            } elseif ( ! empty( $image_sizes[ $size ] ) ) {
                $data = $size;
            }
            // If we still don't have a match at this point, return false.
            if ( empty( $data ) ) {
                return false;
            }
            return $data;
        }
        
        /**
         * Simple function to sort an array by a specific key. Maintains index association.
         * http://php.net/manual/en/function.sort.php
         * @param mixed $array 
         * @param mixed $on 
         * @param int $order 
         * @return array 
         */
        private function array_sort( $array, $on, $order=SORT_ASC){
            $new_array = array();
            $sortable_array = array();
            if (count($array) > 0) {
                foreach ($array as $k => $v) {
                    if (is_array($v)) {
                        foreach ($v as $k2 => $v2) {
                            if ($k2 == $on) {
                                $sortable_array[$k] = $v2;
                            }
                        }
                    } else {
                        $sortable_array[$k] = $v;
                    }
                }
                switch ($order) {
                    case SORT_ASC:
                        asort($sortable_array);
                    break;
                    case SORT_DESC:
                        arsort($sortable_array);
                    break;
                }
                foreach ($sortable_array as $k => $v) {
                    $new_array[$k] = $array[$k];
                }
            }
            return $new_array;
        }

        /**
         * Create a string array of available image dimensions.
         * This is used to populate the image size selector in the module settings.
         * 
         * @return string[] 
         */
        private function get_image_dimensions(){

            // Get the available image sizes.
            $image_sizes = $this->get_image_sizes();
            $image_sizes = $this->array_sort( $image_sizes, 'width' ); // Sort sizes from smallest to largest.
            $image_dimensions = array( 'selectasize.' => 'Select a size.' );

            foreach( $image_sizes as $size ){

                $width = 'Width: ' . $size['width'] .'px.';
                $height = 'Height: '. $size['height'] .'px.';
                ( $size['crop'] ) ? $cropped = '(cropped).' : $cropped = '(best fit)';
                $size_str = $width .' '. $height .' '. $cropped;

                if( $size['width'] != 0 && $size['height'] != 0 && $cropped == '(cropped).' ){

                    $image_dimensions += [ strtolower( preg_replace('/\s*/', '', $size_str) ) => $size_str ];
                }
            }
            $image_dimensions += [ 'fullsize.' => 'Full size.' ];
            return $image_dimensions;
        }
    }
}
new Before_After_Images_For_Divi_Module;

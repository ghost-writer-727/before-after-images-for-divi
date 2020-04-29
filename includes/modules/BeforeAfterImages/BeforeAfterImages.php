<?php

class Before_After_Images_For_Divi_Module extends ET_Builder_Module {

	public $slug       = 'baie_before_after_image';
	public $vb_support = 'on';

	protected $module_credits = array(
		'module_uri' => 'https://www.boltonstudios.com/',
		'author'     => 'Aaron Bolton',
		'author_uri' => 'https://www.boltonstudios.com/',
	);
    
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
        $this->image_sizes = self::baie_get_image_dimensions();
	}
    
    // Module settings are defined in the get_fields() method.
	public function get_fields() {
        
        // Define Module Settings
		$output = array(
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
                'options' =>  $this->image_sizes, 'before-after-images-for-divi',
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
        return $output;
	}
	public function get_alignment() {
		$alignment = isset( $this->props['align'] ) ? $this->props['align'] : '';
		return et_pb_get_alignment( $alignment );
	}
    // Finish the implementation of the render() method so that it will generate the module's HTML output based on its props.
	public function render( $attrs, $content = null, $render_slug ) {
        
        // Get selected image labels.
        $beforeLabel = $this->props['label_before'];
        $afterLabel = $this->props['label_after'];
        
        // Get slider offset.
        $sliderOffset = $this->props['slider_offset'];
        
        // Initialize variables
        $images = '';
        $size_width = '';
        $size_height = '';
        $is_src_svg = '';
        
        // Get selected image source URL's.
        $srcs = array( $this->props['src_before'], $this->props['src_after'] );
        foreach( $srcs as $src ){
            $src_id = attachment_url_to_postid( $src );
            if($src_id == ''){
                // Break if there is no src id, image missing, etc.
                break;
            }
            $src_url = parse_url( $src );
            $src_path = $src_url[ 'path' ];
            $src_path_parts = pathinfo( $src_path );
            $src_dir_name = $src_path_parts['dirname'];
            $src_file_name = $src_path_parts['filename'];
            $src_file_extension = $src_path_parts['extension'];
            $src_placeholder = "//placeholder.pics/svg/376x220/DEDEDE/555555/Size%20not%20found.";

            // Get selected size.
            $size = $this->props['size']; // Width: 376px. Height: 220px. (cropped).
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
            ( $src_url ) ? $src_url = $src_url[0] : $src_placeholder;
            
            $src_set = wp_get_attachment_image_srcset( $src_id, $named_size );
            ($src_set) ? $src_set_output = 'srcset="'. esc_attr( $src_set ) .'"' : $src_set_output ='';
            
            $src_sizes = wp_calculate_image_sizes( $named_size, $src_url, wp_get_attachment_metadata($src_id), $src_id );  
            ($src_sizes) ? $src_sizes_output = 'sizes="'. esc_attr( $src_sizes ) .'"' : $src_sizes_output ='';
            
            // Get selected image metadata
            $alt = $this->props['alt'];
            $title_text = $this->props['title_text'];
            
            // Handle svg image behaviour
            $is_src_svg = isset( $src_file_extension ) ? 'svg' === $src_file_extension : false;
            
            $images .= '
                    <img src="'. esc_attr( $src_url ) .'" '. $src_set_output .' '. $src_sizes_output .' data-before-label="'. esc_attr( $beforeLabel ).'" data-after-label="'. esc_attr( $afterLabel ).'" data-slider-offset="'. esc_attr( $sliderOffset ).'" alt="'. esc_attr( $alt ) .'"'. ( '' !== $title_text ? sprintf( ' title="%1$s"', esc_attr( $title_text ) ) : '' ) .' class="" />';
        }
        
        // Get standard fields as in default Image module
		$show_bottom_space       = $this->props['show_bottom_space'];
		$align                   = $this->get_alignment();
		$force_fullwidth         = $this->props['force_fullwidth'];
		$always_center_on_mobile = $this->props['always_center_on_mobile'];
		$animation_style         = $this->props['animation_style'];
        
        $video_background          = $this->video_background();
		$parallax_image_background = $this->get_parallax_image_background();

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
        $inline_css = '';
        $inline_styles = '';
        if($size_width != ''){
            $inline_styles .= 'max-width: '. $size_width . 'px;';
        }
        switch($align){
            case("center"):
                $inline_styles .= 'margin-left: auto; margin-right: auto;';
                break;
            case("right"):
                $inline_styles .= 'margin-left: auto; margin-right: 0;';
                break;
            default:
                break;
        }
        if($inline_styles != ''){
            $inline_css = 'style="'. $inline_styles .'"';
        }
        
        //* Put it all together and return the output.
		$output = sprintf(
			'<div%3$s class="%2$s et_pb_image_wrap twentytwenty-container" %6$s>
				%5$s
				%4$s
				%1$s
			</div>',
			$images,
			$this->module_classname( $render_slug ),
			$this->module_id(),
			$video_background,
			$parallax_image_background,
            $inline_css
		);
        return $output;
	}
    /**
	 * Enqueues non-minified, hot reloaded javascript bundles.
	 *
	 * @since 3.1
	 */
	protected function _enqueue_debug_bundles() {
		// Frontend Bundle
		$site_url       = wp_parse_url( get_site_url() );
		$hot_bundle_url = "http://localhost:3000/static/js/frontend-bundle.js";

		wp_enqueue_script( "{$this->name}-frontend-bundle", $hot_bundle_url, $this->_bundle_dependencies['frontend'], $this->version, true );

		if ( et_core_is_fb_enabled() ) {
			// Builder Bundle
			$hot_bundle_url = "http://localhost:3000/static/js/builder-bundle.js";

			wp_enqueue_script( "{$this->name}-builder-bundle", $hot_bundle_url, $this->_bundle_dependencies['builder'], $this->version, true );
		}
	}
    /**
     * Original function from https://codex.wordpress.org/Function_Reference/get_intermediate_image_sizes
     * Get size information for all currently-registered image sizes.
     * @global $_wp_additional_image_sizes
     * @uses   get_intermediate_image_sizes()
     * @return array $sizes Data for all currently-registered image sizes.
     */
     protected function get_image_sizes() {
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
    protected function get_named_size( $size ) {
        $image_sizes = self::get_image_sizes();
        $data = array();
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
    // Simple function to sort an array by a specific key. Maintains index association.
    // http://php.net/manual/en/function.sort.php
    protected function array_sort($array, $on, $order=SORT_ASC){
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
    protected function baie_get_image_dimensions(){
        // Get the available image sizes.
        $baie_image_sizes = self::get_image_sizes();
        $baie_image_sizes = self::array_sort( $baie_image_sizes, 'width' ); // Sort sizes from smallest to largest.
        $baie_image_dimensions = array( 'selectasize.' => 'Select a size.' );
        foreach( $baie_image_sizes as $size ){
            $width = 'Width: ' . $size['width'] .'px.';
            $height = 'Height: '. $size['height'] .'px.';
            ( $size['crop'] ) ? $cropped = '(cropped).' : $cropped = '(best fit)';
            $size_str = $width .' '. $height .' '. $cropped;
            if( $size['width'] != 0 && $size['height'] != 0 && $cropped == '(cropped).' ){
                $baie_image_dimensions += [ strtolower( preg_replace('/\s*/', '', $size_str) ) => $size_str ];
            }
        }
        $baie_image_dimensions += [ 'fullsize.' => 'Full size.' ];
        return $baie_image_dimensions;
    }
}

new Before_After_Images_For_Divi_Module;

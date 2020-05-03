// External Dependencies
import React, { Component, Fragment } from 'react';

// Internal Dependencies
import './style.css';
import {createImageSrcAtSize} from './helpers.js';
import {generateStyles} from './helpers.js';
import {getOrientationClasses} from './helpers.js';

class BeforeAfterImages extends Component {

    static slug = 'baie_before_after_image';

    constructor(props){

        super(props);

        // Get user input: slider offset. Store as a decimal (e.g. 0.5).
        this.sliderOffset = parseInt(this.props.slider_offset)/100;

        // Create callback refs
        this.wrapper = React.createRef();
        this.container = React.createRef();
        this.beforeImage = React.createRef();
        this.afterImage = React.createRef();
        this.sliderHandle = React.createRef();
    }
    render() {

        // Create images objects from user input: image source.
        var beforeImage = new Image();
        var afterImage = new Image();
        beforeImage.src = this.props.src_before;
        afterImage.src = this.props.src_after;

        // Store the natural width and height.
        // Used in logic where the user selected the "Full size" size option.
        var fullSizeWidth = (beforeImage.naturalWidth <= afterImage.naturalWidth) ? beforeImage.naturalWidth : afterImage.naturalWidth;
        var fullSizeHeight = (beforeImage.naturalHeight <= afterImage.naturalHeight) ? beforeImage.naturalHeight : afterImage.naturalHeight;

        // Get user input: slider offset.
        var sliderOffsetString = this.props.slider_offset;
        var sliderOffset = parseInt(sliderOffsetString)/100;

        // Get user input: image labels, and set defaults.
        var beforeImageLabel = this.props.label_before;
        var afterImageLabel = this.props.label_after;
        beforeImageLabel = (beforeImageLabel === undefined || beforeImageLabel === 'undefined' || beforeImageLabel === '') ? "Before" : this.props.label_before;
        afterImageLabel = (afterImageLabel === undefined || afterImageLabel === 'undefined' || afterImageLabel === '') ? "After" : this.props.label_after;
        
        // Get user input: size.
        var sizeSelected = this.props.size;

        // Check if the user declined to select a size.
        var didSelectSize = (sizeSelected === undefined || sizeSelected === 'undefined' || sizeSelected === 'selectasize.') ? false : true;
        
        // Check if the user selected "Full Size."
        var didSelectFullSize = ( sizeSelected === 'full' || sizeSelected === 'fullsize.' ) ? true : false;

        // Initialize other variables.
        var selectedSizeAttributes = {
            width: 0,
            height: 0,
            didSelectFullSize: didSelectFullSize
        };
        var selectedWidth = ''; 
        var selectedHeight = '';
        var sizeClass = '';
        var alignment = this.props.align;
        
        // Set some classes for the wrapper based on the image size.
        if( sizeSelected === 'undefined' || sizeSelected === 'selectasize.' ){
            sizeClass = 'sizeUndefined';
        } else if( sizeSelected === 'full' || sizeSelected === 'fullsize.' ){
            sizeClass = 'sizeFull';
        }
        
        // Reconstruct image URL to retrieve image at selected size.
        if ( didSelectSize === true && didSelectFullSize === false ){
            
            // Construct image source URL's at selected size.
            // Also get the selected image size for the module.
            var beforeImageAtSize = createImageSrcAtSize( beforeImage.src, sizeSelected );
            var afterImageAtSize = createImageSrcAtSize( afterImage.src, sizeSelected )

            // Update vars with size values.
            selectedWidth = beforeImageAtSize.width;
            selectedHeight = beforeImageAtSize.height;
            sizeClass = getOrientationClasses( beforeImage, afterImage, ['sizeFull'] );

            // Check if image sources exists at the selected size. If so, update the source URL of the image obect.
            // If the URL points to a real image, the natural width will not be 0.
            if( beforeImage.naturalWidth !== 0 ){
                beforeImage.src = beforeImageAtSize.url;
            } else{
                sizeClass += 'sizeFull sizeFallback ';
            }
            if( afterImage.naturalWidth !== 0 ){
                afterImage.src = afterImageAtSize.url;
            } else{
                sizeClass += 'sizeFull sizeFallback ';
            }

            // Update selectedSizeAttributes
            selectedSizeAttributes.width = selectedWidth;
            selectedSizeAttributes.height = selectedHeight;

        } else if( didSelectSize === false && didSelectFullSize === false  ) {

            // No size selected
            sizeClass = getOrientationClasses( beforeImage, afterImage );
            selectedWidth = 376;
            selectedHeight = 225;

            // Update selectedSizeAttributes
            selectedSizeAttributes.width = selectedWidth;
            selectedSizeAttributes.height = selectedHeight;

        } else{
            
            // Full size selected.
            sizeClass = getOrientationClasses( beforeImage, afterImage, ['sizeFull'] );
            selectedWidth = ( beforeImage.width > afterImage.width ) ? afterImage.width : beforeImage.width;
            selectedHeight = ( beforeImage.height > afterImage.height ) ? afterImage.width : beforeImage.width;

            // Update selectedSizeAttributes
            selectedSizeAttributes.width = selectedWidth;
            selectedSizeAttributes.height = selectedHeight;
        }
        
        // Classes
        var wrapperClasses = "twentytwenty-wrapper twentytwenty-horizontal et_pb_image_wrap " + sizeClass;
        var containerClasses = "twentytwenty-container";
        
        // Styles
        var styles = generateStyles(
            alignment,
            selectedSizeAttributes,
            sliderOffset,
            sliderOffsetString
        );

        // Adjust styles if the user selected "Full size".
        if(this.container.current !== null && didSelectFullSize === true ){

            // Get the container and image attributes.
            var orientation = (fullSizeWidth >= fullSizeHeight) ? 'landscape' : 'portrait';
            var aspectRatio = (orientation === 'landscape') ? fullSizeHeight/fullSizeWidth : fullSizeWidth/fullSizeHeight;
            var width = this.container.current.clientWidth;
            var height = Math.trunc(this.container.current.clientWidth * aspectRatio);

            // Apply changes to styles object.
            styles.container.height = height;
            styles.beforeImage.height = height;
            styles.beforeImage.clip = 'rect(0px, ' + (width*sliderOffset) + 'px, ' + height + 'px, 0px)'
            styles.afterImage.height = height;
            styles.afterImage.clip = 'rect(0px, ' + width + 'px, ' + height + 'px, ' + (width*sliderOffset) + 'px)'
        }
        return (
            <Fragment>
                <div id="et-boc" ref={n => this.node = n}>
                    <div class="et-l">
                        <div class={wrapperClasses} style={styles.wrapper} ref={this.wrapper}>
                            <div class={containerClasses} style={styles.container} ref={this.container}>
                                <img
                                    src={beforeImage.src}
                                    alt=""
                                    class="twentytwenty-before"
                                    style={styles.beforeImage}
                                    width={selectedWidth}
                                    height={selectedHeight}
                                    ref={this.beforeImage}
                                />
                                <img
                                    src={afterImage.src}
                                    alt=""
                                    class="twentytwenty-after"
                                    style={styles.afterImage}
                                    width={selectedWidth}
                                    height={selectedHeight}
                                    ref={this.afterImage}
                                />
                                <div class="twentytwenty-overlay" style={styles.overlay}>
                                    <div class="twentytwenty-before-label" data-content={beforeImageLabel}></div>
                                    <div class="twentytwenty-after-label" data-content={afterImageLabel}></div>
                                </div>
                                <div class="twentytwenty-handle" style={styles.handle} data-slider-offset={sliderOffset} ref={this.sliderHandle}>
                                    <span class="twentytwenty-left-arrow"></span>
                                    <span class="twentytwenty-right-arrow"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default BeforeAfterImages;
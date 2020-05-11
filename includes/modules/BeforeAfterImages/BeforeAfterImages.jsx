// External Dependencies
import React, { Component, Fragment } from 'react';

// Internal Dependencies
import './style.css';
import {createImageSrcAtSize} from './helpers.js';
import {generateStyles} from './helpers.js';
import {getOrientationClasses} from './helpers.js';

class Overlay extends Component{
    render(){
        return(
            <div class="twentytwenty-overlay" style={this.props.styles.overlay}>
                <div class="twentytwenty-before-label" data-content={this.props.labels.before}></div>
                <div class="twentytwenty-after-label" data-content={this.props.labels.after}></div>
            </div>
        );
    }
}
class Handle extends Component{
    render(){
        return(
            <div class="twentytwenty-handle" style={this.props.styles.handle} data-slider-offset={this.props.offset}>
                <span class="twentytwenty-left-arrow"></span>
                <span class="twentytwenty-right-arrow"></span>
            </div>
        );
    }
}
class BeforeAfterImages extends Component {

    static slug = 'baie_before_after_image';

    constructor(props){

        super(props);
        this.state = {
            bDimensions: {}, // Store before image dimensions.
            aDimensions: {} // Store after image dimensions.
        };
        this.onBeforeImgLoad = this.onBeforeImgLoad.bind(this);
        this.onAfterImgLoad = this.onAfterImgLoad.bind(this);
        this.onError = this.onError.bind(this);

        // Create callback refs
        this.container = React.createRef();
        this.module = React.createRef();
    }
    onBeforeImgLoad({ target: img }) {
        const dimensions = {
            beforeOffsetHeight: img.offsetHeight,
            beforeOffsetWidth: img.offsetWidth,
            beforeNaturalHeight: img.naturalHeight,
            beforeNaturalWidth: img.naturalWidth,
        }
        this.setState({
            bDimensions: dimensions
        });
    }
    onAfterImgLoad({ target: img }) {
        const dimensions = {
            afterOffsetHeight: img.offsetHeight,
            afterOffsetWidth: img.offsetWidth,
            afterNaturalHeight: img.naturalHeight,
            afterNaturalWidth: img.naturalWidth,
        }
        this.setState({
            aDimensions: dimensions
        });
    }
    onError({target: img}){
        console.log("Error for img...");
        console.log(img);
    }
    render() {
        
        /**
         * Get user-defined settings.
         */

        // Create images objects to store image source and other data.
        let beforeImage = new Image();
        let afterImage = new Image();

        // Get settings from props.
        beforeImage.src = this.props.src_before;
        afterImage.src = this.props.src_after;
        const labels = {
            before: this.props.label_before,
            after: this.props.label_after
        }
        const sliderOffset = {
            string: this.props.slider_offset,
            int:  parseInt(this.props.slider_offset)/100
        }
        const sizeSelected = this.props.size;
        const alignment = this.props.align;
        
        // Store the natural image dimensions from the current state.
        const { beforeOffsetWidth, beforeOffsetHeight, beforeNaturalWidth, beforeNaturalHeight  } = this.state.bDimensions;
        const { afterOffsetWidth, afterOffsetHeight, afterNaturalWidth, afterNaturalHeight  } = this.state.aDimensions;
     
        // Set width and height constants for the slider using whichever image is smaller.
        // Used in logic where the user selected the "Full size" size option.
        const fullSizeWidth = (beforeNaturalWidth <= afterNaturalWidth) ? beforeNaturalWidth : afterNaturalWidth;
        const fullSizeHeight = (beforeNaturalHeight <= afterNaturalHeight) ? beforeNaturalHeight : afterNaturalHeight;
        const offsetWidth = (beforeOffsetWidth <= afterOffsetWidth) ? beforeOffsetWidth : afterOffsetWidth;
        const offsetHeight = (beforeOffsetHeight <= afterOffsetHeight) ? beforeOffsetHeight : afterOffsetHeight;

        // Check if the user declined to select a size.
        const didSelectSize = ( sizeSelected === ( undefined || 'undefined' || 'selectasize.' ) ) ? false : true;
        
        // Check if the user selected "Full Size."
        const didSelectFullSize = ( sizeSelected === ( 'full' || 'fullsize.' ) ) ? true : false;

        // Initialize other variables.
        let selectedSizeAttributes = {
            width: 0,
            height: 0,
            didSelectFullSize: didSelectFullSize
        };
        let selectedWidth = ''; 
        let selectedHeight = '';
        let sizeClass = '';
        
        // Set some classes for the wrapper based on the image size.
        // These will be used by style.css.
        if( sizeSelected === 'undefined' || sizeSelected === 'selectasize.' ){
            sizeClass = 'sizeUndefined';
        } else if( sizeSelected === 'full' || sizeSelected === 'fullsize.' ){
            sizeClass = 'sizeFull';
        }
        
        /**
         * App logic to generate images.
         */
        
        // Reconstruct image URL to retrieve image at selected size.
        if ( didSelectSize === true && didSelectFullSize === false ){

            // Condition: User selected an image size other than "full size".
            
            // Get image URL at selected size, and extract width and height integers from selected size string.
            var beforeImageAtSize = createImageSrcAtSize( beforeImage.src, sizeSelected );
            var afterImageAtSize = createImageSrcAtSize( afterImage.src, sizeSelected )

            // Update the size variables with size integers.
            sizeClass = getOrientationClasses( beforeImage, afterImage, ['sizeFull'] );
            selectedWidth = beforeImageAtSize.width;
            selectedHeight = beforeImageAtSize.height;
            
            // Overwrite the size variables if the user selected a size that exceeds the bounds of the module div container. 
            if( this.module.current !== null ){

                if( selectedWidth > this.module.current.clientWidth ){
                    const orientation = (fullSizeWidth >= fullSizeHeight) ? 'landscape' : 'portrait';
                    const aspectRatio = (orientation === 'landscape') ? fullSizeHeight/fullSizeWidth : fullSizeWidth/fullSizeHeight;
                    selectedWidth =  this.module.current.clientWidth;
                    selectedHeight = Math.trunc( this.module.current.clientWidth * aspectRatio);
                }
            }

            // Check if image sources exist at the selected size. If so, update the source URL of the image obect.
            // If the URL points to a real image, the natural width will not be undefined.
            if( typeof(offsetWidth) !== ( undefined || null || 'undefined' ) ){
                beforeImage.src = beforeImageAtSize.url;
            } else{
                // The before image was available at the selected size, so add more logic for the app here to
                // mimic the front-end behavior of the app in this condition.
                sizeClass += 'sizeFull sizeFallback ';
            }
            if( typeof(fullSizeWidth) !== ( undefined || null || 'undefined' ) ){
                afterImage.src = afterImageAtSize.url;
            } else{
                sizeClass += 'sizeFull sizeFallback ';
            }

            // Update selectedSizeAttributes.
            selectedSizeAttributes.width = selectedWidth;
            selectedSizeAttributes.height = selectedHeight;

        } else if( didSelectSize === false && didSelectFullSize === false  ) {

            // Condition: User did not select an image size.

            // No size selected.
            sizeClass = getOrientationClasses( beforeImage, afterImage );
            selectedWidth = 376;
            selectedHeight = 225;

            // Update selectedSizeAttributes.
            selectedSizeAttributes.width = selectedWidth;
            selectedSizeAttributes.height = selectedHeight;

        } else{

            // Condition: User selected the "full size" image size option.

            sizeClass = getOrientationClasses( beforeImage, afterImage, ['sizeFull'] );

            // Set width and height variables to the natural dimensions of the image by default.
            selectedWidth = fullSizeWidth;
            selectedHeight = fullSizeHeight;

            // Adjust the size values if the full size image dimensions exceed the bounds of the module div container.
            if( this.module.current !== null ){

                if( selectedWidth > this.module.current.clientWidth ){
                    const orientation = (fullSizeWidth >= fullSizeHeight) ? 'landscape' : 'portrait';
                    const aspectRatio = (orientation === 'landscape') ? fullSizeHeight/fullSizeWidth : fullSizeWidth/fullSizeHeight;
                    selectedWidth =  this.module.current.clientWidth;
                    selectedHeight = Math.trunc( this.module.current.clientWidth * aspectRatio);
                }
            }

            // Update selectedSizeAttributes
            selectedSizeAttributes.width = selectedWidth;
            selectedSizeAttributes.height = selectedHeight;
        }

        // Styles
        var styles = generateStyles(
            alignment,
            selectedSizeAttributes,
            sliderOffset.int,
            sliderOffset.string
        );
        return (
            <Fragment>
                <div id="et-boc" className="baie-vb-module" ref={this.module}>
                    <ul>
                        <li>Full Size Width: {fullSizeWidth}</li>
                        <li>Full Size Height: {fullSizeHeight}</li>
                        <li>Before Offset Width: {beforeOffsetWidth}</li>
                        <li>Before Offset Height: {beforeOffsetHeight}</li>
                        <li>Before Natural Width: {beforeNaturalWidth}</li>
                        <li>Before Natural Height: {beforeNaturalHeight}</li>
                        <li>After Offset Width: {afterOffsetWidth}</li>
                        <li>After Offset Height: {afterOffsetHeight}</li>
                        <li>After Natural Width: {afterNaturalWidth}</li>
                        <li>After Natural Height: {afterNaturalHeight}</li>
                    </ul>
                    <ul>
                        <li>Before Image Width: {beforeImage.width}</li>
                        <li>Before Image Height: {beforeImage.height}</li>
                        <li>Before Image Natural Width: {beforeImage.naturalWidth}</li>
                        <li>Before Image Natural Height: {beforeImage.naturalHeight}</li>
                        <li>Before Image Offset Width: {beforeImage.offsetWidth}</li>
                        <li>Before Image Offset Height: {beforeImage.offsetHeight}</li>
                    </ul>
                    <div className="et-l">
                        <div className={"twentytwenty-wrapper twentytwenty-horizontal et_pb_image_wrap " + sizeClass} style={styles.wrapper}>
                            <div className="twentytwenty-container" style={styles.container} ref={this.container}>
                                <img
                                    onLoad={this.onBeforeImgLoad}
                                    onError={this.onError}
                                    src={beforeImage.src}
                                    alt="Before Image"
                                    className="twentytwenty-before"
                                    style={styles.beforeImage}
                                    width={selectedWidth}
                                    height={selectedHeight}
                                />
                                <img
                                    onLoad={this.onAfterImgLoad}
                                    onError={this.onError}
                                    src={afterImage.src}
                                    alt=""
                                    className="twentytwenty-after"
                                    style={styles.afterImage}
                                    width={selectedWidth}
                                    height={selectedHeight}
                                />
                                <Overlay styles={styles} labels={labels} />
                                <Handle styles={styles} offset={sliderOffset.int} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default BeforeAfterImages;
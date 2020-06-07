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
            aDimensions: {}, // Store after image dimensions.
            bCurrentSource: this.props.src_before,
            bFoundSource: null,
            aCurrentSource: this.props.src_after,
            aFoundSource: null,
            bError: false, // True if image missing at selected size.
            aError: false,
            bReloaded: false, // True if the image errored and reloaded at full size.
            aReloaded: false,
            bSizeSelected: null,
            aSizeSelected: null
        };

        this.onBeforeImgLoad = this.onBeforeImgLoad.bind(this);
        this.onAfterImgLoad = this.onAfterImgLoad.bind(this);
        this.onBeforeImgError = this.onBeforeImgError.bind(this);
        this.onAfterImgError = this.onAfterImgError.bind(this);

        // Create callback refs
        this.container = React.createRef();
        this.module = React.createRef();
    }
    componentDidMount(){

    }
    onBeforeImgLoad( { target: img } ) {

        const bReloaded = (this.state.bError) ? true : false;
        const dimensions = {
            beforeOffsetHeight: img.offsetHeight,
            beforeOffsetWidth: img.offsetWidth,
            beforeNaturalHeight: img.naturalHeight,
            beforeNaturalWidth: img.naturalWidth,
        }
        this.setState({
            bDimensions: dimensions,
            bCurrentSource: this.props.src_before,
            bFoundSource: img.src,
            bError: false,
            bReloaded: bReloaded,
            bSizeSelected: this.props.size
        });
    }
    onAfterImgLoad( { target: img } ) {

        const aReloaded = (this.state.aError) ? true : false;
        const dimensions = {
            afterOffsetHeight: img.offsetHeight,
            afterOffsetWidth: img.offsetWidth,
            afterNaturalHeight: img.naturalHeight,
            afterNaturalWidth: img.naturalWidth,
        }
        this.setState({
            aDimensions: dimensions,
            aCurrentSource: this.props.src_after,
            aFoundSource: img.src,
            aError: false,
            aReloaded: aReloaded,
            aSizeSelected: this.props.size
        });
    }
    onBeforeImgError( {target: img} ){
        this.setState({
            bFoundSource: null,
            bError: true,
            bSizeSelected: this.props.size
        });
    }
    onAfterImgError( {target: img} ){
        this.setState({
            aFoundSource: null,
            aError: true,
            aSizeSelected: this.props.size
        });
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

        /**
         * Set the image object src URL to match the image src that the component
         * found if this state contains an image that was loaded successfully.
         */
        /*
        if( this.state.bFoundSource ){
            beforeImage.src = this.state.bFoundSource;
        }
        if( this.state.aFoundSource ){
            afterImage.src = this.state.aFoundSource;
        }*/

        // Get other props.
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

        /**
         * The image URL's will load/reload if beforeImageSizeChanged or afterImageSizeChange is true.
         * The image URL's should load when the component first renders, and whenever the image size selection changes.
         */
        // Set beforeImageSizeChanged = true and afterImageSizeChanged = true when the component first renders.
        let beforeImageSizeChanged = true;
        let afterImageSizeChanged = true;

        if( this.state.bSizeSelected ){
            
            // Update these values conditionally if this.state contains a bSizeSeleted attribute.
            beforeImageSizeChanged = ( sizeSelected === this.state.bSizeSelected ) ? false : true;
        }
        
        if( this.state.aSizeSelected ){
            
            // Update these values conditionally if this.state contains an aSizeSelected attribute.
            afterImageSizeChanged = ( sizeSelected === this.state.aSizeSelected ) ? false : true;
        }

        /**
         * 
         */
        const beforeImageChanged = ( this.props.src_before !== this.state.bCurrentSource ) ? true : false;
        const afterImageChanged = ( this.props.src_after !== this.state.aCurrentSource ) ? true : false;

        // Store the natural image dimensions from the current state.
        const { beforeOffsetWidth, beforeOffsetHeight, beforeNaturalWidth, beforeNaturalHeight  } = this.state.bDimensions;
        const { afterOffsetWidth, afterOffsetHeight, afterNaturalWidth, afterNaturalHeight  } = this.state.aDimensions;
        const moduleSizes = {
            before: {
                offsetWidth: beforeOffsetWidth,
                naturalWidth: beforeNaturalWidth,
                offsetHeight: beforeOffsetHeight,
                naturalHeight: beforeNaturalHeight
            },
            after: {
                offsetWidth: afterOffsetWidth,
                naturalWidth: afterNaturalWidth,
                offsetHeight: afterOffsetHeight,
                naturalHeight: afterNaturalHeight
            },
            // Set width and height constants for the slider using the dimensions of whichever image is smaller.
            slider: {
                fullSizeWidth: (beforeNaturalWidth <= afterNaturalWidth) ? beforeNaturalWidth : afterNaturalWidth,
                fullSizeHeight: (beforeNaturalHeight <= afterNaturalHeight) ? beforeNaturalHeight : afterNaturalHeight,
                offsetWidth:  (beforeOffsetWidth <= afterOffsetWidth) ? beforeOffsetWidth : afterOffsetWidth,
                offsetHeight: (beforeOffsetHeight <= afterOffsetHeight) ? beforeOffsetHeight : afterOffsetHeight,
            }
        }
        
        // Initialize variables for error handling.
        const beforeImageError = this.state.bError ? true : false;
        const afterImageError = this.state.aError ? true : false;
        const beforeImageReloaded = this.state.bReloaded ? true : false;
        const afterImageReloaded = this.state.aReloaded ? true : false;
        
        // Check if the user declined to select a size.
        const didSelectSize = (sizeSelected === undefined || sizeSelected === 'undefined' || sizeSelected === 'selectasize.') 
                            ? false 
                            : true;
        
        // Check if the user selected "Full Size."
        const didSelectFullSize = ( sizeSelected === 'full' || sizeSelected === 'fullsize.' )
                                ? true 
                                : false;

        // Initialize other variables.
        let selectedSizeAttributes = {
            width: 0,
            height: 0,
            didSelectFullSize: didSelectFullSize
        };
        let selectedWidth = ''; 
        let selectedHeight = '';
        let classes = {}
        
        /** 
         * Set some classes for the wrapper based on the image size.
         * These will be used by style.css.
         * */
        if( sizeSelected === 'undefined' || sizeSelected === 'selectasize.' ){
            classes.size = 'sizeUndefined';
        } else if( sizeSelected === 'full' || sizeSelected === 'fullsize.' ){
            classes.size = 'sizeFull';
        }
        
        /**
         * App logic to generate images at size.
         */
        
        // Reconstruct image URL to retrieve image at selected size.
        if ( didSelectSize === true && didSelectFullSize === false ){

            // Condition: User selected an image size other than "full size".
            
            // Get image URL at selected size, and extract width and height integers from selected size string.
            var beforeImageAtSize = createImageSrcAtSize( beforeImage.src, sizeSelected );
            var afterImageAtSize = createImageSrcAtSize( afterImage.src, sizeSelected );
            
            /**
             * Update the size variables with size integers.
             * Either beforeImageAtSize.width or afterImageAtSize.width can be used here.
             * Here, beforeImageAtSize.width is based on sizeSelected, not the natural image dimensions.
             */
            selectedWidth = beforeImageAtSize.width;
            selectedHeight = beforeImageAtSize.height;
            classes.size = getOrientationClasses( selectedWidth, selectedHeight, moduleSizes );

            /**
             * Update the source URL of the image obect if image sources exist at the selected size.
             * beforeImageError === false if the image sources exist at the selected size.
             * */
            if( beforeImageError === false && beforeImageSizeChanged === true ){
                beforeImage.src = beforeImageAtSize.url;
            } else if( beforeImageChanged === false && this.state.bFoundSource ){
                beforeImage.src = this.state.bFoundSource;
                classes.size += ' sizeFull imgReloaded ';
            } else{
                classes.size += ' sizeFull imgReloaded ';
            }

            if( afterImageError === false && afterImageSizeChanged === true ){
                afterImage.src = afterImageAtSize.url;
            } else if( afterImageChanged === false && this.state.aFoundSource ){
                afterImage.src = this.state.aFoundSource;
            } else{
                classes.size += ' sizeFull imgReloaded ';
            }

            /**
             * Set width and height variables to the natural (full-size) dimensions of the smaller
             * of the two images if both of the following conditions are true:
             * #1) Either the before or after image is unavailable at the selected size (image errored and reloaded).
             * #2) The width of the selected size is greater than the width of the smaller of the two images at full-size.
             */
            if( ( beforeImageReloaded === true || afterImageReloaded === true ) && (selectedWidth > moduleSizes.slider.fullSizeWidth) ){
                selectedWidth = moduleSizes.slider.fullSizeWidth;
                selectedHeight = moduleSizes.slider.fullSizeHeight;
            }
            
            /**
             * Set the width and height variables in proportion to the dimensions of the module div container
             * If the user selected a size that exceeds the bounds of the module div container.
             * */
            if( this.module.current !== null ){

                if( selectedWidth > this.module.current.clientWidth ){
                    const orientation = (moduleSizes.slider.fullSizeWidth >= moduleSizes.slider.fullSizeHeight)
                                        ? 'landscape' 
                                        : 'portrait';
                    const aspectRatio = (orientation === 'landscape') 
                                        ? moduleSizes.slider.fullSizeHeight/moduleSizes.slider.fullSizeWidth 
                                        : moduleSizes.slider.fullSizeWidth/moduleSizes.slider.fullSizeHeight;
                    selectedWidth = this.module.current.clientWidth;
                    selectedHeight = Math.trunc( this.module.current.clientWidth * aspectRatio);
                }
            }

            // Update selectedSizeAttributes.
            selectedSizeAttributes.width = selectedWidth;
            selectedSizeAttributes.height = selectedHeight;

        } else if( didSelectSize === false && didSelectFullSize === false  ) {

            // Condition: User did not select an image size.

            // No size selected.
            selectedWidth = 376;
            selectedHeight = 225;
            classes.size = getOrientationClasses(  selectedWidth, selectedHeight, moduleSizes );

            // Update selectedSizeAttributes.
            selectedSizeAttributes.width = selectedWidth;
            selectedSizeAttributes.height = selectedHeight;

        } else{

            // Condition: User selected the "full size" image size option.

            // Set width and height variables to the natural dimensions of the image by default.
            selectedWidth = moduleSizes.slider.fullSizeWidth;
            selectedHeight = moduleSizes.slider.fullSizeHeight;
            classes.size = getOrientationClasses( selectedWidth, selectedHeight, moduleSizes, ['sizeFull'] );

            /**
             * If the natural width of the image at full size is greater than the width of the module div
             * container, set the selected width and height in proportion to the dimensions of the container.
             */
            if( this.module.current !== null ){

                if( selectedWidth > this.module.current.clientWidth ){
                    const orientation = (moduleSizes.slider.fullSizeWidth >= moduleSizes.slider.fullSizeHeight) ? 'landscape' : 'portrait';
                    const aspectRatio = (orientation === 'landscape') ? moduleSizes.slider.fullSizeHeight/moduleSizes.slider.fullSizeWidth : moduleSizes.slider.fullSizeWidth/moduleSizes.slider.fullSizeHeight;
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
        const bErrorStr = (beforeImageError) ? "True" : "False";
        const aErrorStr = (afterImageError) ? "True" : "False";
        return (
            <Fragment>
                <div id="et-boc" className="baie-vb-module" ref={this.module}>
                    <div className="et-l">
                        <div className={"twentytwenty-wrapper twentytwenty-horizontal et_pb_image_wrap " + classes.size} style={styles.wrapper}>
                            <div className="twentytwenty-container" style={styles.container} ref={this.container}>
                                <img
                                    onLoad={this.onBeforeImgLoad}
                                    onError={this.onBeforeImgError}
                                    src={beforeImage.src}
                                    alt=""
                                    className="twentytwenty-before"
                                    style={styles.beforeImage}
                                    width={selectedWidth}
                                    height={selectedHeight}
                                />
                                <img
                                    onLoad={this.onAfterImgLoad}
                                    onError={this.onAfterImgError}
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
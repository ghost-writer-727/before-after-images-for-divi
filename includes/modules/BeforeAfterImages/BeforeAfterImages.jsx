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
            bError: false, // True if image missing at selected size.
            aError: false,
            bReloaded: false, // True if the image errored and reloaded at full size.
            aReloaded: false,
            bSizeSelected: this.props.size,
            aSizeSelected: this.props.size
        };
        this.onBeforeImgLoad = this.onBeforeImgLoad.bind(this);
        this.onAfterImgLoad = this.onAfterImgLoad.bind(this);
        this.onBeforeImgError = this.onBeforeImgError.bind(this);
        this.onAfterImgError = this.onAfterImgError.bind(this);

        // Create callback refs
        this.container = React.createRef();
        this.module = React.createRef();
    }
    onBeforeImgLoad({ target: img }) {
        const bReloaded = (this.state.bError) ? true : false;
        const dimensions = {
            beforeOffsetHeight: img.offsetHeight,
            beforeOffsetWidth: img.offsetWidth,
            beforeNaturalHeight: img.naturalHeight,
            beforeNaturalWidth: img.naturalWidth,
        }
        this.setState({
            bDimensions: dimensions,
            bError: false,
            bReloaded: bReloaded,
            bSizeSelected: this.props.size
        });
        console.log("BEFORE IMAGE FOUND.");
        console.log("IMAGE SRC." + img.src);
        console.log("SET bERROR to false.");
    }
    onAfterImgLoad({ target: img }) {
        const aReloaded = (this.state.aError) ? true : false;
        const dimensions = {
            afterOffsetHeight: img.offsetHeight,
            afterOffsetWidth: img.offsetWidth,
            afterNaturalHeight: img.naturalHeight,
            afterNaturalWidth: img.naturalWidth,
        }
        this.setState({
            aDimensions: dimensions,
            aError: false,
            aReloaded: aReloaded,
            aSizeSelected: this.props.size
        });
        console.log("AFTER IMAGE FOUND.");
        console.log("IMAGE SRC. " + img.src);
        console.log("SET aERROR to false.");
    }
    onBeforeImgError({target: img}){
        console.log("BEFORE IMAGE ERROR.");
        console.log("IMAGE SRC. " + img.src);
        this.setState({
            bError: true,
            bSizeSelected: this.props.size
        });
        console.log("SET bERROR to true.");
    }
    onAfterImgError({target: img}){
        console.log("AFTER IMAGE ERROR.");
        console.log("IMAGE SRC. " + img.src);
        this.setState({
            aError: true,
            aSizeSelected: this.props.size
        });
        console.log("SET aERROR to true.");
    }
    render() {
        
        /**
         * Get user-defined settings.
         */
        console.log("THIS.STATE");
        console.log(this.state);

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

        const beforeImageSizeChanged = ( sizeSelected === this.state.bSizeSelected ) ? false : true;
        const afterImageSizeChanged = ( sizeSelected === this.state.aSizeSelected ) ? false : true;
        
        // Store the natural image dimensions from the current state.
        const { beforeOffsetWidth, beforeOffsetHeight, beforeNaturalWidth, beforeNaturalHeight  } = this.state.bDimensions;
        const { afterOffsetWidth, afterOffsetHeight, afterNaturalWidth, afterNaturalHeight  } = this.state.aDimensions;
        
        const beforeImageError = this.state.bError ? true : false;
        const afterImageError = this.state.aError ? true : false;
        const beforeImageReloaded = this.state.bReloaded ? true : false;
        const afterImageReloaded = this.state.aReloaded ? true : false;
        
        /**
         *  Set width and height constants for the slider using whichever image is smaller.
         * Used in logic where the user selected the "Full size" size option.
         * */
        const fullSizeWidth = (beforeNaturalWidth <= afterNaturalWidth) ? beforeNaturalWidth : afterNaturalWidth;
        const fullSizeHeight = (beforeNaturalHeight <= afterNaturalHeight) ? beforeNaturalHeight : afterNaturalHeight;
        const offsetWidth = (beforeOffsetWidth <= afterOffsetWidth) ? beforeOffsetWidth : afterOffsetWidth;
        const offsetHeight = (beforeOffsetHeight <= afterOffsetHeight) ? beforeOffsetHeight : afterOffsetHeight;

        // Check if the user declined to select a size.
        const didSelectSize = (sizeSelected === undefined || sizeSelected === 'undefined' || sizeSelected === 'selectasize.') ? false : true;
        
        // Check if the user selected "Full Size."
        const didSelectFullSize = ( sizeSelected === 'full' || sizeSelected === 'fullsize.' ) ? true : false;

        // Initialize other variables.
        let selectedSizeAttributes = {
            width: 0,
            height: 0,
            didSelectFullSize: didSelectFullSize
        };
        let selectedWidth = ''; 
        let selectedHeight = '';
        let sizeClass = '';
        
        /** 
         * Set some classes for the wrapper based on the image size.
         * These will be used by style.css.
         * */
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

            console.log("SELECTED WIDTH...." + selectedWidth);
            console.log("SELECTED HEIGHT...." + selectedHeight);
            if( beforeImageSizeChanged === true ){

                console.log(".....Before Image size changed.....");
            } else{

                console.log(".....Before Image size did not change.....");
            }
            if( afterImageSizeChanged === true ){

                console.log(".....After Image size changed.....");
            } else{

                console.log(".....After Image size did not change.....");
            }

            /**
             * Check if image sources exist at the selected size. If so, update the source URL of the image obect.
             * If the image source does not exist at the selected size, beforeImageError will be true, 
             * and the URL will not update.
             * */
            if( beforeImageError === false && beforeImageSizeChanged === true ){

                beforeImage.src = beforeImageAtSize.url;
                console.log("beforeImage.src is " + beforeImage.src);
            } else{
                console.log("beforeImage.src is " + beforeImage.src);
                sizeClass += 'sizeFull sizeFallback ';
            }
            if( afterImageError === false && afterImageSizeChanged === true ){
                afterImage.src = afterImageAtSize.url;
                console.log("afterImage.src is " + afterImage.src);
            } else{
                console.log("afterImage.src is " + afterImage.src);
                sizeClass += 'sizeFull sizeFallback ';
            }

            /**
             * If either image is unavailable at the requested size, set width and height variables 
             * to the natural dimensions of the smallest image.
             * */
            if( ( beforeImageReloaded === true || afterImageReloaded === true ) && (selectedWidth > fullSizeWidth) ){
                selectedWidth = fullSizeWidth;
                selectedHeight = fullSizeHeight;
            }
            
            /**
             * If the user selected a size that exceeds the bounds of the module div container, 
             * set width and height variables in proportion to the dimensions of the module div container.
             * */
            if( this.module.current !== null ){

                if( selectedWidth > this.module.current.clientWidth ){
                    const orientation = (fullSizeWidth >= fullSizeHeight) ? 'landscape' : 'portrait';
                    const aspectRatio = (orientation === 'landscape') ? fullSizeHeight/fullSizeWidth : fullSizeWidth/fullSizeHeight;
                    selectedWidth =  this.module.current.clientWidth;
                    selectedHeight = Math.trunc( this.module.current.clientWidth * aspectRatio);
                }
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
        const bErrorStr = (beforeImageError) ? "True" : "False";
        const aErrorStr = (afterImageError) ? "True" : "False";
        return (
            <Fragment>
                <div id="et-boc" className="baie-vb-module" ref={this.module}>
                    <ul>
                        <li>Before Image Error: {bErrorStr}</li>
                        <li>After Image Error: {aErrorStr}</li>
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
                                    onError={this.onBeforeImgError}
                                    src={beforeImage.src}
                                    alt="Before Image"
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
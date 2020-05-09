// External Dependencies
import React, { Component, Fragment } from 'react';

// Internal Dependencies
import './style.css';
import {createImageSrcAtSize} from './helpers.js';
import {generateStyles} from './helpers.js';
import {getOrientationClasses} from './helpers.js';

class Image extends Component{
    render(){
        return(
            <img
                onLoad={this.props.onLoad}
                src={this.props.src}
                alt={this.props.alt}
                className={this.props.className}
                style={this.props.style}
                width={this.props.width}
                height={this.props.height}
            />
        );
    }
}
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
            bDimensions: {}, // Before Image
            aDimensions: {} // After Image
        };
        this.onBeforeImgLoad = this.onBeforeImgLoad.bind(this);
        this.onAfterImgLoad = this.onAfterImgLoad.bind(this);

        // Create callback refs
        this.container = React.createRef();
    }
    onBeforeImgLoad({ target: img }) {
        this.setState({
            bDimensions: {
                beforeOffsetHeight: img.offsetHeight,
                beforeOffsetWidth: img.offsetWidth,
                beforeNaturalHeight: img.naturalHeight,
                beforeNaturalWidth: img.naturalWidth,
            }
        });
    }
    onAfterImgLoad({ target: img }) {
        this.setState({
            aDimensions: {
                afterOffsetHeight: img.offsetHeight,
                afterOffsetWidth: img.offsetWidth,
                afterNaturalHeight: img.naturalHeight,
                afterNaturalWidth: img.naturalWidth,
            }
        });
    }
    render() {

        // Create images objects from user input: image source.
        var beforeImage = new Image();
        var afterImage = new Image();
        beforeImage.src = this.props.src_before;
        afterImage.src = this.props.src_after;
        
        // Store the natural image dimensions.
        const { beforeOffsetWidth, beforeOffsetHeight, beforeNaturalWidth, beforeNaturalHeight  } = this.state.bDimensions;
        const { afterOffsetWidth, afterOffsetHeight, afterNaturalWidth, afterNaturalHeight  } = this.state.aDimensions;

        // Used in logic where the user selected the "Full size" size option.
        const fullSizeWidth = (beforeNaturalWidth <= afterNaturalWidth) ? beforeNaturalWidth : afterNaturalWidth;
        const fullSizeHeight = (beforeNaturalHeight <= afterNaturalHeight) ? beforeNaturalHeight : afterNaturalHeight;
        //const fullSizeWidth = imgNaturalWidth;
        //const fullSizeHeight = imgNaturalHeight;
        
        // Get labels from props.
        const labels = {
            before: this.props.label_before,
            after: this.props.label_after
        }

        // Get slider offset from props.
        const sliderOffset = {
            string: this.props.slider_offset,
            int:  parseInt(this.props.slider_offset)/100
        }

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
            // If the URL points to a real image, the natural width will not be undefined.
            if( typeof(beforeImage.naturalWidth) !== 'undefined' ){
                beforeImage.src = beforeImageAtSize.url;
            } else{
                // The before image was available at the selected size, so add more logic for the app here to
                // mimic the front-end behavior of the app in this condition.
                sizeClass += 'sizeFull sizeFallback ';
            }
            if( typeof(afterImage.naturalWidth) !== 'undefined'  ){
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
            sliderOffset.int,
            sliderOffset.string
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
            styles.beforeImage.clip = 'rect(0px, ' + (width*sliderOffset.int) + 'px, ' + height + 'px, 0px)'
            styles.afterImage.height = height;
            styles.afterImage.clip = 'rect(0px, ' + width + 'px, ' + height + 'px, ' + (width*sliderOffset.int) + 'px)'
        }
        return (
            <Fragment>
                <div id="et-boc">
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
                    <div class="et-l">
                        <div class={wrapperClasses} style={styles.wrapper} ref={this.wrapper}>
                            <div class={containerClasses} style={styles.container} ref={this.container}>
                                <Image
                                    onLoad = {this.onBeforeImgLoad}
                                    src={beforeImage.src}
                                    alt=""
                                    className="twentytwenty-before"
                                    style={styles.beforeImage}
                                    width={selectedWidth}
                                    height={selectedHeight}
                                />
                                <Image
                                    onLoad = {this.onAfterImgLoad}
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
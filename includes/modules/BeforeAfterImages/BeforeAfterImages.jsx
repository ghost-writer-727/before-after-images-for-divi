// External Dependencies
import React, { Component, Fragment } from 'react';

// Internal Dependencies
import './style.css';

class BeforeAfterImages extends Component {

    static slug = 'baie_before_after_image';

    constructor(props){
        super(props);
        
        // Get user input: slider offset.
        var sliderOffset = parseInt(this.props.slider_offset)/100;
        
        // Create "callback refs"
        this.twentyTwentyElement = null;
        this.twentyTwentyBefore = null;
        this.twentyTwentyAfter = null;
        this.twentyTwentyHandle = null;
        
        this.setTwentyTwentyElementRef = element => {
            this.twentyTwentyElement = element;
        }
        this.setTwentyTwentyContainerRef = element => {
            this.twentyTwentyContainer = element;
        }
        this.setTwentyTwentyBeforeRef = element => {
            this.twentyTwentyBefore = element;
        }
        this.setTwentyTwentyAfterRef = element => {
            this.twentyTwentyAfter = element;
        }
        this.setTwentyTwentyHandleRef = element => {
            this.twentyTwentyHandle = element;
        }
        
        // Update Before & After image
        this.updateTwentyTwenty = () => {
            if( this.twentyTwentyElement ){
                
                // Reset width of wrapper
                this.twentyTwentyElement.style.width = '100%';
                
                // Set container background to display 'size not found' (visible if image is unavailable).
                this.twentyTwentyContainer.style.background = 'url(//placeholder.pics/svg/376x220/DEDEDE/555555/Select%20Image%20&%20Size.) top left no-repeat';
                
                // Get wrapper width
                var twentyTwentyWrapperWidth = this.twentyTwentyElement.offsetWidth;
                
                // Get width and height of images.
                var twentyTwentyBeforeWidth = this.twentyTwentyBefore.naturalWidth;
                var twentyTwentyBeforeHeight = this.twentyTwentyBefore.naturalHeight;
                
                // Create dynamic width and height references
                var twentyTwentyWidth = twentyTwentyBeforeWidth;
                var twentyTwentyHeight = twentyTwentyBeforeHeight;
                
                // The Before image will have had the same width and height attributes as the After image (see render() code).
                var twentyTwentySizeSelectedWidth = this.twentyTwentyBefore.getAttribute( "width");
                var twentyTwentySizeSelectedHeight = this.twentyTwentyBefore.getAttribute( "height");
                
                // If "before" image width is 0, set arbitrary default width.
                if( twentyTwentyBeforeWidth === 0 ){
                    twentyTwentyWidth = '375';
                } 
                // If the "before" image width exceeds the wrapper width, set width reference to the wrapper width.
                if( twentyTwentyBeforeWidth > twentyTwentyWrapperWidth ){
                    twentyTwentyWidth = twentyTwentyWrapperWidth;
                }
                // If the current width reference (and thus both the "before" image width and the wrapper width) are greater than the selected size width, set width reference to the selected size width.
                if( ( twentyTwentyWidth > twentyTwentySizeSelectedWidth ) ){
                    twentyTwentyWidth = twentyTwentySizeSelectedWidth;
                }
                // If "before" image height is 0, set arbitrary default height.
                if( twentyTwentyBeforeHeight === 0 ){
                    twentyTwentyHeight = '220px';
                } else{
                    twentyTwentyHeight = 'auto';
                    // Remove "select size" background if at least one image has been selected.
                    this.twentyTwentyContainer.style.background = '';
                }
                
                // Set wrapper and container styles.
                this.twentyTwentyElement.style.width = twentyTwentyWidth + 'px';
                this.twentyTwentyContainer.style.width = twentyTwentyWidth + 'px';
                this.twentyTwentyContainer.style.height = twentyTwentyHeight;
                if(twentyTwentySizeSelectedHeight < twentyTwentyBeforeHeight ){
                    this.twentyTwentyContainer.style.paddingBottom = (twentyTwentySizeSelectedHeight/twentyTwentySizeSelectedWidth) * 100 + '%';
                } else{
                    this.twentyTwentyContainer.style.paddingBottom = (this.twentyTwentyBefore.naturalHeight/this.twentyTwentyBefore.naturalWidth) * 100 + '%';
                }
                
                // Set "before" image styles.
                this.twentyTwentyBefore.style.clip = 'rect(0px, ' + (twentyTwentyWidth*sliderOffset) + 'px, ' + this.twentyTwentyContainer.offsetHeight + 'px, 0px)';
                this.twentyTwentyBefore.style.height = twentyTwentyHeight;
                
                // Set "after" image styles.
                this.twentyTwentyAfter.style.clip = 'rect(0px, ' + twentyTwentyWidth + 'px, ' + this.twentyTwentyContainer.offsetHeight + 'px, ' + (twentyTwentyWidth*sliderOffset) + 'px)';
                this.twentyTwentyAfter.style.height = twentyTwentyHeight;
                
                // Set handle styles.
                sliderOffset = this.twentyTwentyHandle.getAttribute('data-slider-offset');
                this.twentyTwentyHandle.style.left = twentyTwentyWidth*sliderOffset + 'px';
            }
        }
    }

    componentDidMount(){
        this.updateTwentyTwenty();
    }

    componentDidUpdate(){
        this.updateTwentyTwenty();
    }

    render() {
        
        // Get user input: image source.
        var beforeImageSource = this.props.src_before;
        var afterImageSource = this.props.src_after;
        
        // Get user input: image labels.
        var beforeImageLabel = this.props.label_before;
        var afterImageLabel = this.props.label_after;
        
        // Get user input: slider offset.
        var sliderOffsetString = this.props.slider_offset;
        var sliderOffset = parseInt(sliderOffsetString)/100;
        
        // Get user input: image alignment.
        var imageAlignment = this.props.align;
        
        // Add default image labels is user input is blank.
        beforeImageLabel = (beforeImageLabel === undefined || beforeImageLabel === 'undefined' || beforeImageLabel === '') ? "Before" : beforeImageLabel;
        afterImageLabel = (afterImageLabel === undefined || afterImageLabel === 'undefined' || afterImageLabel === '') ? "After" : afterImageLabel;
        
        // Create images objects from input.
        var beforeImage = new Image();
        var afterImage = new Image();
        beforeImage.src = beforeImageSource;
        afterImage.src = afterImageSource;
        
        // Get user input: size.
        var sizeSelected = this.props.size;
        sizeSelected = (sizeSelected === undefined || sizeSelected === 'undefined' || sizeSelected === 'full' || sizeSelected === 'selectasize.') ? "Width: 376px. Height: 220px." : sizeSelected;
        var sizeSelectedWidth = ''; // initialize variables
        var sizeSelectedHeight = '';
        var beforeImageOrientation = '';
        var afterImageOrientation = '';
        
        // Set some classes for the wrapper based on image size.
        var sizeClass = '';
        if( sizeSelected === 'undefined' || sizeSelected === 'selectasize.' ){
            sizeClass = 'sizeUndefined';
        } else if( sizeSelected === 'full' || sizeSelected === 'fullsize.' ){
            sizeClass = 'sizeFull';
        }
        
        // Reconstruct image URL to retrieve image at selected size.
        if (sizeSelected !== 'fullsize.'){
            var sizeSelectedSplit = sizeSelected.split(".");
            sizeSelectedWidth = parseInt(sizeSelectedSplit[0].match(/\d+/)[0]);
            sizeSelectedHeight = parseInt(sizeSelectedSplit[1].match(/\d+/)[0]);
            
            // Before image.
            var beforeImageSourceParsed = document.createElement('a');
            beforeImageSourceParsed.href = beforeImageSource;
            var beforeImageSourcePathSplit = beforeImageSourceParsed.pathname.split(".");
            beforeImageSource = beforeImageSourceParsed.protocol + '//' + beforeImageSourceParsed.hostname + beforeImageSourcePathSplit[0] + '-' + sizeSelectedWidth + 'x' + sizeSelectedHeight + '.' + beforeImageSourcePathSplit[1];

            // After image.
            var afterImageSourceParsed = document.createElement('a');
            afterImageSourceParsed.href = afterImageSource;
            var afterImageSourcePathSplit = afterImageSourceParsed.pathname.split(".");
            afterImageSource = afterImageSourceParsed.protocol + '//' + afterImageSourceParsed.hostname + afterImageSourcePathSplit[0] + '-' + sizeSelectedWidth + 'x' + sizeSelectedHeight + '.' + afterImageSourcePathSplit[1];
            
            // Check if images exist at size. If not, use original image source. Set size class appropriately.
            beforeImage.src = beforeImageSource;
            afterImage.src = afterImageSource;
            
            beforeImageOrientation = (beforeImage.height > beforeImage.width) ? "before-portrait" : "before-landscape";
            afterImageOrientation = (afterImage.height > afterImage.width) ? "after-portrait" : "after-landscape";
            
            if( beforeImage.naturalWidth === 0 ){
                beforeImageSource = this.props.src_before;
                sizeClass = 'sizeFull sizeFallback ' + beforeImageOrientation;
            }
            if( afterImage.naturalWidth === 0 ){
                afterImageSource = this.props.src_after;
                sizeClass = 'sizeFull sizeFallback ' + afterImageOrientation;
            }
        } else{
            beforeImage.src = beforeImageSource;
            afterImage.src = afterImageSource;
            
            beforeImageOrientation = (beforeImage.height > beforeImage.width) ? "before-portrait" : "before-landscape";
            afterImageOrientation = (afterImage.height > afterImage.width) ? "after-portrait" : "after-landscape";
            sizeClass = 'sizeFull ' + beforeImageOrientation + ' ' + afterImageOrientation;
            
            sizeSelectedWidth = ( beforeImage.width > afterImage.width ) ? afterImage.width : beforeImage.width;
            sizeSelectedHeight = ( beforeImage.height > afterImage.height ) ? afterImage.width : beforeImage.width;
        }
        
        // Classes
        var twentyTwentyWrapperClasses = "twentytwenty-wrapper twentytwenty-horizontal et_pb_image_wrap " + sizeClass;
        var twentyTwentyContainerClasses = "twentytwenty-container";
        
        // Styles
        var twentyTwentyStyle = {
            width: '100%',
            marginTop: 0,
            marginRight: 'auto',
            marginBottom: 0,
            marginLeft: 'auto'
        }
        switch(imageAlignment){
            case("left"):
                twentyTwentyStyle.marginLeft = 0;
                break;
            case("right"):
                twentyTwentyStyle.marginRight = 0;
                break;
            default:
                break;
        }
        var containerStyle = {
            maxWidth: '100%',
            height: sizeSelectedHeight + 'px'
        }
        var beforeImageStyle = {
            height: sizeSelectedHeight + 'px',
            clip: 'rect(0px, ' + (sizeSelectedWidth*sliderOffset) + 'px, ' + sizeSelectedHeight + 'px, 0px)'
        }
        var afterImageStyle = {
            height: sizeSelectedHeight + 'px',
            clip: 'rect(0px, ' + sizeSelectedWidth + 'px, ' + sizeSelectedHeight + 'px, ' + (sizeSelectedWidth*sliderOffset) + 'px)'
        }
        var overlayStyle = {
            width: sizeSelectedWidth + 'px',
            maxWidth: '100%'
        }
        var handleStyle = {
            left: sliderOffsetString
        }
        return (
            <Fragment>
                <div class={twentyTwentyWrapperClasses} style={twentyTwentyStyle} ref={this.setTwentyTwentyElementRef}>
                    <div class={twentyTwentyContainerClasses} style={containerStyle} ref={this.setTwentyTwentyContainerRef}>
                        <img
                            src={beforeImageSource}
                            alt=""
                            class="twentytwenty-before"
                            style={beforeImageStyle}
                            width={sizeSelectedWidth}
                            height={sizeSelectedHeight}
                            ref={this.setTwentyTwentyBeforeRef} 
                        />
                        <img
                            src={afterImageSource}
                            alt=""
                            class="twentytwenty-after"
                            style={afterImageStyle}
                            width={sizeSelectedWidth}
                            height={sizeSelectedHeight}
                            ref={this.setTwentyTwentyAfterRef}
                        />
                        <div class="twentytwenty-overlay" style={overlayStyle}>
                            <div class="twentytwenty-before-label" data-content={beforeImageLabel}></div>
                            <div class="twentytwenty-after-label" data-content={afterImageLabel}></div>
                        </div>
                        <div class="twentytwenty-handle" style={handleStyle} data-slider-offset={sliderOffset} ref={this.setTwentyTwentyHandleRef}>
                            <span class="twentytwenty-left-arrow"></span>
                            <span class="twentytwenty-right-arrow"></span>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default BeforeAfterImages;
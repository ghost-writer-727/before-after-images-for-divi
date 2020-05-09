=== Before + After Images for Divi ===
Contributors: boltonstudios
Donate link: http://ko-fi.com/boltonstudios
Tags: divi, before, after, slider, comparison
Requires at least: 4.6.0
Tested up to: 5.4.1
Requires PHP: 7.1
Stable tag: 1.3.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Create before-and-after image sliders in the Divi Visual Builder easily.

== Description ==

Create before-and-after image sliders in Divi easily with *Before + After Images for Divi*.

* Compatible with the Visual Builder.
* Supports cropped image sizes (image size selection).
* Mobile responsive.
* Lightweight.

= Requirements =

This plugin is designed to work with the Divi Builder plugin or a theme such as Divi or Extra by [Elegant Themes](https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=48997&tid1=baie) (affiliate link).

= My Plugins for Divi =

* [Before + After Images for Divi](https://wordpress.org/plugins/before-after-images-for-divi/)
* [Image Size Selection for Divi](https://wordpress.org/plugins/image-size-selection-for-divi/)

= Supporting Before + After Images for Divi =

If you found this free plugin helpful, please support the developer with a small donation:

* [Buy me a coffee](http://ko-fi.com/boltonstudios)

= Credit =

Plugin created by Aaron Bolton. *Before + After Images for Divi* brings the power of [TwentyTwenty by ZURB](https://zurb.com/playground/twentytwenty) to your Divi Builder installation.

== Installation ==

1. Upload *before-after-images-for-divi* to the /wp-content/plugins/ directory.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. Add a new **Before + After Images* module to any Page or Post that uses the Divi Builder.
4. Add a **Before** image and an **After** image to the module.
5. Select an image size in the module under the **Advanced** tab.
6. Click the green check to save the module.
7. Click the green **Save** button in the lower right-hand corner of the screen to Save changes.

== Screenshots ==

1. Visual Builder module.
2. Image size selection.

== Changelog ==

= 1.3.3 =
* Bug Fix: Visual Builder module will render full-size image sliders upon on image load rather than waiting for the component to re-render.
* Bug Fix: Fixed bug that caused slider handle to misalign with image clipping.

= 1.3.2 =
* Bug Fix: Fixed typos in text domain that affected internationalization.

= 1.3.1 =
* Bug Fix: Fixed error that caused overlay to extend beyond images on the front-end.
* Bug Fix: Fixed error affecting extra large (scaled) images in the Visual Builder.
* Bug Fix: Edit miscellaneous functions in BeforeAfterIMages.jsx to improve the plugin's Visual Builder module.
* Bug Fix: Fixed '$size missing index' error that could appear when WP_DEBUG is true.
* New Feature: Added internationalization for more Visual Builder options.

= 1.3.0 =
* Update: Improved stability, readability and organization of codebase by rewriting many functions.
* New Feature: Added attributes to images to support new lazy load exclusions.
* New Feature: Replaced placeholder image with default Divi image SVG placeholder.
* Tested for compatibility with latest versions of Divi and WordPress.

= 1.2.3 =
* Bug Fix: Fixed multiple errors shown when WP_DEBUG is set to 'true'.

= 1.2.2 =
* Bug Fix: The composite image will now obey the Image Alignment setting in the Divi module.

= 1.2.1 =
* Bug Fix: Fixed image loading order on front-end and back-end (Visual Builder).
* Bug Fix: Hid srcset and size attributes if none are returned to improve W3C validation.

= 1.2.0 =
* New Feature: Change the default position of the slider.
* Acknowledgements: Thank you to @jasonbear on WordPress.org for testing, feature feedback and bug reports.
* Bug Fix: Fixed W3C validation error due to a missing numerical value (i.e., "$size_width" is not parsing).
* Bug Fix: Removed http:// prefix on placeholder image URL to prevent non-secure image from breaking SSL in Visual Builder.
* Bug Fix: Miscellaneous fixes related to lazy load support.

= 1.1.1 =
* Feature Update: Added support for lazy loading scripts. Loading Before + After images will now be properly deferred.

= 1.1.0 =
* New Feature: Change the "Before" and "After" label text
* Bug Fix: Improved compatibility with Jetpack, a3 Lazy Load, and Lazy Load by WP Rocket

= 1.0.0 =
* Initial Release
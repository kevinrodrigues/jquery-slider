/*===============================
@Author: Kevin Rosario Rodrigues
@Email: kevrodrigues116@gmail.com
================================*/

// window & document allows local access to these elemnts.
// undefined is undefined no need to reference at the bottom of
// (jquery) this creates a local scope within the plugin as the first
// line suggests.

;(function($, window, document, undefined){
    $.jQuerySlider = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("jQuerySlider", base);
        
        base.init = function(){
            if( typeof( radius ) === "undefined" || radius === null ) radius = "20px";
            
            base.radius = radius;
            
            base.options = $.extend({},$.jQuerySlider.defaultOptions, options);
            
            // Put your initialization code here
        };
        
        // Sample Function, Uncomment to use
        // base.functionName = function(paramaters){
        //
        // };
        
        // Run initializer
        base.init();
    };
    
    $.jQuerySlider.defaultOptions = {
        radius: "20px"
    };
    
    $.fn.jQuerySlider = function(radius, options){
        return this.each(function(){
            (new $.jQuerySlider(this, radius, options));

            // Begin plugin code

        });
    };
    
})(jQuery, window, document);
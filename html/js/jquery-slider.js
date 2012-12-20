/*==========================================
Author: Kevin Rosario Rodrigues
Requires: jQuery v1.3.2 or later
e: kevrodrigues116@gmail.com
*==========================================*/

(function ($, window, document, undefined) {
    $.fn.extend({
        jquerySlider: function (o) {
            
            // overwrite defaults below in your .js file
            var defaults = {
                speed:  1200,            // set your speed in m-seconds
                pause_control: false,    // set to true to stop auto play
                pause_show : true,       // set to false to hide pause/play button
                indicator : true,        // set to false to hide indicators
                navControl: true,        // set to false to hide next/prev controls
                next_btn: null,          // set your next slide button name
                prev_btn: null,          // set your prev slide button name
                widthImg: '952px',       // set your width for img
                heightImg: '368px',      // set your height for img
                animation: 'fade'        // default is fade, you can extend option with jquery ui here e.g bounce etc
                                         // tested animation: shake, bounce, pulsate
            },

                // rename markup here if required
                $slider_pause = $('#slider_pause'),         // pause button
                $slider = $('#slider'),                     // slider holder
                $navControl = $('.nav-controls'),            // next/prev buttons
                $slider_controls = $('#slider_controls');   // slider controls
             
            o = $.extend(defaults, o);
            
            return this.each(function () {

                // checks to see if element exists
                if (!$(this).length) {
                    // if not exit
                    return;
                }

                // setting width/height of slider img
                if ($(this).length && !null || !undefined) {

                    $(this).find('img').css({position : 'absolute', left : 0, top : 0 });
                    o.widthImg = $(this).find('img').css('width', o.widthImg);
                    o.heightImg = $(this).find('img').css('height', o.heightIimg);

                }

                // option to have pause control on set to false in default
                // settings to overwrite if you want it off.
                if (o.pause_show === true) {
                    $slider_pause.show();
                } else {
                    $slider_pause.hide();
                }

                // option to have indicators off.
                if (o.indicator === true) {
                
                    $slider_controls.show();
                } else {
                    $slider_controls.hide();

                }

                // o for prev/next btns
                if (o.navControl === true) {

                    $navControl.show();
                } else {
                    $navControl.hide();

                }

                // begin fade
                function changeSlide(element) {

                    //stop the rotation if the user has interacted with controls
                    if (o.pause_control) {
                        return;
                    }

                    // if next element is within the li (?) then go to next li in the list
                    // else (:) go to first element.

                    var $nextel = $(element).next('li').length ?
                                   $(element).next('li') :
                                   $slider.find('li:first'),

                        $prevel = $(element).prev('li').length ?
                                   $(element).prev('li') :
                                   $slider.find('li:first'),


                    // find slider controls and test to see if there is a next li element to follow
                    // if not then loop back to the first element in the li.
                    $next_a = $slider_controls.find('a.activeSlide').parent('li').next('li').length ?
                                $slider_controls.find('a.activeSlide').parent('li').next('li').find('a') :
                                $slider_controls.find('a:first');

                    $slider_controls.find('a.activeSlide').removeClass('activeSlide');
                    $next_a.addClass('activeSlide');

                    // continue rotation after above code excutes
                    function next() {
                        changeSlide($nextel);
                    }


                    function fadeTransition() {
                        $(element).fadeOut(o.speed);

                        $($nextel).fadeIn(o.speed, function () {
                            //creates a delay
                            setTimeout(next, o.speed);
                        });
                    }

                    if (o.animation === 'fade') {

                        fadeTransition();

                    } else if (o.animation !== 'fade') {

                        $.ajax({
                            cache: true
                        });

                        // load external jquery ui if anything other then fade set for animation.
                        $.getScript("http://code.jquery.com/ui/1.9.2/jquery-ui.js").done(function () {
                            
                            var selectedEffect = o.animation;

                            //console.log(selectedEffect);
                            //alert(selectedEffect);

                            if (selectedEffect.match(/bounce/i)) {

                                $slider.effect('bounce', o.speed);
                                $(element).fadeOut(o.speed);
                                $($nextel).fadeIn(o.speed, function () {
                                    setTimeout(next, o.speed);

                                });

                            } else if (selectedEffect.match(/shake/i)) {
                                $slider.effect('shake', o.speed);
                                $(element).fadeOut(o.speed);
                                $($nextel).fadeIn(o.speed, function () {
                                    setTimeout(next, o.speed);

                                });
                            } else if (selectedEffect.match(/pulsate/i)) {
                                $slider.effect('pulsate', o.speed);
                                $(element).fadeOut(o.speed);
                                $($nextel).fadeIn(o.speed, function () {
                                    setTimeout(next, o.speed);

                                });
                            } else if (selectedEffect.match(/explode/i)) {
                                $slider.effect('explode', o.speed);
                                $(element).fadeOut(o.speed);
                                $($nextel).fadeIn(o.speed, function () {
                                    setTimeout(next, o.speed);

                                });
                            }

                        });


                    }

                    // next btn / prev functions
                    $(o.next_btn).click(function () {
                        changeSlide($nextel);
                    });

                    $(o.prev_btn).click(function () {
                        changeSlide($prevel);
                    });

                }

                // add click events/listener to controls
                $slider_controls.find('a').click(function () {

                    // find target a tag and show / fade out remaining with user set speed / default speed
                    $($(this).attr('href')).show(o.speed).siblings('li').fadeOut(o.speed);
                    $(this).addClass('activeSlide').parent('li').siblings('li').find('a').removeClass('activeSlide');
                    o.pause_control = false;
                    // no follow
                    return false;

                });

                // pause / play button
                $($slider_pause).click(function () {

                    // checking button status
                    if ($(this).html() === 'Pause') {
                        o.pause_control = true;
                        $(this).html('Play');
                    } else {

                        o.pause_control = false;
                        // start rotation
                        changeSlide($($slider).find('li:visible:first'));
                        $(this).html('Pause');

                    }

                    return false;

                });

                // non auto play setting
                if (o.pause_control === true) {

                    $slider_pause.html('Play');
                } else {
                    $slider_pause.html('Pause');

                }

                // hides all li elements apart from the first one.
                $slider.find('li:first').siblings('li').hide();

                $(window).load(function () {

                    changeSlide($slider.find('li:visible:first'));
                    
                });


            });
        }
    });

})(jQuery, window, document);
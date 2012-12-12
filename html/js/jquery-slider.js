/*==========================================
Author: Kevin Rosario Rodrigues
Requires: jQuery v1.3.2 or later
*==========================================*/

(function ($, window, document, undefined) {
    $.fn.extend({
        //plugin name - jquerySlider();
        jquerySlider: function (options) {
            
            // overwrite defaults in your .js file
            var defaults = {
                speed: 1200,             // set your speed in m-seconds
                pause_control: false,    // set to true to stop auto play
                pause_show : true,       // set to false to hide pause/play button
                indicator : true,        // set to false to hide indicators
                next_btn: null,          // set your next slide button name
                prev_btn: null,          // set your prev slide button name
                animation: null         // default is fade
            };
             
            options = $.extend(defaults, options);
            
            return this.each(function () {

                
                // begin plugin code

                //alert('working')

                // checks to see if element exists
                if (!$('#slider').length) {
                    // if not exit
                    return;
                }


                // option to have pause control on set to false in default
                // settings to overwrite if you want it off.
                if (options.pause_show === true) {
                
                   $('#slider_pause').show();
                } else {
                   $('#slider_pause').hide();
                }

                // option to have indicators off.
                if (options.indicator === true) {
                
                   $('#slider_controls').show();
                } else {
                   $('#slider_controls').hide();
                }
                   


                // begin fade
                function changeSlide(element) {

                    //stop the rotation if the user has interacted with controls
                    if (options.pause_control) {
                        return;
                    }

                    // if next element is within the li (?) then go to next li in the list
                    // else (:) go to first element.

                    var $next_li = $(element).next('li').length ?
                                   $(element).next('li') :
                                   $('#slider li:first'),

                        $prev_li = $(element).prev('li').length ?
                                   $(element).prev('li') :
                                   $('#slider li:first'),


                    // find slider controls and test to see if there is a next li element to follow
                    // if not then loop back to the first element in the li.
                        $next_a = $('#slider_controls a.activeSlide').parent('li').next('li').length ?
                                  $('#slider_controls a.activeSlide').parent('li').next('li').find('a') :
                                  $('#slider_controls a:first');




                    $('#slider_controls a.activeSlide').removeClass('activeSlide');
                    $next_a.addClass('activeSlide');

                    // continue rotation after above code excutes
                    function next() {
                        changeSlide($next_li);
                    }

                    $(element).fadeOut(options.speed);

                    $($next_li).fadeIn(options.speed, function () {

                        //creates a delay
                        setTimeout(next, options.speed);
                    });

                    $(options.next_btn).click(function () {
                        changeSlide($next_li);
                    });

                    $(options.prev_btn).click(function () {
                        changeSlide($prev_li);
                    });

                }




                // add click events/listener to controls

                $('#slider_controls a').click(function () {

                    // find target a tag and show / fade out remaining with user set speed / default speed
                    $($(this).attr('href')).show(options.speed).siblings('li').fadeOut(options.speed);

                    $(this).addClass('activeSlide').parent('li').siblings('li').find('a').removeClass('activeSlide');


                    //setTimeout(1000);

                    options.pause_control = true;
                    // no follow
                    
                    return false;

                });



                // pause / play button
                $('#slider_pause').click(function () {

                    // checking button status
                    if ($(this).html() === 'Pause') {

                        options.pause_control = true;

                        $(this).html('Play');

                    } else {

                        options.pause_control = false;

                    // start rotation
                        changeSlide('#slider li:visible:first');

                        $(this).html('Pause');

                    }

                    return false;

                });

                // non auto play setting
                if (options.pause_control === true) {
                    $('#slider_pause').html('Play');
                } else {
                    $('#slider_pause').html('Pause');
                }



                // hides all li elements apart from the first one.
                $('#slider li:first').siblings('li').hide();

                $(window).load(function () {
                    changeSlide($('#slider li:visible:first'));
                });


            });
        }
    });

})(jQuery, window, document);
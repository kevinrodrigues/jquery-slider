/*==============================
Author: Kevin Rosario Rodrigues
*==============================*/

(function($, window, document, undefined){
    $.fn.extend({
        //plugin name - jquerySlider();
        jquerySlider: function(options) {
 
            var defaults = {
                speed: 600,
                pause_control: false,
                pause_show : true
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() {

                var o =options;
                // begin plugin code

                //alert('working')

                // checks to see if element exists
                if(!$('#slider').length) {
                    // if not exit
                    return;
                }


                // option to have pause control on set to false in default
                // settings if you want it off.
                if(o.pause_show === true) {
                
                   $('#slider_pause').show();
                } else {
                   $('#slider_pause').hide();
                }
                   
                     
                                  



                // begin rotation
                function rotate(element) {

                    //stop the rotation if the user has interacted with controls
                    if(o.pause_control) {
                        return;
                    }

                    // if next element is within the li (?) then go to next li in the list
                    // else (:) go to first element.

                    var $next_li = $(element).next('li').length ?
                                   $(element).next('li') :
                                   $('#slider li:first');


                    // find slider controls and test to see if there is a next li element to follow
                    // if not then loop back to the first element in the li.
                    var $next_a = $('#slider_controls a.activeSlide').parent('li').next('li').length ?
                                  $('#slider_controls a.activeSlide').parent('li').next('li').find('a') :
                                  $('#slider_controls a:first');


                    $('#slider_controls a.activeSlide').removeClass('activeSlide');
                    $next_a.addClass('activeSlide');

                    // continue rotation after above code excutes
                    function next(){
                        rotate($next_li);
                    }

                    $(element).fadeOut(o.speed);

                    $($next_li).fadeIn(o.speed, function(){

                        //creates a delay
                        setTimeout(next, o.speed);
                    });
                }




                // add click events/listener to controls

                $('#slider_controls a').click(function(){

                    $('#slider_pause').html('Play');
                    $($(this).attr('href')).show().siblings('li').hide();
                    $(this).addClass('activeSlide').parent('li').siblings('li').find('a').removeClass('activeSlide');

                    o.pause_control = true;

                    // no follow
                    this.blur();
                    return false;

                });



                // pause / play button
                $('#slider_pause').click(function(){

                    // checking button status
                    if($(this).html() === 'Pause') {

                        o.pause_control = true;

                        $(this).html('Play');

                    } else {

                        o.pause_control = false;

                        // start rotation 
                        rotate('#slider li:visible:first');

                        $(this).html('Pause');

                    }

                    this.blur();
                    return false;

                });

                // hides all li elements apart from the first one.
                $('#slider li:first').siblings('li').hide();

                $(window).load(function(){
                    rotate($('#slider li:visible:first'));
                });


            });
        }
    });

})(jQuery, window, document);
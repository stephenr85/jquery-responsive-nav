

$(document).ready(function(){

    var $nav = $('#nav'),
        isMobile = function(){ return $(window).width() < 481;},
        isMedium = function(){ return $(window).width() > 481 && $(window).width() < 960;},
        isLarge = function(){ return $(window).width() > 960 };

    $nav.find('li:has(> ul)').addClass('parent');

    $nav.on('click', 'li.parent > a', function(evt){
        evt.preventDefault();
        if(isMobile()){
            $(this).closest('li').toggleClass('focus');//.siblings().removeClass('focus'); //uncomment to only allow one item open at a time
        }
    });

    $nav.on('mouseenter', 'li.parent', function(evt){
        if(!isMobile()){
            var $li = $(this);
            $li.toggleClass('focus');
            $li.siblings().removeClass('focus');
        }
    });

    $nav.on('mouseleave', 'li.focus', function(evt){
        if(!isMobile()){
            $(this).removeClass('focus')
        }
    });

    //Hide the sub menus when window is resized
    $(window).on('resize', function(evt){
        $nav.find('li.focus').removeClass('focus');
    });


});
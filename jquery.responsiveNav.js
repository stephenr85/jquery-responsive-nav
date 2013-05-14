
(function($){



    var Nav = function(el, options){
        this.element = $(el);
        this.options = $.extend({}, this.options, options);
    };

    Nav.prototype = {

        options:{
            smallWidthMax:480,
            smallShowsSingle:false,
            generateBackLinks:false,
            backLinkText:'Back',
            generateSubSectionLinks:true,
            subSectionLinkExists:function($a, $ul){
                return $ul.find('> li > a[href="'+$a.attr('href')+'"]').length;
            },
            sectionSecondTapGo:true
        },
        option:function(key, value){
            if(arguments.length === 1 && typeof key === 'string'){
                return this.options[key];
            }else if(arguments.length > 1){
                this.options[key] = value;
                return this;
            }
        },

        init:function(){
            var I = this,
                $nav = this.element;

            $nav.find('li:has(> ul)').addClass('parent');

            $nav.on('click', 'li.parent > a', function(evt){
                var $li = $(this).closest('li');
                if(I.isSmall()){
                    if((!$li.hasClass('focus') || !I.options.sectionSecondTapGo)){
                        evt.preventDefault();

                        $li.toggleClass('focus');
                        if(I.options.smallShowsSingle){
                            $li.siblings().removeClass('focus');
                        }
                    }
                }
            });

            $nav.on('mouseenter', 'li.parent', function(evt){
                if(!I.isSmall()){
                    var $li = $(this);
                    $li.toggleClass('focus');
                    $li.siblings().removeClass('focus');
                }
            });

            $nav.on('mouseleave', 'li.focus', function(evt){
                if(!I.isSmall()){
                    $(this).removeClass('focus')
                }
            });

            if(this.options.generateSubSectionLinks){
                $nav.find('li.parent').each(function(i, li){
                    var $li = $(li),
                        $a = $li.children('a'),
                        href = $a.attr('href'),
                        $ul = $li.children('ul');
                    if(href && href !== '#' && (!I.options.subSectionLinkExists || !I.options.subSectionLinkExists($a, $ul))){
                        $ul.prepend($('<li class="section-generated"/>').append($a.clone()));
                    }
                });
            }

            if(this.options.generateBackLinks){
                $nav.find('li.parent').each(function(i, li){
                    var $li = $(li),
                        $ul = $li.children('ul');
                    $ul.prepend('<li class="back-generated"><a>'+ I.options.backLinkText +'</a></li>');
                });
            }


        },

        isSmall:function(){ return $(window).width() <= this.options.smallWidthMax;}
    };

    $.fn.responsiveNav = function(opts){
        var result = this;
        this.each(function(){
            var $el = $(this),
                o = typeof opts === 'object' ? opts : null,
                nav = $el.data('responsiveNav');
            if(!nav){
                nav = new Nav(this, o);
                nav.init();
                $el.data('responsiveNav', nav);
            }
            if(typeof opts === 'string' && typeof nav[opts] === 'function'){
                result = nav[opts].apply(nav, [].slice.call(arguments, 1));
            }
        });
        return result;
    };

    $.fn.responsiveNav.defaults = Nav.prototype.options;

})(jQuery);

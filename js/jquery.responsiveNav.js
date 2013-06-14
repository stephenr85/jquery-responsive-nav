
(function($){


	/**
	* http://github.com/stephenr85/basic_responsive_nav
	* @class Nav
	* @author Stephen Rushing, eSiteful
	* @constructor
	* @param el
	* @param options
	*/
    var Nav = function(el, options){
        this.element = $(el);
        this.options = $.extend({}, this.options, options);
    };

    Nav.prototype = {

        options:{
            generateMenuHandle:true,
            menuHandleText:'Menu',
            generateBackLinks:false,
            backLinkText:'Back',
            generateSubSectionLinks:true,
            subSectionLinkExists:function($a, $ul){
                return $ul.find('> li > a[href="'+$a.attr('href')+'"]').length;
            },
            sectionSecondTapGo:true,
            generateFocusIcons:true,
            generateGoIcons:true,
			hoverIntentTime: 400,
			isTouch: !!('ontouchstart' in window || navigator.msMaxTouchPoints)
        },

		/**
		 * @method option
		 * @param key
		 * @param value 
		 */
        option:function(key, value){
            if(arguments.length === 1 && typeof key === 'string'){
                return this.options[key];
            }else if(arguments.length > 1){
                this.options[key] = value;
                return this;
            }
        },
		
		/**
		 * @method init
		 *
		 */
        init:function(){
            var I = this,
                $nav = this.element;
				
			$(document.documentElement).addClass(this.options.isTouch ? 'touch' : 'no-touch'); //Add the touch/no-touch class to the <html> tag for styling.

            $nav.find('li:has(> ul,> div)').addClass('parent');
			
			var intentTimeout,
				hideIntentTimeout;
				
            $nav.on('click', 'li.parent > a', function(evt){
               
			    clearTimeout(intentTimeout);
                var $target = $(evt.target),
					$li = $target.closest('li');
				
				if(!$target.is('.focus-handle') &&
					($target.is('.go-handle') ||
					($li.is('.focus') && I.options.sectionSecondTapGo))){
					return;
				}
				evt.preventDefault();
				I.toggleItem($li);
				
            });
			
            $nav.on('mouseenter', 'li.parent', function(evt){
                if(!I.options.isTouch){
					var $li = $(this);
					
					if($li.is('.primary-focus')) return;
					
					clearTimeout(intentTimeout);
					intentTimeout = setTimeout(function(){
						
						I.focusItem($li);
						
						$li.one('mouseleave', function(evt){
							intentTimeout = setTimeout(function(){
								I.blurItem($li);
							}, I.options.hoverIntentTime);
						});
						
					}, I.options.hoverIntentTime);
                }				
            });
			
			
            $nav.on('mouseleave', function(evt){
                if(!I.options.isTouch){
					clearTimeout(intentTimeout);
					hideIntentTimeout = setTimeout(function(){

                    	$nav.find('.focus, .primary-focus').removeClass('focus primary-focus');

					}, I.options.hoverIntentTime);
                }
            });


            if(this.options.generateFocusIcons){
                var genFocusIcoFn = typeof this.options.generateFocusIcons === 'function' ? this.options.generateFocusIcons : function($a, $li, $ul){
                    return $ul.length ? '<i class="focus-handle generated"/>' : '';
                };
                $nav.find('li > a').each(function(i, anchor){
                    var $a = $(anchor),
                        $li = $a.closest('li'),
                        $ul = $li.children('ul,div');

                    $a.append(genFocusIcoFn.call(I, $a, $li, $ul));
                });
            }

            if(this.options.generateGoIcons){
                var genGoIcoFn = typeof this.options.generateGoIcons === 'function' ? this.options.generateGoIcons : function($a, $li, $ul){
                    return $a.attr('href') && !/#/.test($a.attr('href')) ? '<i class="go-handle generated"/>' : '';
                };
                $nav.find('li > a').each(function(i, anchor){
                    var $a = $(anchor),
                        $li = $a.closest('li'),
                        $ul = $li.children('ul');

                    $a.append(genGoIcoFn.call(I, $a, $li, $ul));
                });
            }

            if(this.options.generateMenuHandle){

                var genMenuHandleFn = typeof this.options.generateIconElements === 'function' ? this.options.generateIconElements : function(){
                    return '<a class="menu-handle generated"><i></i><span>'+this.options.menuHandleText+'</span></a>';
                };
                $nav.prepend(genMenuHandleFn.call(this));
            }
            $nav.on('click', '.menu-handle', function(){
                $nav.toggleClass('focus');
            });


            if(this.options.generateSubSectionLinks){
                $nav.find('li.parent').each(function(i, li){
                    var $li = $(li),
                        $a = $li.children('a'),
                        href = $a.attr('href'),
                        $ul = $li.children('ul');
                    if(href && href !== '#' && (!I.options.subSectionLinkExists || !I.options.subSectionLinkExists($a, $ul))){
                        $ul.prepend($('<li class="section generated"/>').append($a.clone()));
                    }
                });
            }

            if(this.options.generateBackLinks){
                $nav.find('li.parent').each(function(i, li){
                    var $li = $(li),
                        $ul = $li.children('ul');
                    $ul.prepend('<li class="back generated"><a><i></i>'+ I.options.backLinkText +'</a></li>');
                });
            }
            $nav.on('click', 'li.back > a', function(evt){
                evt.preventDefault();
                $(this).closest('li.focus').removeClass('focus').closest('ul.focus').removeClass('focus');
            });


        },

		focusItem:function(li){
			var I = this,
				$li = $(li);
				
			$li.addClass('focus primary-focus');
			$li.parents('li,ul').addClass('focus primary-focus');
			$li.siblings().removeClass('primary-focus');
		},
		
		blurItem: function(li){
			var I = this,
				$li = $(li);
				
			$li.removeClass('focus primary-focus');
			$li.closest('li,ul').removeClass('focus primary-focus');
		},
		
		toggleItem: function(li){
			var $li = $(li);
			if($li.hasClass('focus')){
				this.blurItem(li);
			}else{
				this.focusItem(li);
			}
		}
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

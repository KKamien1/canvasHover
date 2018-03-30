(function($) {
  "use strict";
$('body').ready(function() {
	BrowserDetect.init();
	//alert(BrowserDetect.browser.toLowerCase().replace(' ',''));
	
	$('html').addClass('browser-'+BrowserDetect.browser.toLowerCase().replace(' ',''));

	if (BrowserDetect.browser.toLowerCase() == "safari" && BrowserDetect.version < 9) {
		$('html').addClass('browser-safari-old');
	}



	/*
 * Menus
 *
 */

console.log('%cLA KAMYK - 2017', 'color:#fff; background-color:#000; padding:5px 10px; font-size:14px;');




	
	var $navWrapper = jQuery('#main-nav'),
		$nav = $navWrapper.find('.links'),
		$li = $nav.find('.menu-item-has-children');
		$subMenus = $li.find('.sub-menu');
			
	$subMenus.each( function() {
		var $li = jQuery(this).children();
		$li.each(function(i) {
			jQuery(this).css({
				'transition-delay': i * (0.1) + "s"
			});
		});
	});
		
	$li.on('mouseenter mouseleave', function(e) {
		if( Modernizr.mq('(min-width: 768px)') ) {
			var $subMenu = jQuery(this).children('.sub-menu');
			if( e.type == 'mouseenter' ) {
				$subMenu.stop().fadeIn().addClass('active');
			} else {
				$subMenu.stop().fadeOut().removeClass('active');
			}
		}
	});		
		
	$navWrapper.on('click', '#menu-toggle', function() {
		jQuery(this).toggleClass('close');
		$navWrapper.toggleClass('open');
		$nav.slideFadeToggle();
	});
	
	var $catNav = jQuery('.category-nav');
	$catNav.on('click', 'header', function() {
		jQuery(this).siblings('ul').slideToggle();
	});
	
	$nav.children('ul').children('li').each(function(i) {
		jQuery(this).css({
			'transition-delay': 0.25 + (i * 0.1) + "s"
		});
	});
	
})();



//    MODERNIZ 
var bg = Modernizr.prefixedCSSValue('background', 'linear-gradient(left, red, red)');
console.log(bg);


var szablon = _.template('<li><a href="http://www.<%= link %>"><%= projekt %></a></li>'),
	content = "";

_.each(projekty, function(projekt, index, projekty) {
	content += szablon({projekt: projekt.name, link: projekt.link});
});

var container = document.createElement('ol');
container.innerHTML = content;
document.body.appendChild(container);



});


var projekty = [
		{name : 'taeda', link : 'taeda.pl'},
		{name : 'finfactory', link : 'finfactory.pl'},
		{name : 'Gimnazium', link : 'gimnazjum1.swidnik.edu.pl'}
		];

function Projekt(name, link) {
	this.name = name;
	this.link = link;
}


/////////////////////////////////
////////////////////////////////
///////////////////////////////

(function($) {
  "use strict";
  $(window).on("load", function() { // makes sure the whole site is loaded
    
  });


  $(document).ready(function(){  

    //active menu
    $(document).on("scroll", onScroll);
 
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
 
      $('a').each(function () {
        $(this).removeClass('active');
      })
      $(this).addClass('active');
 
      var target = this.hash;
      $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top+2
      }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    });

    
    //scroll js
/*    smoothScroll.init({
      selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
      selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutCubic', // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
      offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
      callback: function ( toggle, anchor ) {} // Function to run after scrolling
    });*/

    //menu
    var bodyEl = document.body,
    content = document.querySelector( '.content-wrap' ),
    openbtn = document.getElementById( 'open-button' ),
    closebtn = document.getElementById( 'close-button' ),
    isOpen = false;

/*    function inits() {
      initEvents();
    }*/

/*    function initEvents() {
      openbtn.addEventListener( 'click', toggleMenu );
      if( closebtn ) {
        closebtn.addEventListener( 'click', toggleMenu );
      }

      // close the menu element if the target it´s not the menu element or one of its descendants..
      content.addEventListener( 'click', function(ev) {
        var target = ev.target;
        if( isOpen && target !== openbtn ) {
          toggleMenu();
        }
      } );
    }*/

    function toggleMenu() {
      if( isOpen ) {
        classie.remove( bodyEl, 'show-menu' );
      }
      else {
        classie.add( bodyEl, 'show-menu' );
      }
      isOpen = !isOpen;
    }

    // inits();





    //Skill
    jQuery('.skillbar').each(function() {
      jQuery(this).appear(function() {
        jQuery(this).find('.count-bar').animate({
          width:jQuery(this).attr('data-percent')
        },3000);
        var percent = jQuery(this).attr('data-percent');
        jQuery(this).find('.count').html('<span>' + percent + '</span>');
      });
    }); 

  
  });
  
    

  //header
/*  function inits() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            header = document.querySelector(".for-sticky");
            console.log("distance = " + distanceY);
        if (distanceY > shrinkOn) {
            classie.add(header,"opacity-nav");
        } else {
            if (classie.has(header,"opacity-nav")) {
                classie.remove(header,"opacity-nav");
            }
          }
      });
    }

  window.onload = inits();*/

  //nav-active
  function onScroll(event){
    var scrollPosition = $(document).scrollTop();
    $('.menu-list a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('.menu-list a').removeClass("active");
        currentLink.addClass("active");
      }
      else{
        currentLink.removeClass("active");
      }
    });
  }

})(jQuery);

  //header

$(document).ready(function () {
	    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop;
        console.log("distance = " + distanceY);
      });

});


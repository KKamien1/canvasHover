
/* check for browser */
$('body').ready(function() {
	BrowserDetect.init();
	//alert(BrowserDetect.browser.toLowerCase().replace(' ',''));
	
	$('html').addClass('browser-'+BrowserDetect.browser.toLowerCase().replace(' ',''));

	if (BrowserDetect.browser.toLowerCase() == "safari" && BrowserDetect.version < 9) {
		$('html').addClass('browser-safari-old');
	}
});


var site = {
	
	config: {
		screen_xs: 480,
		screen_xs_max: 767,
		screen_sm: 768,
		screen_sm_max: 991,
		screen_md:992,
		screen_md_max:1199,
		screen_lg:1280,
		
		screen_vertical_max: 500,
	},
	
	$pages: {},
	$leftContainer: $('.page-container-left'),
	$rightContainer: $('.page-container-right'),
	
	$activePageLeft: {},
	$activePageRight: {},
	$inactivePages: {},
	last_page_index:0,
	
	initAnimationDone:false,
	animating: false,
	mobileScrollWithTransition: false,
	
	init: function() {
		
		var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
		var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
		
		if (iOS || isAndroid) {
			$('body').addClass('device-mobile');
		}
		
		if (iOS) {
			$('body').addClass('device-ios');
		}
		
		if (isAndroid) {
			$('body').addClass('device-android');
		}
		
		var _s = this;
		
		$('body').scrollTop(0).scrollLeft(0);
		
		_s.$pages = $('.page');
		_s.$leftContainer = $('.page-container-left');
		_s.$rightContainer = $('.page-container-right');
		_s.$activePageLeft = _s.$pages.eq(0);
		_s.$activePageRight = _s.$pages.eq(1);
		
		
		_s.$inactivePages = _s.$pages.not(_s.$activePageLeft).not(_s.$activePageRight);
		/* _s.$pages.detach(); */
		
		//helper.text.splitIntoLetters( $('.loadingText') );
		helper.text.splitIntoWords( $('.loadingText'), true );
		helper.text.splitIntoWords( $('.refreshTextInner'), true );
		
		_s.$pages.addClass('not-animating');
		
		// index setzen als attribut
		var i = 0;
		$.each(_s.$pages, function() {
			$(this).data('index',i++);
		});
		
		
		setTimeout(function() {
			_s.setActiveMenuItemState();
		},500);
		
		_s.bindEvents();
		
		$('.refreshText .btn').each(function() {
			var _btn = new btn($(this));
		});
	},
	
	showRefreshMessage: function() {
		var $msgC = $('.refreshText');
		
		
		var tl = new TimelineLite();
		tl.set($('.refreshText'),{display:'block'});
		
		if ($('body').hasClass('screen-lg'))
			tl.to($('.refreshText'),1,{opacity:1});
		else 
			tl.set($('.refreshText'),{opacity:1});
		
		//alert("taea");
		
		tl.to($('.refreshTextInner .word').eq(0),1,{opacity:1});
		tl.to($('.refreshTextInner .word').eq(1),1,{opacity:1},"-=0.9");
		tl.to($('.refreshTextInner .word').eq(2),1,{opacity:1},"-=0.9");
		tl.to($('.refreshTextInner .word').eq(3),1,{opacity:1},"-=0.9");
		tl.to($('.refreshTextInner .word').eq(4),1,{opacity:1},"-=0.9");
		tl.to($('.refreshTextInner .word').eq(5),1,{opacity:1},"-=0.9");
		
		
		tl.to($('.refreshTextInner .word').eq(0),1.2,{rotationX:"0deg",ease: Power3.easeInOut});
		tl.to($('.refreshTextInner .word').eq(1),1.2,{rotationX:"0deg",ease: Power3.easeInOut},"-=1.1");
		tl.to($('.refreshTextInner .word').eq(2),1.2,{rotationX:"0deg",ease: Power3.easeInOut},"-=1.1");
		tl.to($('.refreshTextInner .word').eq(3),1.2,{rotationX:"0deg",ease: Power3.easeInOut},"-=1.1");
		tl.to($('.refreshTextInner .word').eq(4),1.2,{rotationX:"0deg",ease: Power3.easeInOut},"-=1.1");
		tl.to($('.refreshTextInner .word').eq(5),1.2,{rotationX:"0deg",ease: Power3.easeInOut},"-=1.1");
		
		
		tl.call(function() {
			$msgC.find('.btn').addClass('state-visible');
		});
	},
	
	doMobileInitAnimation: function() {
		var _s = this;
		
		_s.$pages.each(function() {
			$(_s).trigger('page-added',[$(this)]);
		});
		
		
		
		requestAnimFrame(function() {
			
			$('body').scrollLeft(0).scrollTop(0);
			var tl = new TimelineLite();
			TweenLite.set($('.page'), {clearProps:"transform"});
			
			
			tl.set($('#Main'),{'left':0,'background-color':'#e8e8e8'});
			
			tl.set($('.page-container-right'),{left:'0vw',width:'0vw',zIndex:'10'});
			tl.set($('.page-container-right .page'),{width:'100vw'});
			//tl.set($('.page-container-right'),{scaleX:'1'});
			
			tl.set($('.navbar-nav'),{opacity:0});
			
			tl.set($('.image-renate'),{x:'100%','opacity':0});
			
			tl.set($('.page-container-right .page .page-inner'),{opacity:0});
			tl.set($('.page-container-left .page .page-inner'),{opacity:0});
			
			// nav
			//tl.set($('.navbar-nav'),{'opacity':0});
			tl.set($('.navbar-nav .line'),{x:'200%'});
			tl.set($('.navbar-nav .line2'),{x:'-200%'});
			tl.set($('.navbar-nav .line3'),{x:'-200%'});
			
			tl.set($('.logo-container'),{background:'transparent'});
			tl.set($('.logo-container'),{x:'-50%'});
			
			tl.set($('.home-logo svg'),{opacity:'0'});
			
			//tl.set($('.btn-page-next .btn-page-next-arrow'),{y:'-120%'});
			
			//tl.to($('.loadingText'),0.3,{opacity:0});
			
			tl.to($('.loadingText .word').eq(0),1,{opacity:0});
			tl.to($('.loadingText .word').eq(1),1,{opacity:0},"-=0.9");
			tl.to($('.loadingText .word').eq(2),1,{opacity:0},"-=0.9");
			
			tl.set($('.image-renate'),{opacity:1},'-=0.3');
			
			
			//tl.to($('.logo-inner svg'), 0.8, {top:"-100px"},1);
			tl.to($('.logo-container'), 1, {y:'-100%',ease: Power3.easeInOut},'-=1');
			
			tl.to($('.image-renate'),2,{x:'0%',ease: Power3.easeInOut},'-=1');
			
			//tl.to($('.logo-container'), 1, {height:'90px',ease: Power3.easeInOut},'-=1');
			//tl.to($('.logo-container'), 1, {width:"90px",ease: Power3.easeInOut},'-=1');
			
			
			
			//tl.to($('.page-container-right'),0.6,{scaleX:'1.5'});
			tl.to($('.page-container-right'),1,{width:'100vw',ease: Power3.easeIn},'-=0.5');
			tl.to($('.page-container-right'),0.6,{left:'50vw',width:'50vw',ease: Power3.easeInOut});
			//tl.to($('.page-container-right'),1,{x:'0%'},'');
			//tl.to($('.page-container-right'),0.6,{scaleX:'1'},'-=0.3');
			
			
			
			//tl.set($('.image-renate .image-renate1'),{display:'none'},'-=2');
			//tl.fromTo($('.image-renate .image-renate1'),2,{scale:0.92,'opacity':1},{scale:1,'opacity':0},'-=2');
			//tl.fromTo($('.image-renate .image-renate2'),2,{scale:0.95},{scale:1},'-=2');
			//tl.set($('.image-renate .image-renate1'),{display:'block'},'+=1');
			
			
			tl.set($('.page-container-left .page .page-inner'),{opacity:1});
			tl.set($('.home-logo svg'),{opacity:'1'});
			
			tl.append( TweenLite.delayedCall(0,function() {
				
				$('body').addClass('state-page-ready');
				
				
				
				var duration = 0.8;
				var delay_between=0.1;
				
				var items_right = [$('.letter.letter_right1'),$('.letter.letter_right2'),$('.letter.letter_right3'),$('.letter.letter_right4'),$('.letter.letter_right5'),$('.letter.letter_right6')];
				
				
				var ease = Sine.easeInOut;
				
				var tlLogo = new TimelineLite();
				
				if ($('#LogoFallbackSVG:visible').length) {
					tlLogo.fromTo($('.home-logo'),2,{opacity:0},{opacity:1});
				} else {
					tlLogo.fromTo($('.home-logo #LogoSVG .letter#INLrr'), 2, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"});
									
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter1'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*1);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter2'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*2);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter3'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*3);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter4'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*4);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter5'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*5);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter6'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*6);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter7'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*7);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter8'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*8);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter9'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*9);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter10'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*10);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter11'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*11);
				}
				//tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter_left6'), duration, {drawSVG:"0%",ease: Power3.easeInOut}, {drawSVG:"100%"},delay_between*6);
				
				
				//tlLogo.to($('.home-logo #LogoSVG'),1,{'opacity':0});
				//tlLogo.to($('.home-logo #LogoSVGNormal'),1,{'opacity':1},'-=1');
				
				
				$('body').addClass('state-page-ready');
				_s.initAnimationDone = true;
			}));
			
			
			tl.set($('.page-container-right .page'),{width:'75vw'});
			tl.set($('.loadingText'),{zIndex:0});
			
			
			tl.to($('.page-container-right .page .page-inner'),1,{opacity:1});
			
			
			
			
			
			//tl.to($('.letter'),1,{opacity:'1'},'-=2');
			
			//tl.to($('.home-logo svg'),1,{opacity:'1'},'-=4s');
			
			tl.call(function() {
				$('.btn-page-next').addClass('state-visible');
				$('.navbar-nav').addClass('invert');
			});
			
			tl.to($('.navbar-nav'),0.5,{opacity:1});
			tl.to($('.navbar-nav .line'),0.5,{x:'0%' ,ease: Power3.easeIn},'-=1');
			tl.to($('.navbar-nav .line2'),0.5,{x:'0%',ease: Power3.easeIn},'-=1');
			tl.to($('.navbar-nav .line3'),0.5,{x:'0%',ease: Power3.easeIn},'-=1');
			
			tl.set($('.navbar-nav .line'), {clearProps:"transform"});
			tl.set($('.navbar-nav .line2'), {clearProps:"transform"});
			tl.set($('.navbar-nav .line3'), {clearProps:"transform"});
		});
	},
	
	doInitAnimation: function() {
		//alert('doInitAnimation');
		var _s = this;
		
		requestAnimFrame(function() {
			
			
			var tl = new TimelineLite();
			TweenLite.set($('.page'), {clearProps:"transform"});
			tl.set($('#Main'),{'left':0,'background-color':'#e8e8e8'});
			
			tl.set($('.page-container-right'),{left:'0%',width:'0%',zIndex:'10'});
			tl.set($('.page-container-right .page'),{width:'100%'});
			//tl.set($('.page-container-right'),{scaleX:'1'});
			
			tl.set($('.navbar-nav'),{opacity:0});
			
			tl.set($('.image-renate'),{x:'10%','opacity':0});
			
			tl.set($('.page-container-right .page .page-inner'),{opacity:0});
			tl.set($('.page-container-left .page .page-inner'),{opacity:0});
			
			// nav
			//tl.set($('.navbar-nav'),{'opacity':0});
			tl.set($('.navbar-nav .line'),{x:'200%'});
			tl.set($('.navbar-nav .line2'),{x:'-200%'});
			tl.set($('.navbar-nav .line3'),{x:'-200%'});
			
			tl.set($('.logo-container'),{background:'transparent'});
			
			//tl.set($('.home-logo svg'),{opacity:'0'});
			
			//tl.set($('.btn-page-next .btn-page-next-arrow'),{y:'-120%'});
			
			//tl.to($('.loadingText'),0.3,{opacity:0});
			
			tl.to($('.loadingText .word').eq(0),1,{opacity:0});
			tl.to($('.loadingText .word').eq(1),1,{opacity:0},"-=0.9");
			tl.to($('.loadingText .word').eq(2),1,{opacity:0},"-=0.9");
			
			
			tl.to($('.logo-inner svg'), 0.8, {top:"50%"},1);
			tl.set($('.logo-inner svg'), {clearProps:"transform"});
			
			if ($('body').hasClass('screen-lg')) {
				tl.to($('.logo-container'), 1, {height:'90px',ease: Power3.easeInOut},'-=1');
				tl.to($('.logo-container'), 1, {width:"90px",ease: Power3.easeInOut},'-=1');				
			} else {
				tl.to($('.logo-container'), 1, {height:'80px',ease: Power3.easeInOut},'-=1');
				tl.to($('.logo-container'), 1, {width:"80px",ease: Power3.easeInOut},'-=1');				

			}
			
			
			
			//tl.to($('.page-container-right'),0.6,{scaleX:'1.5'});
			tl.to($('.page-container-right'),1,{width:'100%',ease: Power3.easeIn},'-=0.5');
			tl.to($('.page-container-right'),0.6,{left:'50%',width:'50%',ease: Power3.easeInOut});
			//tl.to($('.page-container-right'),1,{x:'0%'},'');
			//tl.to($('.page-container-right'),0.6,{scaleX:'1'},'-=0.3');
			
			tl.set($('.image-renate'),{opacity:1},'-=0.3');
			tl.to($('.image-renate'),2,{x:'0%',ease: Power3.easeInOut},'-=1');
			
			tl.set($('.image-renate .image-renate1'),{display:'none'},'-=2');
			//tl.fromTo($('.image-renate .image-renate1'),2,{scale:0.92,'opacity':1},{scale:1,'opacity':0},'-=2');
			tl.fromTo($('.image-renate .image-renate2'),2,{scale:0.95,'opacity':0},{scale:1,'opacity':1},'-=2');
			tl.set($('.image-renate .image-renate1'),{display:'block'},'+=1');
			
			
			tl.set($('.page-container-left .page .page-inner'),{opacity:1});
			tl.append( TweenLite.delayedCall(0,function() {
				
				//$('body').addClass('state-page-ready');
				
				
				
				
				var duration = 0.8;
				var delay_between=0.1;
				
				var items_right = [$('.letter.letter_right1'),$('.letter.letter_right2'),$('.letter.letter_right3'),$('.letter.letter_right4'),$('.letter.letter_right5'),$('.letter.letter_right6')];
				
				
				var ease = Sine.easeInOut;
				
				var tlLogo = new TimelineLite();
				
				if ($('#LogoFallbackSVG:visible').length) {
					tlLogo.fromTo($('.home-logo'),2,{opacity:0},{opacity:1});
				} else {
					tlLogo.fromTo($('.home-logo #LogoSVG .letter#INLrr'), 2, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"});
					
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter1'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*1);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter2'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*2);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter3'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*3);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter4'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*4);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter5'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*5);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter6'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*6);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter7'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*7);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter8'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*8);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter9'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*9);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter10'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*10);
					tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter11'), duration, {drawSVG:"0%",ease: ease}, {drawSVG:"100%"},delay_between*11);
					
					
				}
				
				//tlLogo.fromTo($('.home-logo #LogoSVG .letter.letter_left6'), duration, {drawSVG:"0%",ease: Power3.easeInOut}, {drawSVG:"100%"},delay_between*6);
				
				
				//tlLogo.to($('.home-logo #LogoSVG'),1,{'opacity':0});
				//tlLogo.to($('.home-logo #LogoSVGNormal'),1,{'opacity':1},'-=1');
				
				tlLogo.call(function() {
					//alert("test");
					
				});
				
				$('body').addClass('state-page-ready');
				_s.initAnimationDone = true;
				
				setTimeout(function() {
					$('.nav a[data-rel=1]').parent().addClass('state-active');
					_s.setActiveMenuItemState();
				},500);
				
			}));
			
			
			tl.set($('.page-container-right .page'),{width:'150%'});
			tl.set($('.loadingText'),{zIndex:0});
			
			
			tl.to($('.page-container-right .page .page-inner'),1,{opacity:1});
			
			
			
			
			
			//tl.to($('.letter'),1,{opacity:'1'},'-=2');
			
			//tl.to($('.home-logo svg'),1,{opacity:'1'},'-=4s');
			
			tl.call(function() {
				$('.btn-page-next').addClass('state-visible');
				
			});
			
			tl.to($('.navbar-nav'),0.5,{opacity:1});
			tl.to($('.navbar-nav .line'),0.5,{x:'0%' ,ease: Power3.easeIn},'-=1');
			tl.to($('.navbar-nav .line2'),0.5,{x:'0%',ease: Power3.easeIn},'-=1');
			tl.to($('.navbar-nav .line3'),0.5,{x:'0%',ease: Power3.easeIn},'-=1');
			
			tl.set($('.navbar-nav .line'), {clearProps:"transform"});
			tl.set($('.navbar-nav .line2'), {clearProps:"transform"});
			tl.set($('.navbar-nav .line3'), {clearProps:"transform"});
			
			//tl.to($('.page-container-left .page .page-inner'),3,{opacity:1},'-=2');
			
			
			
			tl.to($('#awwwards'),0.3,{opacity:0,y:-300},0);
			
			//tl.to($('.btn-page-next .btn-page-next-arrow'),1,{y:'0%',ease: Power3.easeIn});
			//tl.to($('.page-container-right'),1s,
		});
		
	},
	
	bindEvents: function() {
		var _s = this;
		
		var oldHeight = 0;
		
		if ($('body').hasClass('screen-sm-max')) {
			$('body').css('min-height',$(window).height());
		}
		
		$('.refreshText .btn').on('click', function() {
			window.location.href = window.location.href;
		});
		
		
		$(_s).on('refresh-needed', function() {
			_s.showRefreshMessage();
		});
		
		$(window).on('refresh-needed',function() {
			$(_s).trigger('refresh-needed');
		});
		
		
		/*$('body').swipe( {
		    //Generic swipe handler for all directions
		    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
		      
		      
		      //alert("test "+direction);
		      
		      if (direction=="left") {
		    	  _s.gotoNextPage();
		      }
		      else if (direction == "right") {
		    	  _s.gotoPrevPage();
		      }
		    }
		  }); */
		
		setInterval(function() {
			
		},2000);
		
		$('header nav a').on('mouseenter', function() {
			
			var $line = $(this).parent().parent().find('li.line');
			var $active_li = $('ul.navbar-nav li.state-active');
			var $current_li = $(this).parent();
			
			
			if ($current_li.index() > $active_li.index()) {
				$line.addClass('state-hover-to-left');
				$line.removeClass('state-hover-to-right');
				
				$line.css({
					'right': $('ul.navbar-nav').width() - $current_li.position().left -$current_li.width() +8
				});
				
			} else {
				$line.removeClass('state-hover-to-left');
				$line.addClass('state-hover-to-right');
				
				$line.css({
					'left':$current_li.position().left+8,
				});
			}
			
		});
		
		$('header nav a').on('mouseleave', function() {
			_s.setActiveMenuItemState();
		});
		
		enquire.register("screen and (min-width:"+_s.config.screen_md+"px)", {
			match:site.onScreenMdMatch,
			unmatch:site.onScreenMdUnmatch,
		});
		
		enquire.register("screen and (min-width:"+_s.config.screen_lg+"px)", {
			match:site.onScreenLgMatch,
			unmatch:site.onScreenLgUnmatch,
		});
		
		enquire.register("screen and (min-width:"+_s.config.screen_sm+"px)", {
			match:site.onScreenSmMatch,
			unmatch:site.onScreenSmUnmatch,
		});
		
		enquire.register("screen and (min-width:0px)", {
			match:site.onScreenXsMatch,
			unmatch:site.onScreenXsUnmatch,
		});
		
		enquire.register("screen and (max-width:"+_s.config.screen_md_max+"px)", {
			match:site.onScreenMdMaxMatch,
			unmatch:site.onScreenMdMaxUnmatch,
		});
		
		enquire.register("screen and (max-width:"+_s.config.screen_sm_max+"px)", {
			match:site.onScreenSmMaxMatch,
			unmatch:site.onScreenSmMaxUnmatch,
		});
		
		enquire.register("screen and (max-width:"+_s.config.screen_xs_max+"px)", {
			match:site.onScreenXsMaxMatch,
			unmatch:site.onScreenXsMaxUnmatch,
		});
		
		
		enquire.register("screen and (min-aspect-ratio: 13/9)", {
			match:site.onScreenVerticalMaxMatch,
			unmatch:site.onScreenVerticalMaxUnMatch,
		});
		
		
		
		
		setTimeout(function() {
			if ($('body').hasClass('screen-sm-max')) {
				/*_s.$pages.each(function() {
					$(_s).trigger('page-added',[$(this)]);
				}); */
			}
		},500);
		

		
		$('header nav a, header nav li.helper').on('click', function(e) {
			$link = $(this);
			
			if ($('header .nav').hasClass('state-closed')) {
				//var tl = new TimelineLite();
				//tl.to($('.logo-container'))
				
				$('.logo-container, header').addClass('animate');
				
				requestAnimFrame(function() {
					$('.logo-container, header').addClass('state-menu-active');
				});
				
				
				$('header .nav').removeClass('state-closed');
				
			} else {
				_s.gotoPage($link.data('rel'));
				
				if ($('body').hasClass('screen-sm-max')) {
					$('header .nav').addClass('state-closed');
					
					requestAnimFrame(function() {
						$('.logo-container, header').removeClass('state-menu-active');
					});
				}
			}
			
			e.stopPropagation();
			
		});
		
		$('header nav').on('click', function(e) {
			$(this).toggleClass('state-closed');
			
			if ($(this).hasClass('state-closed'))
				$('ul.navbar-nav').addClass('state-closed');
			else
				$('ul.navbar-nav').removeClass('state-closed');
			//alert("test");
			$('.logo-container, header').addClass('animate');
			
			if ($(this).hasClass('state-closed')) {
				$('.logo-container, header').removeClass('state-menu-active');
			}
				
			else
				$('.logo-container, header').addClass('state-menu-active');
			
			e.stopPropagation();
		});
		
		
		/* page events */
		
		$(_s).on('page-active', function(e,$page) {
			btn_page_next.set_title($('.page-container-right .page').data('title'));
			btn_page_next.animate_in(function() {
				
			});
			
			if ($page.length) {
				var page_obj = $page.data('page');
				
				$page.addClass('state-active');
				$page.trigger('page-active');
			}
		});
		
		$(_s).on('page-before-deactivating', function(e,$page) {
			if ($page.length) {
				var page_obj = $page.data('page');
				$page.trigger('page-before-deactivating');
			}
		});
		
		$(_s).on('page-deactivating', function(e,$page) {
			
			if ($page.length) {
				var page_obj = $page.data('page');
				
				$page.removeClass('state-active');
				$page.trigger('page-deactivating');
			}
		});
		
		$(_s).on('page-befor-activating', function(e,$page) {
			
			_s.setActiveMenuItemState();
			
			btn_page_next.animate_out(function() {
				
			});
			
			
			if ($page.length) {
				var page_obj = $page.data('page');
				$page.trigger('page-befor-activating');
			}
		});
		
		
		$(_s).on('page-added', function(e,$page) {
			
			if ($page.length) {
				var page_obj = $page.data('page');
				$page.trigger('page-added');
			}
		});
		
		$(_s).on('page-added-right', function(e,$page) {
			if ($page.length) {
				var page_obj = $page.data('page');
				$page.trigger('page-added');
			}
		});
		
		$(_s).on('page-added-left', function(e,$page) {
			if ($page.length) {
				var page_obj = $page.data('page');
				$page.trigger('page-added');
			}
		});
		
		$(_s).on('page-left-viewport', function(e,$page) {
			$('.btn-page-next').removeClass('animation-out');
			$('.btn-page-next').removeClass('state-visible');
			$('.navbar-nav').removeClass('invert');
			
			if ($page.length) {
				//$page.removeClass('state-active');
				//$page.trigger('page-deactivating');
			}
		});
		
		$(_s).on('page-in-viewport', function(e,$page) {
			$('.btn-page-next').removeClass('state-visible');
			$('.btn-page-next').removeClass('animation-in');
			
			if ($page.hasClass('Home'))
				$('.navbar-nav').addClass('invert');
			else
				$('.navbar-nav').removeClass('invert');
			
			if ($page.length) {
				var page_obj = $page.data('page');
				//alert("test");
				
				if (!$page.hasClass('state-active')) {
					$page.addClass('state-active');
					$page.trigger('page-active');
				}
				
			}
		});
		
		$(_s).on('page-entered-viewport',function(e,$page) {
			//$(window).scroll
			//alert("test");
			
			
		});
		
		var lastScrollPos = 0;


		var scrollToPage = function() {

			if ($('body').hasClass('screen-md'))
				return;
			
			if ($('body').hasClass('screen-vertical-max')) {
				return;
			}
			
			if ($('body').hasClass('state-page-animating'))
				return;
			
			if ($('body').hasClass('state-dragging'))
				return;
			
			if ($('body').hasClass('state-scroll-to'))
				return;
			
			/*if ($('body').hasClass('state-input-active')) {
				return;
			}*/
			
			if (typeof lastActivePage == "undefined") {
				lastActivePage = $('.page').eq(0);
			}
			
			var $page = $('.page.state-part-in-viewport').not('.state-in-viewport');
			
			
			if ($('.page.state-goto-page').length) {
				$page = $('.page.state-goto-page');
				//alert("test1");
			}
			
			
			if ($page.length == 0) {
				return;
			}
			
			
			
			//alert(($(window).scrollLeft() > lastScrollPos)+$page.length);
			
			if ($page.length == 2) {
				
				var _left = $(window).scrollLeft();
				
				if ($('body').hasClass('device-mobile'))
					_left = $('#Main').scrollLeft();
				
				//alert("test "+ lastScrollPos);
				
				if (_left > lastScrollPos) {
					
					$page = $page.eq(1);
				} else {
					
					$page = $page.eq(0);
				}
				
				
				//
			}
			
			
			
			var pageLeft = parseInt($page.css('left').replace('px'));
			
			if ($('body').hasClass('device-mobile')) 
				pageLeft = $page.position().left
			
			if (typeof pageLeft == "undefined")
				return;
			
			$('body').addClass('state-page-animating');
			
			
			
			
			var tl = new TimelineLite();
			
			if ($('body').hasClass('device-mobile')) {
				tl.to($('#Main'), 0.5, {scrollTo:{x:pageLeft}, ease:Power2.easeOut});
			} else {
				tl.to(window, 0.5, {scrollTo:{x:pageLeft}, ease:Power2.easeOut});
			}
			
			tl.call(function() {
				
				//$('.btn-page-next').addClass('state-visible');
				$('body').removeClass('state-page-animating');
				setTimeout(function() {
					
					
				},2000);
				
			});
		
		};
		
		$('body').on('touchstart', function() {
			//$('body').addClass('state-dragging');
			$('.navbar-nav').removeClass('invert');
			
			if ($('body').hasClass('screen-vertical-max')) {
				return;
			}
			
			lastScrollPos = $(window).scrollLeft();
			
			if($('body').hasClass('device-mobile')) {
				lastScrollPos = $('#Main').scrollLeft();
			}
			
			//alert(lastScrollPos);
		});
		
		$('body').on('touchend', function() {
			if ($('body').hasClass('screen-vertical-max')) {
				return;
			}
			
			//if ($('body').hasClass('device-ios'))
			//	return;
			//alert("dasf");
			//alert("dragend");
			checkScroll();
			$('body').removeClass('state-dragging');
			$('body').removeClass('state-page-animating');
			scrollToPage();
			
		});
		
		$('body').on('scrollstop', function() {
			/*if ($('body').hasClass('screen-vertical-max')) {
				return;
			}*/
			
			if ($('body').hasClass('device-ios'))
				return;
			//alert("test");
			
			
			checkScroll();
			scrollToPage();
		});
		
		
		
		//setInterval(scrollToPage,100);
		
		(function loopScrollToCheck(){
			
			//if ($('body').hasClass('device-ios'))
			//	return;
			
			 if ($('body').hasClass('screen-vertical-max')) {
				return;
			} 
			
			requestAnimFrame(loopScrollToCheck);
			scrollToPage();
			
		})();
		
		
		//alert($('body').hasClass('device-ios'));
		
		$(window).on('scroll', function() {
			
		});
		
		(function loopScrollToCheck(){
			
			return;
			if ($('body').hasClass('screen-vertical-max')) {
				return;
			}
			
			if ($('body').hasClass('device-ios'))
				return;
			
			requestAnimFrame(loopScrollToCheck);
			//scrollToPage();
			//alert("test");
			var scrollTl = new TimelineLite();
			if (!$('body').hasClass('screen-md')) {
				
				var _left = $('#Main').scrollLeft();
				scrollTl.to($('.page'),0.3,{x:($(window).scrollLeft() * (-1) ),clearProps:"width"});
			}
			else {
				TweenLite.set($('.page'), {clearProps:"transform"});
				
			}
			
			
		})();
		
		//loopScrollToCheck();
		
		var oldScroll = {};
		function checkScroll() {
			var left = $(window).scrollLeft();
			var top = $(window).scrollTop();
			
			if ($('body').hasClass('device-mobile'))
				left = $('#Main').scrollLeft();
			
			
			if ($('body').hasClass('screen-md'))
				return;
			
			if (oldScroll.left == left && oldScroll.top == top)
				return;
			
			oldScroll.left = left;
			oldScroll.top = top;
			
			
			
			
			//alert(_s.$pages.length);
			_s.$pages.each(function() {
				var isInView = false;
				var $page = $(this);
				
				
				//
				var offset = 1;
				
				var pageLeft = parseInt($page.css('left').replace('px'));
				
				
				if ($('body').hasClass('device-mobile'))
					pageLeft = $page.position().left;
				
				//
				if (!$('body').hasClass('screen-vertical-max')) {
					
					
					// completly in viewport
					if ( (pageLeft) >= (left-offset)  && (pageLeft+$page.width()) > (left+offset) 
						&& ((pageLeft+$page.width()) <= left+$(window).width()+offset)
						) {
						//
						
						
						if (!$(this).hasClass('state-in-viewport')) {
							setTimeout(function() {
								$(site).trigger('page-in-viewport',[$page]);
							},200);
							
						}
						
						$(this).addClass('state-in-viewport');
						$(this).removeClass('state-out-of-viewport');
					} else {
						$(this).removeClass('state-in-viewport');
					}
					
					
					// part in viewport
					
					//if (pageLeft < (left+$(window).width()/2))
					
					if 	(pageLeft+($page.width()) < (left+ ($(window).width())  ) && pageLeft+$page.width() > (left+$(window).width()/2) 
						|| ( pageLeft < left+($(window).width()/2) && pageLeft > left )
					) {
						//
						
						if (!$(this).hasClass('state-part-in-viewport')) {
							$(site).trigger('page-entered-viewport',[$page]);
						}
						
						$(this).addClass('state-part-in-viewport');
						
					} else {
						$(this).removeClass('state-part-in-viewport');
					}
					
					if 	(!$page.hasClass('state-in-viewport') && pageLeft+($page.width()) < (left+ ($(window).width())  ) && pageLeft+$page.width() > (left+$(window).width()/100*10) 
							|| ( pageLeft < left+($(window).width()/100*90) && pageLeft > left )
						) {
							
							$(this).addClass('state-goto-page');
							
						} else {
							$(this).removeClass('state-goto-page');
						}
					
					
					// is out of viewport
					if (  ( pageLeft+$page.width() ) < left 
						|| pageLeft > ( left+$(window).width() ) ) {
						
						if (!$(this).hasClass('state-out-of-viewport')) {
							$(site).trigger('page-left-viewport',[$page]);
						}
						
						$(this).addClass('state-out-of-viewport');
					}
					else {
						$(this).removeClass('state-out-of-viewport');
					}
					
				} else {

					
					
					//
					/* check height */
					// completly in viewport
					if (
						( ($page.position().top) >= (top-offset)  && ($page.position().top+$page.height()) > (top+offset) 
						&& (($page.position().top+$page.height()) <= left+$(window).height()+offset) )
						
						|| ($page.position().top <= (top) && ($page.position().top+$page.height()) >= ( top+$(window).height() ) )
						
						|| ($page.position().top >= (top) && ($page.position().top+$page.height()) <= ( top+$(window).height() ) )
						) {
						
						
						
						if (!$(this).hasClass('state-in-viewport')) {
							$(site).trigger('page-in-viewport',[$page]);
						}
						
						$(this).addClass('state-in-viewport');
						$(this).removeClass('state-out-of-viewport');
					} else {
						$(this).removeClass('state-in-viewport');
					}
					
					
					// part in viewport
					if (
						($page.position().top+$page.height()) < (top+$(window).height()) && $page.position().top+$page.height() > top 
						|| ($page.position().top > top && $page.position().top < (top + $(window).height() ) )
					) {
						//
						
						if (!$(this).hasClass('state-part-in-viewport')) {
							$(site).trigger('page-entered-viewport',[$page]);
						}
						
						$(this).addClass('state-part-in-viewport');
						
					} else {
						$(this).addClass('state-part-in-viewport');
					}
					
					
					
					
					// is out of viewport
					if (  ( $page.position().top+$page.height() ) < top 
						|| $page.position().top > ( top+$(window).height() ) ) {
						
						if (!$(this).hasClass('state-out-of-viewport')) {
							$(site).trigger('page-left-viewport',[$page]);
						}
						
						$(this).addClass('state-out-of-viewport');
					}
					else {
						$(this).removeClass('state-out-of-viewport');
					}
					
				}
				
				
			});
			
		}
		
		(function loopScroll(){
			requestAnimFrame(loopScroll);
			checkScroll();
		})();
		
		/*$('#Main').on('scroll', function() {
			alert("tadf");
			checkScroll();
		});*/
		//loopScroll();
		
		
		
		/*$(window).bind('popstate', function(e) {
			var $page = _s.getCurrentPage();
			_s.gotoPage($page.data('id'),function() {}, false);
		});*/
	},
	
	setActiveMenuItemState: function() {
		var $line = $('ul.navbar-nav li.line');
		var $active_li = $('ul.navbar-nav li.state-active');
		
		if (!$active_li.length)
			return;
		
		
		
		var right = $('ul.navbar-nav').width() - $active_li.width() - $active_li.position().left;
		var left = $active_li.position().left
		
		
		$line.css({
			'left':left+8,
			'right':right+8
		});
	},
	
	bindMouseWheel: function() {
		var _s = this;
		
		$(window).unbind('mousewheel.pagenav').on('mousewheel.pagenav', function(event) {
			
			if (!$('body').hasClass('state-page-ready'))
				return;
			
			if ($('.page.ReferencePage.state-active').length) {
				//
				if (event.screenX < ($(window).width()/2) )
				{
					// reference navigation
					

					if (page_references.$el.hasClass('state-animating'))
						return;
					
					if (event.originalEvent.deltaY < 0) {
						page_references.gotoPrevReference();
					} else if (event.originalEvent.deltaY > 0) {
						page_references.gotoNextReference();
					}
					return;
				}
			}
			
			if ($('.fundament-detail.state-active').length)
				return;
			
			if ($('.impressum.state-active').length)
				return;
			
			if (event.originalEvent.deltaY < 0) {
				_s.gotoPrevPage();
			} else if (event.originalEvent.deltaY > 0) {
				_s.gotoNextPage();
			}
		});
	},
	
	bindKeyboardEvents: function() {
		var _s  = this;
		
		$(window).on('keydown.pagenav', function(e) {
			
			
			if (e.keyCode == 39 || e.keyCode == 40) {
				_s.gotoNextPage();
			} else if (e.keyCode == 37 || e.keyCode == 38) {
				_s.gotoPrevPage();
			}
		});
	},
	
	getPageByClassName: function(classname) {
		var _s = this;
		var $page = undefined;
		
		
		
		_s.$pages.each(function() {
			if ($(this).hasClass(classname))
				$page = $(this);
		});
		
		return $page;
	},
	
	getCurrentPage: function() {
		var _s  = this;
		var parts = window.location.href.split("/");
		var name = parts[parts.length-1];
		
		return _s.getPageByClassName('page-'+name);
	},
	
	unbindEvents: function() {
		$(window).unbind('keydown.pagenav');
		$(window).unbind('mousewheel.pagenav');
	},
	
	onScreenLgMatch: function(){
		var _s = site;
		$('body').addClass('screen-lg');
		TweenLite.set($('.page'), {clearProps:"transform"});
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenLgUnmatch: function(){
		var _s = site;
		$('body').removeClass('screen-lg');
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenMdMatch: function(){
		//alert("test");
		//return;
		
		var _s = site;
		$('.page').removeClass('state-active');
		_s.$pages.detach();
		_s.arrangePages(true);
		
		_s.bindMouseWheel();
		$('body').addClass('screen-md');
		
		if (!$('body').hasClass('state-page-ready'))
			return;
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
		
		$('header').removeClass('logo-container');
		$('.logo-container').removeClass('state-menu-active');
		$('body').scrollLeft(0).scrollTop(0);
		$('#Main').scrollLeft(0).scrollTop(0);
		
		var tl = new TimelineLite();
		tl.set($('.logo-container'),{background:'transparent',x:'-50%',y:'-50%',width:'90px',height:'90px'});
		tl.set($('#Logo svg'),{x:'-50%',y:'-50%',top:'50%'});
		TweenLite.set($('.page'), {clearProps:"transform"});
		//tl.set($('.page'),{x:0,y:'-50%'});
	},
	
	onScreenMdUnmatch: function(){
		var _s = site;
		$('#Main #MainInner').append(_s.$pages);
		
		_s.unbindEvents();
		$('body').removeClass('screen-md');
		
		if (!$('body').hasClass('state-page-ready'))
			return;
		
		$('header').removeClass('logo-container');
		$('.logo-container').removeClass('state-menu-active');
		
		$('body').scrollLeft(0).scrollTop(0);
		$('#Main').scrollLeft(0).scrollTop(0);
		
		var tl = new TimelineLite();
		tl.set($('.page'),{x:0,y:0});
		tl.set($('.logo-container'),{background:'transparent',x:'-50%',y:'-100%'});
		tl.set($('#Logo svg'),{x:'-50%',y:'0%',top:'40px'});
		
		//alert("tests");
		TweenLite.set($('.home-logo'), {clearProps:"transform"});
		TweenLite.set($('.page'), {clearProps:"transform"});
		TweenLite.set($('.page'), {clearProps:"width"});
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenSmMatch: function(){
		var _s = site;
		
		$('body').addClass('screen-sm');
		TweenLite.set($('.page'), {clearProps:"transform"});
		TweenLite.set($('.page'), {clearProps:"width"});
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenSmUnmatch: function(){
		var _s = site;
		$('body').removeClass('screen-sm');
		$('.page').removeClass('state-active');
		TweenLite.set($('.page'), {clearProps:"transform"});
		TweenLite.set($('.page'), {clearProps:"width"});
		
		$(window).trigger('myresize');
	},
	
	onScreenXsMatch: function(){
		var _s = site;
		
		$('body').addClass('screen-xs');
		TweenLite.set($('.page'), {clearProps:"transform"});
		
		$(window).trigger('myresize');
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenXsUnmatch: function(){
		var _s = site;
		$('body').removeClass('screen-xs');
		TweenLite.set($('.page'), {clearProps:"transform"});
		$(window).trigger('myresize');
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	
	onScreenMdMaxMatch: function() {
		var _s = site;
		$('body').addClass('screen-md-max');
		TweenLite.set($('.page'), {clearProps:"transform"});
		//alert("test");
		$(window).trigger('myresize');
		
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenMdMaxUnmatch: function() {
		var _s = site;
		$('body').removeClass('screen-md-max');
		//TweenLite.set($('.page'), {clearProps:"transform"});
		$(window).trigger('myresize');
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenSmMaxMatch: function() {
		var _s = site;
		$('body').addClass('screen-sm-max');
		//TweenLite.set($('.page'), {clearProps:"transform"});
		$(window).trigger('myresize');
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenSmMaxUnmatch: function() {
		var _s = site;
		$('body').removeClass('screen-sm-max');
		//TweenLite.set($('.page'), {clearProps:"transform"});
		$(window).trigger('myresize');
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
		}
	},
	
	onScreenXsMaxMatch: function() {
		var _s = site;
		$('body').addClass('screen-xs-max');
		TweenLite.set($('.page'), {clearProps:"transform"});
		$(window).trigger('myresize');
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenXsMaxUnmatch: function() {
		var _s = site;
		$('body').removeClass('screen-xs-max');
		$(window).trigger('myresize');
		TweenLite.set($('.page'), {clearProps:"transform"});
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenVerticalMaxMatch: function() {
		var _s = site;
		$(window).trigger('myresize');
		//alert($('#Main').width());
		$('body').addClass('screen-vertical-max');
		TweenLite.set($('.page'), {x:0});
		//alert("test1");
		TweenLite.set($('.page'), {clearProps:"transform"});
		
		
		
		if ($('body').hasClass('state-page-ready')) {
			
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	onScreenVerticalMaxUnMatch: function() {
		var _s = site;
		$('body').removeClass('screen-vertical-max');
		TweenLite.set($('.page'), {x:0});
		$(window).trigger('myresize');
		//alert("test2");
		TweenLite.set($('.page'), {clearProps:"transform"});
		
		if ($('body').hasClass('state-page-ready')) {
			$('body').addClass('state-refresh-needed');
			$(_s).trigger('refresh-needed');
		}
	},
	
	/*** ROTATE PAGE HANDLING ***/
	
	gotoNextPage: function() {
		var _s = this;
		var index = _s.last_page_index+1;
		
		if (index >= _s.$pages.length-1)
			return;
		
		
		
		
		
		var $page = $(_s.$pages[index]);
		
		
		
		_s.gotoPage($page.data('id'));
	},
	
	gotoPrevPage: function() {
		var _s = this;
		var index = _s.last_page_index-1;
		
		if (index < 0)
			return;
		
		
		
		var $page = $(_s.$pages[index]);
		
		
		
		_s.gotoPage($page.data('id'));
	},
	gotoPageMobile: function(page_id, callback, dopushstate) {
		var _s = this;
		
		
		var _index = 0;
		var i = 0;
		var more_than_one_page = false;
		
		$.each(_s.$pages,function() {
			if ($(this).attr('id') == 'Page-'+page_id) {
				index=i;
			}
			i++;
		});
		
		
		var $cur_page = $('.page.state-active');
		
		$(_s).trigger('page-befor-deactivating',[$cur_page]);
		$(_s).trigger('page-deactivating',[$cur_page]);
		
		var $page = $(_s.$pages[index]);
		
		//var pageLeft = parseInt($page.css('left').replace('px'));
		
		//if ($('body').hasClass('device-ios')) {
		var pageLeft = $page.position().left;
		//}
		
		
		$(_s).trigger('page-before-deactivating',[$cur_page]);
		
		
		
		_s.last_page_index = index;
		
		var event = _s.getTransitionEvent();
		
		//$('body').scrollTop(0).scrollLeft(0);
		//$('#ScollContainer').scrollTop(0).scrollLeft(0);
		
		requestAnimFrame(function() {
			//$(_s).trigger('page-deactivating',[$cur_page]);

			$(_s).trigger('page-befor-activating',[$page]);
			//$('#Main').css('transform','translate(-'+(pos.left)+'px,-'+pos.top+'px)');
			_s.mobileScrollWithTransition = true;
			
			$('body').addClass('state-scroll-to');
			
			var tl = new TimelineLite();
			
			//if ($('body').hasClass('device-ios')) {
				tl.to($('#Main'), 2, {scrollTo:{x:pageLeft}, ease:Power2.easeOut});
			//} else {
				//tl.to(window, 2, {scrollTo:{x:pageLeft}, ease:Power2.easeOut});
			//}
			
			tl.call(function() {
				$('body').removeClass('state-scroll-to');
			});
			return;
			
			
			$('#ScollContainer').scrollLeft(pos.left);
			//$('#MainContainer').scrollTop(pos.top);
			$('#Main').unbind(event).on(event,function(e) {
				if ($(e.target).attr('id') != 'Main')
					return;

				requestAnimFrame(function() {
					$(_s).trigger('page-active',[$page]);
				});
				
			});
		});
		return;
		
		var tl = new TimelineLite();
		tl.to($('#Main'),1,{x:(pos.left*-1),y:(pos.top*-1)});
		
		$(_s).trigger('page-before-deactivating',[$page]);
		
		
		//$(_s).trigger('page-added',[$page]);
		$(_s).trigger('page-befor-activating',[$page]);
		
		tl.call(function() {
			$(_s).trigger('page-active',[$page]);
		});
	},
	gotoPage: function(page_id, callback, dopushstate) {
		
		var _s = this;
		
		if ($('body').hasClass('screen-sm-max')) {
			if (typeof page_id == "undefined")
				return;
			
			_s.gotoPageMobile(page_id, callback, dopushstate);
			return;
		}
		
		
		
		
		// TODO: ACTIVATE THIS
		if (typeof dopushstate == "undefined" && 0)
			dopushstate = true;
		
		if (_s.animating)
			return;
		
		_s.animating = true;
		
		
		
		if (_s.$activePageLeft.data('id') == page_id) {
			return;
		}
		
		
		
		
		
		var found = false;
		var direction = 'uz';
		
		var index = 0;
		var i = 0;
		var more_than_one_page = false;
		
		$.each(_s.$pages,function() {
			if ($(this).attr('id') == 'Page-'+page_id) {
				index=i;
			}
			i++;
		});
		
		
		
		if (index < _s.last_page_index) {
			direction = 'guz';
			
		} else {
			direction = 'uz';
		}
		
		
		$.each(_s.$pages,function() {
			
			if ($(this).attr('id') == 'Page-'+page_id) {
				_s.$activePageLeft = $(this);
				found = true;
				return;
			}
			
			// nächstes element
			if (found) {
				_s.$activePageRight = $(this);
				found = false;
			}
			
			i++;
		});
		
		

		_s.last_page_index = index;
		_s.arrangePages(false,direction,function() {
			
		}, dopushstate);
	},
	
	
	
	arrangePages: function(init, direction, callback, dopushstate) {
		
		var _s = this;
		var animationend = _s.getAnimationEvent();
		
		// history
		if (dopushstate)
			history.pushState({}, _s.$activePageLeft.data('title'), _s.$activePageLeft.data('urlparam'));
		
		if (!direction)
			direction = 'guz';
		
		var _$currentLeftPage = _s.$leftContainer.find('.page');
		var _$currentRightPage = _s.$rightContainer.find('.page');
		
		if (!init) {
			$(_s).trigger('page-before-deactivating',[_s.$leftContainer.find('.page')]);
		} else {
			_s.$activePageLeft.addClass('state-active');
		}
		
		if (_s.$leftContainer.children('.page').length) {
			// clone it
			// animate it out
			var $clone_left = _s.$leftContainer.children('.page').clone();
			//alert($clone_left.hasClass('state-active'));
			$clone_left.addClass('clone');
			//$clone_left.hide();
			
			_s.$leftContainer.children('.page').detach();
			_s.$leftContainer.append($clone_left);
			
			/* requestAnimFrame(function() {
				$clone_left.removeClass('state-active');
				
				$clone_left.addClass('animate-out-'+direction).unbind(animationend).on(animationend, function() {
					//requestAnimFrame(function() {
						
						
					//});
				});
			}); */
			
			
			//return;
		}
		
		if (_s.$rightContainer.children('.page').length) {
			// clone it
			// animate it out
			
			var $clone_right = _s.$rightContainer.children('.page').clone();
			//$clone_right.hide();
			_s.$rightContainer.children('.page').detach();
			
			$clone_right.addClass('clone');
			_s.$rightContainer.append($clone_right);
		}
		
		_s.$leftContainer.append(_s.$activePageLeft);
		_s.$rightContainer.append(_s.$activePageRight);
		
		$(_s).trigger('page-added',[_s.$activePageRight]);
		$(_s).trigger('page-added-right',[_s.$activePageRight]);
		$(_s).trigger('page-added-left',[_s.$activePageLeft]);
		
		
		
		
		
		if (!init) {
			_s.animating = true;
			
			
			//_s.$leftContainer.find('.page-bg-image-image').removeClass('state-hidden');
			//_s.$rightContainer.find('.page-bg-image-image').removeClass('state-hidden');
			
			
			
			if (_s.$activePageRight.find('.paralax').length) {
				var paralax = _s.$leftContainer.find('.paralax').data('paralax');
			}
			_s.$rightContainer.find('.page').not('.clone').hide();
			_s.$leftContainer.find('.page').not('.clone').hide();
			
			requestAnimFrame(function() {
				
				//$clone_right.show();
				//$clone_left.show();
				
				_s.$rightContainer.find('.page').not('.clone').show();
				_s.$leftContainer.find('.page').not('.clone').show();
				
				$(_s).trigger('page-deactivating',[_$currentLeftPage]);
				/* set menu item active */
				
				if (_s.$activePageLeft.data('id')) {
					var $a = $('header nav ul a[data-rel='+_s.$activePageLeft.data('id')+']');
					
					$('header nav ul li').removeClass('state-active');
					$a.parent('li').addClass('state-active');
					
					$('header nav ul li.line').removeClass('state-hover-to-left');
					$('header nav ul li.line').removeClass('state-hover-to-right');
				}
				
				_s.$activePageRight.removeClass('not-animating');
				_s.$activePageLeft.removeClass('not-animating');
				
				$('header .nav').addClass('state-closed');
				
				
				$(_s).trigger('page-befor-activating',[_s.$leftContainer.find('.page').not('.clone')]);
				
				
				
				
				// animate things
				
				$('#Logo').removeClass('style-black');
				$('#Logo').removeClass('style-pink');
				$('#Logo').removeClass('style-white');
				
				$('#Logo').addClass('style-'+_s.$activePageLeft.data('logo-style'));
				
				
				var triggered = false;
				
				/*var eventDfrd = $.Deferred();
				var eventDfd = $.Deferred();
				
				$('#Logo').addClass('animate-'+direction).when(animationend).then(function() {
					// do something
				}); */
				
				$('#Logo').addClass('animate-'+direction).unbind(animationend).on(animationend, function() {
					
					// only once
					if (triggered)
						return;
					
					/* // triggers on each animated child element
					// check if it is the right one
					if ($(e.target).attr('class') != _s.$activePageLeft.attr('class'))
						return; */
					
					triggered = true;
					
					
					setTimeout(function() {
						
						requestAnimFrame(function() {
							$(_s).trigger('page-active',[_s.$leftContainer.find('.page')]);
							$('#Logo').removeClass('animate-uz');
							$('#Logo').removeClass('animate-guz');
							$('#Logo').toggleClass('reverse');
						});
						
						
					},300);
				});
				
				_s.$activePageLeft.addClass('animate-in-'+direction);
				
				var evtDfrd = $.Deferred();
				//$.when(animationend)
				
				_s.$activePageLeft.unbind(animationend).on(animationend, function(e) {
					
					//alert("animation end");
					// triggers on each animated child element
					// check if it is the right one
					if ($(e.target).attr('class') != _s.$activePageLeft.attr('class'))
						return;
					
					//
				
					// remove the class after the animation has finished
					_s.$activePageLeft.removeClass('animate-in-uz');
					_s.$activePageLeft.removeClass('animate-in-guz');
					
					_s.$activePageLeft.addClass('not-animating');
					_s.$leftContainer.find('.page.clone').remove();	
					
					setTimeout(function() {
						_s.animating = false;
					},1000);
					
					
				});
				
				_s.$activePageRight.addClass('animate-in-'+direction).unbind(animationend).on(animationend, function(e) {
					
					// triggers on each animated child element
					// check if it is the right one
					if ($(e.target).attr('class') != _s.$activePageRight.attr('class'))
						return;
					
					// remove the class after the animation has finished
					_s.$activePageRight.removeClass('animate-in-uz');
					_s.$activePageRight.removeClass('animate-in-guz');
					
					_s.$activePageRight.addClass('not-animating');
					
					
					_s.$rightContainer.find('.page.clone').remove();

					if (callback)
						requestAnimFrame( callback );
					
				});
				
				if ($clone_right) {
					$clone_right.removeClass('state-active');
					
					$clone_right.addClass('animate-out-'+direction).unbind(animationend).on(animationend, function() {
						
						
					});
				}
				
				if ($clone_left) {
					$clone_left.removeClass('state-active');
					
					$clone_left.addClass('animate-out-'+direction).unbind(animationend).on(animationend, function() {
						//requestAnimFrame(function() {
							
							
						//});
					});
				}
			});
		}
		
		
		/**** LOGO ***/
		
		
	},
	
	/** HELPER **/
	
	getAnimationEvent: function() {
		return helper.getAnimationEvent();
	},
	
	
	getAnimationStartEvent: function(){
		return helper.getAnimationStartEvent();
	},
	
	getTransitionEvent: function(){
		return helper.getTransitionEvent();
	}
}

/* $(document).ready(function() {
	
	site.init();
}); */


// other
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


function extend(ChildClass, ParentClass) {
	ChildClass.prototype = new ParentClass();
	ChildClass.prototype.constructor = ChildClass;
}

function extend_static(ChildClass, ParentClass) {
	return $.extend(ParentClass,ChildClass);
}


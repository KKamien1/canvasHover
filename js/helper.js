var helper = {
	getAnimationEvent: function(){
	  var t,
	      el = document.createElement("fakeelement");

	  var animations = {
	    "animation"      : "animationend",
	    "OAnimation"     : "oAnimationEnd",
	    "MozAnimation"   : "animationend",
	    "WebkitAnimation": "webkitAnimationEnd"
	  }

	  for (t in animations){
	    if (el.style[t] !== undefined){
	      return animations[t];
	    }
	  }
	},
	
	
	getAnimationStartEvent: function(){
		  var t,
		      el = document.createElement("fakeelement");

		  var animations = {
		    "animation"      : "animationstart",
		    "OAnimation"     : "oAnimationStart",
		    "MozAnimation"   : "animationstrat",
		    "WebkitAnimation": "webkitAnimationStart"
		  }

		  for (t in animations){
		    if (el.style[t] !== undefined){
		      return animations[t];
		    }
		  }
		},
	
	getTransitionEvent: function(){
	  var t,
	      el = document.createElement("fakeelement");

	  var animations = {
	    "transition"      : "transitionend",
	    "msTransitionEnd" : "msTransitionEnd",
	    "OTransition"     : "oTransitionEnd",
	    "MozTransition"   : "transitionend",
	    "WebkitTransition": "webkitTransitionEnd "
	  }

	  for (t in animations){
	    if (el.style[t] !== undefined){
	      return animations[t];
	    }
	  }
	}
};
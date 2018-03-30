
	$(window).on("load", function() { // makes sure the whole site is loaded
		//preloader
    	//$("#menu--layer").fadeOut(); // will first fade out the loading animation
    	//$("#menu").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website.
	});
	$(document).ready(function () {

		let body = document.getElementsByTagName('body')[0],
			menuBtn = document.getElementById('menu--btn'),
			mask = document.getElementById('mask');

		let myCanvas = document.createElement('canvas');
		let ctx = myCanvas.getContext('2d');
			myCanvas.width = window.innerWidth;
			myCanvas.height = window.innerHeight;	
		
		mask.appendChild(myCanvas);
		mask.style.display = 'none';

		let lastTime = 0,
			fps = 60,
			t = 0,
			d = 500,
			ease  = 'easeInOutCubic',
			triColor = 'rgba(200,200,200,0.7)';

		var lt = new Triangle('lt',{x:myCanvas.width, y:0},{x:0, y:0},{x:0, y:myCanvas.height}, triColor);
		var rt = new Triangle('rt',{x:0, y:0},{x:myCanvas.width, y:0},{x:myCanvas.width, y:myCanvas.height}, triColor);
		var lb = new Triangle('lb',{x:myCanvas.width, y:myCanvas.height},{x:0, y:myCanvas.height},{x:0, y:0}, triColor);
		var rb = new Triangle('rb',{x:0, y:myCanvas.height},{x:myCanvas.width, y:myCanvas.height},{x:myCanvas.width, y:0}, triColor);
		

		window.addEventListener('resize', function() {
			myCanvas.width = window.innerWidth;
			myCanvas.height = window.innerHeight;
			lt.a.x = rt.b.x = rt.c.x = lb.a.x =  rb.b.x = rb.c.x = myCanvas.width;
			lt.c.y = rt.c.y = lb.a.y = lb.b.y = rb.a.y = rb.b.y = myCanvas.height;
		});

		menuBtn.addEventListener('click', popUp);

		function popUp() {
			$(mask).fadeIn(); //style.display = 'block';
			setTimeout(loop,1000);
		}

		function Triangle(name,a,b,c,color) {
			this.name = name;
			this.a = a;
			this.b = b;
			this.c = c;
			this.color = color;
		} 

		Triangle.prototype.draw = function() {
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.moveTo(this.a.x,this.a.y);
			ctx.lineTo(this.b.x,this.b.y);
			ctx.lineTo(this.c.x,this.c.y);
			ctx.closePath();
			ctx.fill();
		}
		Triangle.prototype.update = function() {
			//this.name === 'lt' || this.name === 'lb'  ? this.a.x -= 20 : this.a.x += 20 ;
			this.name === 'lt' || this.name === 'lb'  ? this.a.x = Easing.get(ease,myCanvas.width, 0, t, d) 
														:
														this.a.x = Easing.get(ease, 0, myCanvas.width, t, d);

			this.name === 'lt' || this.name === 'rt'  ? this.c.y = Easing.get(ease,myCanvas.height, 0, t, d) 
											:
											this.c.y = Easing.get(ease, 0, myCanvas.height, t, d);
			//this.name === 'lb' || this.name === 'rb'  ? this.a.y += 20 : this.c.y -= 20 ;

			console.log(lt.b === rt.a);
		}



		function loop() {
			var tri = [lt,rt, lb, rb ];
		  	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	   		t+=1000/60;
			for (var i = 0; i < tri.length; i++) {
		    	tri[i].draw();
		    	tri[i].update();
		    }

		  if(t<1000) {
		  	requestAnimationFrame(loop);
		  }
		  else {
		  	console.log('end');
		  	$(mask).fadeOut(); //style.display = "none";
		  	return t=0;
		  }
		  	
		}

	});







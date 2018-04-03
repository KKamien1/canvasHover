const canva = function (e) {
	const target = e.target
	let color = 'rgba(240,78,23,.5)'
	//let ctx = createCanvas(target)
	//let corners = getCorners(target)
	//let triangles = makeTriArrays(corners)
	//console.log(triangles)

	const overlay = new Overlay(e.target);
	overlay.init(e.target)

	overlay.ctx.fillStyle = color;
	overlay.ctx.fillRect(30, 40, 50, 40);
	overlay.animateMask()
	//start()

	// triangles.forEach(function (item, index) {
	// 	const tri[index] = new Triangle(item);
	// 	tri[index].draw(ctx);

	// })

	//const tri = new Triangle(a, b, c);
	//const tri2 = new Triangle(b, c, d);

	//tri.draw(ctx);

	//loop(0, tri);

}



function makeTriArrays(arr) {
	let r = [];
	arr.forEach(function () {
		r.push(arr.slice(0, 3))
		let a = arr.shift(0);
		arr.push(a)
	})
	return r
}

const drawTri = function (ctx, a, b, c, color = "#000") {
	ctx.beginPath()
	ctx.fillStyle = color
	ctx.moveTo(a.x, a.y)
	ctx.lineTo(b.x, b.y)
	ctx.lineTo(c.x, c.y)
	ctx.closePath()
	ctx.fill()
}
window.addEventListener('DOMContentLoaded', function () {
	const box = document.querySelector('.box')
	box.addEventListener('mouseenter', canva)
	box.addEventListener('mouseleave', removeCanvas)
})

const getVars = function (el) {
	let data = el.getBoundingClientRect()
	return data
}

const createCanvas = function (el) {
	el.style.position = 'relative'
	const {
		width,
		height
	} = getVars(el)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	canvas.style.position = 'absolute'
	canvas.width = width
	canvas.height = height
	el.appendChild(canvas)

	return ctx
}

const removeCanvas = function (e) {
	e.target.querySelector('canvas').remove()
	//overlay.stop()
	//cancelAnimationFrame()
}

const getCorners = function (el) {
	let data = getVars(el)
	const a = {
			x: 0,
			y: 0
		},
		b = {
			x: data.width,
			y: 0
		},
		c = {
			x: data.width,
			y: data.height
		},
		d = {
			x: 0,
			y: data.height
		}
	return [
		a,
		b,
		c,
		d
	]
}

let t = 0;
let dim = 5000;

class Overlay {
	constructor(el) {
		this.el = el;
		this.x = el.getBoundingClientRect().x;
		this.y = el.getBoundingClientRect().y;
		this.width = el.getBoundingClientRect().width;
		this.height = el.getBoundingClientRect().height;

		this.requestId = false;
		this.t = 0;
		this.lastTime = 0;
		this.fps = 60;
		this.dim = 1000;
	}
	init(el) {
		el.style.position = 'relative'
		const canvas = document.createElement('canvas')
		canvas.style.position = 'absolute'
		canvas.width = this.width
		canvas.height = this.height
		el.appendChild(canvas)
		this.ctx = canvas.getContext('2d')
		this.createTriangles()
/*		this.t1 = new Triangle({x:0,y:0}, {x:500,y:0}, {x:500,y:300});
		this.t2 = new Triangle({x:500,y:0},{x:500,y:300},{x:0,y:300});
		this.t3 = new Triangle({x:500,y:300}, {x:0,y:300},{x:0,y:0} );
		this.t4 = new Triangle({x:0,y:300},{x:0,y:0},{x:500,y:0} );*/
		document.querySelector('.box').addEventListener('mouseleave', () => this.stop())
	}
	animateMask(time) {
		this.requestId = undefined;
		this.animate(time)
		this.start()
	}
	start() {
		if (!this.requestId) {
			this.requestId = window.requestAnimationFrame(this.animateMask.bind(this));
		}
	}
	stop() {
		if (this.requestId) {
		window.cancelAnimationFrame(this.requestId);
		this.requestId = undefined;
		}
	}
	animate(time) {
		if (time - lastTime >= 1000 / fps) {
		this.lastTime = time;
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.t1.draw(this.ctx)
		this.t1.update(this.width, this.height, this.t, this.dim)
		this.t2.draw(this.ctx)
		this.t2.update(this.width, this.height, this.t, this.dim)

		this.t3.draw(this.ctx)
		this.t3.update(this.width, this.height, this.t, this.dim)	

		this.t4.draw(this.ctx)
		this.t4.update(this.width, this.height, this.t, this.dim)


		//this.a.x = Easing.get('easeInOutCubic', 0, this.width, this.t, this.dim);
		//tri.draw(ctx);
		//tri.update();

		this.t += 1000 / this.fps;
		if (t >= this.dim) {
			console.log('t małe')
			//forward = !forward;
			this.t = 0;
			//return;

		}
		}
	}
	createTriangles() {
		let a = {
			x: 0,
			y: 0
		};
		let b = {
			x: this.width,
			y: 0
		};
		let c = {
			x: this.width,
			y: this.height
		};
		let d = {
			x: 0,
			y: this.height
		};
		this.t1 = new Triangle(a, b, c);
		this.t2 = new Triangle(b, c, d);
		this.t3 = new Triangle(c, d, a);
		this.t4 = new Triangle(d, a, b);

		//console.log(this.t1.constructor === this.t2.constructor)
	}
}

class Triangle {
	constructor(right, peak, left) {
		this.peak = peak;
		this.l = left;
		this.r = right;
		this.ease = 'easeInCubic';
	}
	draw(ctx) {
		ctx.beginPath()
		ctx.moveTo(this.peak.x, this.peak.y)
		ctx.lineTo(this.l.x, this.l.y)
		ctx.lineTo(this.r.x, this.r.y)
		ctx.closePath()
		ctx.fill()
		//console.log(this)
	}
	update(width, height, t,dim) {


/*		this.l.x = Easing.get(this.ease, 0, 500, t,dim )
		this.l.y = Easing.get(this.ease, 0, 500, t,dim )

		this.r.x = Easing.get(this.ease, 0, 500, t,dim )
		this.r.y = Easing.get(this.ease, 0, 500, t,dim )*/

		//console.log(this.peak)


 	this.l.x = Easing.get(this.ease, 
			(this.l.x == this.peak.x ? this.peak.x : (this.l.x > this.peak.x) ? width : 0 ), this.peak.x
			, t,dim )
		this.l.y = Easing.get(this.ease, (this.l.y == this.peak.y ? this.peak.y : (this.l.y > this.peak.y) ? height : 0 ), this.peak.y, t,dim )

		this.r.x = Easing.get(this.ease, 
			(this.r.x == this.peak.x ? this.peak.x : (this.r.x > this.peak.x) ? width : 0 ), this.peak.x
			, t,dim )
		this.r.y = Easing.get(this.ease, (this.r.y == this.peak.y ? this.peak.y : (this.r.y > this.peak.y) ? height : 0 ), this.peak.y, t,dim )


	}
}


let fps = 60,
	lastTime = 0;

// function loop(time, tri) {

// 	requestAnimationFrame(loop);
// 	if (time - lastTime >= 1000 / fps) {
// 		lastTime = time;
// 		console.log(`t=${t}  dim=${dim} tri.x=${tri.left.x}`)
// 		ctx.clearRect(0, 0, c.x, c.y);

// 		tri.draw(ctx);
// 		tri.update();

// 		t += 1000 / fps;
// 		if (t >= dim) {
// 			console.log('t małe')
// 			//forward = !forward;
// 			t = 0;
// 			//return;

// 		}

// 	}
// }


var requestId;

function loop(time) {
	requestId = undefined;

	doStuff(time)
	start();
}

function start() {
	if (!requestId) {
		requestId = window.requestAnimationFrame(loop);
	}
}

function stop() {
	if (requestId) {
		window.cancelAnimationFrame(requestId);
		requestId = undefined;
	}
}

function doStuff(time) {
	document.querySelector('.box').textContent = (time * 0.001).toFixed(2);
}


//document.addEventListener('DOMContentLoaded', loop)
//loop();

class Typ {
	constructor(name) {
		this.name = 'Janek';
		this.last = 'Dupa'
	}
}

class D {
	constructor(name, inne) {
		this.name = name;
		this.last = inne;
	}
}

//const q = 
const canva = function (e) {
	const target = e.target
	let color = 'rgba(240,78,23,.5)'
	//let ctx = createCanvas(target)
	let corners = getCorners(target)
	let triangles = makeTriArrays(corners)
	console.log(triangles)

	const overlay = new Overlay(e.target);
	let ctx = overlay.init(e.target)

	overlay.ctx.fillStyle = color;
	overlay.ctx.fillRect(30, 40, 50, 40);
	//start()

	// triangles.forEach(function (item, index) {
	// 	const tri[index] = new Triangle(item);
	// 	tri[index].draw(ctx);

	// })

	//const tri = new Triangle(a, b, c);
	//const tri2 = new Triangle(b, c, d);

	//tri.draw(ctx);

	//loop(0, tri);




	//console.log(b, c, d.x)
}

// const arr = ['a', 'b', 'c', 'd'];

// (function (arr) {
// 	const set = arr.reduce(function (acc, item, i) {
// 		acc.push(arr.slice(i, 3))
// 		return acc
// 	}, [])
// 	console.log(set)
// })(arr)
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
	stop()
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
		this.x = el.getBoundingClientRect().x;
		this.y = el.getBoundingClientRect().y;
		this.width = el.getBoundingClientRect().width;
		this.height = el.getBoundingClientRect().height;
		this.a = {
			x: 0,
			y: 0
		};
		this.b = {
			x: this.width,
			y: 0
		};
		this.c = {
			x: this.width,
			y: this.height
		};
		this.d = {
			x: 0,
			y: this.height
		}
	}
	init(el) {
		el.style.position = 'relative'
		const canvas = document.createElement('canvas')
		canvas.style.position = 'absolute'
		canvas.width = this.width
		canvas.height = this.height
		el.appendChild(canvas)
		//console.log('init w overlay')
		this.ctx = canvas.getContext('2d')
	}
	createTriangles() {
		this.t1 = new Triangle(this.a, this.b, this.c);
		this.t2 = new Triangle(this.b, this.c, this.d);
		this.t3 = new Triangle(this.c, this.d, this.a);
		this.t4 = new Triangle(this.d, this.a, this.b);
	}
}

class Triangle {
	constructor(a, b, c) {
		this.peak = b;
		this.left = c;
		this.right = a;
		this.ease = 'easeInOutCubic';
	}
	draw(ctx) {
		ctx.beginPath()
		ctx.moveTo(this.peak.x, this.peak.y)
		ctx.lineTo(this.left.x, this.left.y)
		ctx.lineTo(this.right.x, this.right.y)
		ctx.closePath()
		ctx.fill()
	}
	update() {
		this.left.x = this.left.x + 1;
		this.left.y = this.left.y + 1;

		this.right.x = this.right.x + 1;
		this.right.y = this.right.y + 1;
		// this.left.x = Easing.get(this.ease, this.left.x, this.peak.x, t, dim);
		// this.left.y = Easing.get(this.ease, this.left.y, this.peak.y, t, dim);

		// this.right.x = Easing.get(this.ease, this.left.x, this.peak.x, t, dim);
		// this.right.y = Easing.get(this.ease, this.left.y, this.peak.y, t, dim);
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
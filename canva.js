const canva = function (e) {
	const target = e.target
	let color = 'rgba(240,78,23,.5)'
	const overlay = new Overlay(e.target);
	overlay.init(e.target)
	overlay.ctx.fillStyle = color;
	overlay.animateMask()
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
}



let t = 0;
let dim = 5000;

VAR = {
	ease: 'easeInCubic'
}

class Overlay {
	constructor(el) {
		this.el = el;
		this.x = el.getBoundingClientRect().x;
		this.y = el.getBoundingClientRect().y;
		this.width = el.getBoundingClientRect().width;
		this.height = el.getBoundingClientRect().height;

		this.triangles = [];

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

			this.triangles.forEach(tri => {
				tri.draw(this.ctx)
				tri.update(this.width, this.height, this.t, this.dim)

			})

			this.t += 1000 / this.fps;
			if (t >= this.dim) {
				this.t = 0;
			}
		}
	}
	createTriangles() {
		const corners = [{
			x: 0,
			y: 0
		}, {
			x: this.el.getBoundingClientRect().width,
			y: 0
		}, {
			x: this.el.getBoundingClientRect().width,
			y: this.el.getBoundingClientRect().height
		}, {
			x: 0,
			y: this.el.getBoundingClientRect().height
		}];
		const cornersArr = [
			[0, 0],
			[this.el.getBoundingClientRect().width, 0],
			[this.el.getBoundingClientRect().width, this.el.getBoundingClientRect().height],
			[0, this.el.getBoundingClientRect().height]
		];

		const tris = makeTriArrays(cornersArr);

		console.log(tris);

		tris.forEach((tri, index) => {
			const t = new Triangle(tri[0], tri[1], tri[2]);
			console.log(t);
			this.triangles.push(t)
		});


	}
}

class Triangle {
	constructor(right, peak, left) {
		this.peak = {
			x: peak[0],
			y: peak[1]
		};
		this.l = {
			x: left[0],
			y: left[1]
		};
		this.r = {
			x: right[0],
			y: right[1]
		};

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
	update(width, height, t, dim) {

		this.l.x = Easing.get(VAR.ease,
			(this.l.x == this.peak.x ? this.peak.x : (this.l.x > this.peak.x) ? width : 0), this.peak.x, t, dim)
		this.l.y = Easing.get(VAR.ease, (this.l.y == this.peak.y ? this.peak.y : (this.l.y > this.peak.y) ? height : 0), this.peak.y, t, dim)

		this.r.x = Easing.get(VAR.ease,
			(this.r.x == this.peak.x ? this.peak.x : (this.r.x > this.peak.x) ? width : 0), this.peak.x, t, dim)
		this.r.y = Easing.get(VAR.ease, (this.r.y == this.peak.y ? this.peak.y : (this.r.y > this.peak.y) ? height : 0), this.peak.y, t, dim)


	}
}
let fps = 60,
	lastTime = 0;
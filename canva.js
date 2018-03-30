const canva = function(e) {
	const target = e.target;
	let color = '#dd7734'
	let ctx = createCanvas(target)
	let {a, b, c, d} = getCorners(target);

	// ctx.beginPath();
	// ctx.fillStyle = color;
	// ctx.moveTo(a.x,a.x);
	// ctx.lineTo(b.x,b.y); 
	// ctx.lineTo(c.x,c.y);
	// ctx.closePath();
	// ctx.fill();



	// Generate 4 triangles based on element

	drawTri(ctx, b,c,d, color);

	console.log(b);

};



window.addEventListener('DOMContentLoaded', function() {

	const box = document.querySelector('.box');
	box.addEventListener('mouseenter', canva);
	box.addEventListener('mouseleave', removeCanvas);
})


const getVars = function(el) {
	let data = el.getBoundingClientRect();
	return data
}

const createCanvas = function(el) {
	el.style.position = 'relative';
	const {width, height} = getVars(el);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.style.position = 'absolute';
	canvas.width = width;
	canvas.height = height;	
	el.appendChild(canvas);

	return ctx;
}

const removeCanvas = function(e) { 
	e.target.querySelector('canvas').remove()
}

const getCorners = function(el) {
	let data = getVars(el);
	const a = {x: 0, y:0},
		  b = {x: data.width, y: 0},
		  c = {x: data.width, y: data.height},
		  d = {X: 0, y:data.height}
	return {a,b,c,d}
}

const drawTri = function(ctx,a,b,c, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.moveTo(a.x,a.x);
	ctx.lineTo(b.x,b.y); 
	ctx.lineTo(c.x,c.y);
	ctx.closePath();
	ctx.fill();
}




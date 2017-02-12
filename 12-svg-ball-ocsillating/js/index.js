//see babel file

"use strict";

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    vbx = document.createElementNS(svgNS, "viewBox"),
    width = window.innerWidth,
    height = window.innerHeight,
    xA = new Array(),
    yA = new Array(),
    xmin = -10,
    xmax = 10,
    ymin = -20,
    ymax = 20,
    xorig = 300,
    yorig = 100,
    n = 0,
    ball = undefined,
    xscal = undefined,
    yscal = undefined;

//set the SVG and the body
document.body.style.background = '#222';
append(document.body, svg);
setAttributes(svg, {
	"viewBox": "0 0 " + width + " " + height
});

//***** Create the Ball *****//
function Ball(radius, color) {
	this.circ = document.createElementNS(svgNS, "circle");
	this.radius = radius;
	this.color = color;
	this.x = 0;
	this.y = 0;
}

Ball.prototype.draw = function () {
	append(svg, this.circ);
	setAttributes(this.circ, {
		"r": this.radius,
		"cx": this.x,
		"cy": this.y,
		"fill": this.color
	});
};

//***** Set up the Motion *****//
window.onload = init;

function init() {
	plotter();
	placeBall();
	window.requestAnimationFrame(step);
}

function plotter() {
	xscal = (xmax - xmin) / (width / 4);
	yscal = (ymax - ymin) / (height / 4);
	for (var i = 0; i <= 1200; i++) {
		xA[i] = (i - 550) * 0.02;
		yA[i] = f(xA[i]);
	}
}

function f(x) {
	var y;
	y = (x + 3.6) * (x + 2.5) * (x + 1) * (x - 0.5) * (x - 2) * (x - 3.5) * Math.exp(-x * x / 4);
	return y;
}

function placeBall() {
	ball = new Ball(10, "#7fdbd8");
	ball.x = xA[0] / xscal + xorig;
	ball.y = -yA[0] / yscal + yorig;
	ball.draw();
}

//use rAF to animate but put a boundary on it so it doesn't run forever
function step(timestamp) {
	if (n !== xA.length) {
		moveBall();
		window.requestAnimationFrame(step);
	}
}

function moveBall() {
	var xMove = xA[n * 3] / xscal + xorig;
	var yMove = -yA[n * 3] / yscal + yorig;
	ball.circ.style.transform = "translate3d(" + xMove + "px, " + yMove + "px, 0";
	n++;
}

//***** helper functions *****//

//function to set multiple attributes at once
function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

//function to append children because typing
function append(el, addition) {
	el.appendChild(addition);
}
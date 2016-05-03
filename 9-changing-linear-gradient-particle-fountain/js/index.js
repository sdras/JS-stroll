// rewritten from Canvas to SVG and Vanilla JS from this pen http://codepen.io/rachsmith/pen/PPzoxv?editors=1010
// similar to directory 8, but changed initBubble to be a reset method on the Bubble prototype
// added in changing linear gradients per bubble, altered opacity to be on the fill
// live demo at http://codepen.io/sdras/pen/76bd5fe8dd7f98c9e2df47a57865f44d

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    vbx = document.createElementNS(svgNS, "viewBox"),
    width = window.innerWidth,
    height = window.innerHeight,
    gravity = 0.00009,
    friction = 0.000001,
    lots = [],
    prevTime;

document.body.appendChild(svg);
document.body.style.background = '#222';
svg.setAttribute("viewBox", "0 0 " + width + " " + height);
svg.setAttribute("width", width);
svg.setAttribute("height", height);

var defs = document.createElementNS(svgNS, "defs");
svg.appendChild(defs);

//makin' gradients
for (var i = 0; i < 10; i++) {
  var lg = document.createElementNS(svgNS, "linearGradient");
  defs.appendChild(lg);
  lg.setAttribute("id", "linear-gradient" + i);
  var stop1 = document.createElementNS(svgNS, "stop");
  lg.appendChild(stop1);
  var stop2 = document.createElementNS(svgNS, "stop");
  lg.appendChild(stop2);
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "rgb(29, " + (Math.floor(Math.random() * (i * 20)) + 1) + ", 214)");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#d7191c");
}

function Bubble(opacity, radius) {
  this.init(width/2, height/2, 0, 0);
  this.opacity = opacity;
  this.radius = radius;
  var circ = document.createElementNS(svgNS, "circle");
  svg.appendChild(circ);
  circ.setAttribute("r", this.radius);
  circ.setAttribute("fill", "url(#linear-gradient" + (Math.floor(Math.random() * 10) + 1) + ")");
  this.circ = circ;
}

Bubble.prototype = {
  init: function (x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  },
  reset: function () {
    this.init(width/2, height/2, -0.05 + Math.random()*0.1, -0.1 + Math.random()*0.1);
  },
  update: function (dt) {
    // friction opposes the direction of velocity
    var acceleration = -Math.sign(this.vx) * friction;
    // distance = velocity * time + 0.5 * acceleration * (time ^ 2)
    this.x += this.vx * dt + 0.5 * acceleration * (dt ^ 2);
    this.y += this.vy * dt + 0.5 * gravity * (dt ^ 2);
    // velocity = velocity + acceleration * time
    this.vy += gravity * dt;
    this.vx += acceleration * dt;
    this.circ.setAttribute("cx", this.x);
    this.circ.setAttribute("cy", this.y);
    this.circ.setAttribute("opacity", this.opacity);
  }
};

for (var i = 0; i < 150; i++) {
  setTimeout(function () {
    var single = new Bubble(0.5+Math.random()*0.5, 5 + Math.random()*10);
    single.reset();
    lots.push(single);
  }, i*18);
}

(function animate(currentTime) {
  var dt;
  requestAnimationFrame(animate);
  if (!prevTime) {
    // only save previous time
    prevTime = currentTime;
    return;
  } else {
    // calculate the time difference between frames
    // it has to be less than 25ms because of switching between tabs
    dt = Math.min(currentTime - prevTime, 25);
    prevTime = currentTime;
  }
  for (var i = 0; i < lots.length; i++) {
    lots[i].update(dt);

    //if the height is small, just let it start over when it gets to the bottom, otherwise, at 3/4 (so that there aren't big gaps)
    if (height < 500) {
      if (lots[i].y > height) {
        lots[i].reset();
      }
    } else {
      if (lots[i].y > height*0.85) {
        lots[i].reset();
      }
    }
  }
}());
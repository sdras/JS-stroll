// rewritten from Canvas to SVG and Vanilla JS from this pen http://codepen.io/rachsmith/pen/PPzoxv?editors=1010
// live demo at http://codepen.io/sdras/pen/e805476fd38a7cc3657e2027f3fc0b17

//step one: changed bubble and bubbles to be single and lots, because I couldn't easily see what was bubble and what was Bubble and what was bubbles.
//step two: changed to using height and width instead of hard-coded integers, create conditionals for large heights
//step three: convert to svg
//step four: incorporated PR to use elapsed time to calculate animation, https://github.com/sdras/JS-stroll/pull/2 + performs better

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

Bubble.prototype = {
  init: function (x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
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
    this.circ.setAttribute("stroke", "rgba(1,146,190," + this.opacity + ")");
  }
};

for (var i = 0; i < 150; i++) {
  setTimeout(function () {
    var single = new Bubble(0.5+Math.random()*0.5, 5 + Math.random()*10);
    initBubble(single);
    lots.push(single);
  }, i*18);
}

function Bubble(opacity, radius) {
  this.init(width/2, height/2, 0, 0);
  this.opacity = opacity;
  this.radius = radius;
  var circ = document.createElementNS(svgNS, "circle");
  svg.appendChild(circ);
  circ.setAttribute("r", this.radius);
  circ.setAttribute("fill", "none");
  circ.setAttribute("stroke-width", "1px");
  this.circ = circ;
}

function initBubble(single) {
  single.init(width/2, height/2, -0.05 + Math.random()*0.1, -0.1 + Math.random()*0.1);
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
        initBubble(lots[i]);
      }
    } else {
      if (lots[i].y > height*0.85) {
        initBubble(lots[i]);
      }
    }
  }
  console.log(lots.length);
}());

// rewritten from Canvas to SVG and Vanilla JS from this pen http://codepen.io/rachsmith/pen/PPzoxv?editors=1010
// live demo at http://codepen.io/sdras/pen/e805476fd38a7cc3657e2027f3fc0b17

//step one: changed bubble and bubbles to be single and lots, because I couldn't easily see what was bubble and what was Bubble and what was bubbles.
//step two: changed to using height and width instead of hard-coded integers, create conditionals for large heights
//step three: convert to svg

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    vbx = document.createElementNS(svgNS, "viewBox"),
    width = window.innerWidth,
    height = window.innerHeight,
    gravity = 0.009,
    friction = 0.999,
    lots = [];

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
  update: function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += gravity;
    this.vx = this.vx*friction;
    this.vy = this.vy*friction;
    this.circ.setAttribute("cx", this.x);
    this.circ.setAttribute("cy", this.y);
    this.circ.setAttribute("stroke", "rgba(1,146,190," + this.opacity + ")");
  }
};

for (var i = 0; i < 150; i++) {
  var single = new Bubble(0.5+Math.random()*0.5, 5 + Math.random()*10);
  lots.push(single);
  setTimeout(initBubble, i*18, single);
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
  single.init(width/2, height/2, -0.5 + Math.random()*1, -1 + Math.random()*1);
}

(function animate() {
  for (var i = 0; i < lots.length; i++) {
    lots[i].update();
    
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
  requestAnimationFrame(animate);
}());
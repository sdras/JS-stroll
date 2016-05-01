// rewritten from Canvas to SVG and Vanilla JS from this post http://codepen.io/rachsmith/post/hack-physics-and-javascript-1
// live demo at http://codepen.io/sdras/pen/4d353ad01bab58a19d32abf1d435fcaa

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    vbx = document.createElementNS(svgNS, "viewBox"),
    coord = 20,
    vel = 2,
    accel = 0.5,
    width = window.innerWidth,
    height = window.innerHeight,
    particles = [],
    colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];

document.body.appendChild(svg);
document.body.style.background = '#222';
svg.setAttribute("viewBox", "0 0 " + width + " " + height);
svg.setAttribute("width", width);
svg.setAttribute("height", height);

//pretty much unchanged from Rachels
function initParticles() {
  for (var i = 0; i < 200; i++) {
    setTimeout(createParticle, 20*i, i);
  }
}

function createParticle(i) {
  // initial position in middle of viewbox
  var x = width*0.5;
  var y = height*0.5;
  // randomize the acceleration a little - but we still want them flying 'up' and 'out'
  var accelX = -2+Math.random()*4;
  var accelY = Math.random()*-3;
  // randomize size and opacity a little & pick a color from our color palette
  var size = 5+Math.random()*5;
  var color = colors[i%colors.length];
  var opacity =  0.5 + Math.random()*0.5;
  var p = new Particle(x, y, accelX, accelY, size, color, opacity);
  particles.push(p);
}

//we create the particles differently because of SVG drawing, we don't need draw() but we still update.
function Particle(x, y, accelX, accelY, size, color, opacity) {
  var circ = document.createElementNS(svgNS, "circle");
  svg.appendChild(circ);
  circ.setAttribute("r", size);
  circ.setAttribute("fill", color);
  
  this.update = function() {
    x += accelX;
    y += accelY;
    
    circ.setAttribute("cx", x);
    circ.setAttribute("cy", y);
  }
}

//rAF part
function repeatOften() {
 for (var i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);

// init
initParticles();
render();
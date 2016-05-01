// rewritten from Canvas to SVG and Vanilla JS from this post http://codepen.io/rachsmith/post/hack-physics-and-javascript-1
// live demo at http://codepen.io/sdras/pen/2bdd461ea2d56a6c1403c8a9282dc6fe
// rewrote particle and create particle function to reduce repetition, but this might have made it more costly because it holds more state.

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    vbx = document.createElementNS(svgNS, "viewBox"),
    coord = 20,
    vel = 2,
    accel = 0.5,
    width = window.innerWidth,
    height = window.innerHeight,
    particles = [],
    colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'],
    gravity = 0.04;

document.body.appendChild(svg);
document.body.style.background = '#222';
svg.setAttribute("viewBox", "0 0 " + width + " " + height);
svg.setAttribute("width", width);
svg.setAttribute("height", height);

function initParticles() {
  for (var i = 0; i < 200; i++) {
    setTimeout(createParticle, 20*i, i);
  }
}

function createParticle(i) {
  var p = new Particle(i);
  particles.push(p);
}

function Particle(i) {
  // initial position in middle of viewbox
  var x,
      y,
      accelX,
      accelY,
      opacity,
      size = 5+Math.random()*5,
      color = colors[i%colors.length];
  
  var circ = document.createElementNS(svgNS, "circle");
  svg.appendChild(circ);
  circ.setAttribute("r", (size/2));
  circ.setAttribute("fill", color);
      
  this.reset = function() {
    x = width*0.5;
    y = height*0.5;
 
    opacity = 0.5 + Math.random()*0.5;
    accelX = -2+Math.random()*4;
    accelY = Math.random()*-3;
  };
  
  this.reset();
  
  this.update = function() {
    if (opacity - 0.005 > 0) opacity -= 0.005 ;
    else this.reset();
    
    accelY += gravity;
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
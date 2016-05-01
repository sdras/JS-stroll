// rewritten from Canvas to SVG and Vanilla JS from this post http://codepen.io/rachsmith/post/hack-physics-and-javascript-1
// live demo at http://codepen.io/sdras/pen/aceb6170e4d70e9d5cff8f4a2ff37245

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    vbx = document.createElementNS(svgNS, "viewBox"),
    circ = document.createElementNS(svgNS, "circle"),
    coord = 20,
    vel = 2,
    accel = 0.5,
    width = window.innerWidth,
    height = window.innerHeight;

    document.body.appendChild(svg);
    document.body.style.background = '#222';
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.appendChild(circ);
    circ.setAttribute("r", "10");
    circ.setAttribute("fill", "orangered");

function repeatOften() {
  vel += accel;
  coord += vel;
  circ.setAttribute("cx", coord);
  circ.setAttribute("cy", coord);
  
  if (coord > height) {
    coord = 0;
    vel = 0;
  }
  
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);
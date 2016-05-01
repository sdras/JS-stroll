// rewritten from Canvas to SVG and Vanilla JS from this post http://codepen.io/rachsmith/post/hack-physics-and-javascript-1
// live demo at http://codepen.io/sdras/pen/b2ed94b0b4eaf55b4b6e2d4a92c318ed

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    vbx = document.createElementNS(svgNS, "viewBox"),
    circ = document.createElementNS(svgNS, "circle"),
    coord = 20,
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
  coord += 2;
  circ.setAttribute("cx", coord);
  circ.setAttribute("cy", coord);
  
  if (coord > height) {
    coord = 0;
  }
  
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);
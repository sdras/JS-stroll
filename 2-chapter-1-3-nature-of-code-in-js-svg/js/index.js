// rewritten from Processing to JS from https://github.com/shiffman/The-Nature-of-Code-Examples/blob/master/chp01_vectors/NOC_1_3_vector_subtraction/NOC_1_3_vector_subtraction.pde
// live demo at http://codepen.io/sdras/pen/5ef8dc81f804d7bd5004e11f7f1902ef


var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    svgNS = svg.namespaceURI,
    vbx = document.createElementNS(svgNS, "viewBox"),
    poL = document.createElementNS(svgNS, "polyline");

    svg.appendChild(poL);
    document.body.appendChild(svg);
    document.body.style.background = '#222';
    svg.setAttribute("class", "ball");
    svg.setAttribute("viewBox", "0 0 800 600");
    svg.setAttribute("width", "800");
    svg.setAttribute("height", "600");

document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
  var dot, eventDoc, doc, body, pageX, pageY;

  event = event || window.event; // IE-ism

  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX = event.clientX +
      (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
      (doc && doc.clientLeft || body && body.clientLeft || 0);
    event.pageY = event.clientY +
      (doc && doc.scrollTop || body && body.scrollTop || 0) -
      (doc && doc.clientTop || body && body.clientTop || 0);
  }

  var polCoor = event.pageX + " " + event.pageY;

  var poLstring = "500 150 " + polCoor;
  poL.setAttribute('points', poLstring);
}
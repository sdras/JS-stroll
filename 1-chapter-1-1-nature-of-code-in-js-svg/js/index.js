// rewritten from Processing to JS from https://github.com/shiffman/The-Nature-of-Code-Examples/blob/master/chp01_vectors/NOC_1_1_bouncingball_novectors/NOC_1_1_bouncingball_novectors.pde
// live demo at http://codepen.io/sdras/pen/d953d844fb3bed2c053fb83874844f64

var ball = document.createElement("ball");

document.body.appendChild(ball);
document.body.style.background = '#222';

ball.setAttribute("class", "ball");

var x = 100,
    y = 100,
    xspeed = 2,
    yspeed = 2.5,
    width = window.innerWidth,
    height = window.innerHeight,
    globalId;

function repeatOften() {
  x = x + xspeed;
  y = y + yspeed;

  if ((x > width) || (x < 0)) {
    xspeed = xspeed * -1;
  }
  if ((y > height) || (y < 0)) {
    yspeed = yspeed * -1;
  }
  ball.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  
  globalID = requestAnimationFrame(repeatOften);
}
globalID = requestAnimationFrame(repeatOften);
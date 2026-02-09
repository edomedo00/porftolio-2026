const colors = ['rgba(0, 99, 38, 0.1)'];

const figsNum = 3;
const figsPts = 3;
const radius = 25;
const centerSize = 3;
const speedRate = 0.01;
const sizeRate = (radius - centerSize) / figsNum;

let angles = new Array(figsNum).fill(0);
let col;

function setup() {
  createCanvas(1080, 1920);
  col = colors[0];
  noCursor();
}

function draw() {
  background(244, 245, 243);
  fill(col);
  stroke(col);

  translate(mouseX, mouseY);

  for (let i = 0; i < figsNum; i++) {
    let size = radius - i * sizeRate;
    let speed = 1 - i * speedRate;
    let dir = i % 2 === 0 ? 1 : -1;

    push();
    rotate(angles[i]);
    polygon(0, 0, size, figsPts);
    pop();

    angles[i] += (TWO_PI / 365) * speed * dir;
  }
}

function polygon(x, y, r, n) {
  let step = TWO_PI / n;
  beginShape();
  for (let a = 0; a < TWO_PI; a += step) {
    vertex(x + cos(a) * r, y + sin(a) * r);
  }
  endShape(CLOSE);
}

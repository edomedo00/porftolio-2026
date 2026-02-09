const cursorSketch = p => {

  const colors = ['rgba(0, 99, 38, 0.2)'];

  const figsNum = 3;
  const figsPts = 3;
  const radius = 20;
  const centerSize = 3;
  const speedRate = 0.01;
  const sizeRate = (radius - centerSize) / figsNum;

  let angles = new Array(figsNum).fill(0);
  let col;

  let x = 0, y = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  p.setup = () => {
    const c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.parent('cursor-sketch');
    c.style('pointer-events', 'none');
    p.noCursor();
    p.frameRate(60);
    col = colors[0];
  };

  p.draw = () => {
    p.clear();

    // smooth but responsive
    x = p.lerp(x, targetX, .95);
    y = p.lerp(y, targetY, .95);

    // x = targetX;
    // y = targetY;

    p.translate(x, y);
    p.fill(col);
    p.strokeWeight(0.5)
    p.stroke('#00000079');

    for (let i = 0; i < figsNum; i++) {
      const size = radius - i * sizeRate;
      const speed = 1 - i * speedRate;
      const dir = i % 2 === 0 ? 1 : -1;

      p.push();
      p.rotate(angles[i]);
      polygon(0, 0, size, figsPts);
      p.pop();

      angles[i] += (p.TWO_PI / 365) * speed * dir;
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  function polygon(x, y, r, n) {
    const step = p.TWO_PI / n;
    p.beginShape();
    for (let a = 0; a < p.TWO_PI; a += step) {
      p.vertex(x + p.cos(a) * r, y + p.sin(a) * r);
    }
    p.endShape(p.CLOSE);
  }
};

new p5(cursorSketch);

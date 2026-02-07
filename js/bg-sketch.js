let img, img2, activeImg;
let t = 0;
const offsetScale = 0.2;
let tileWidth, tileHeight, sizeScale, pageHeight;
let cache = {
  img: null,
  img2: null
};
let gray, sizes, angles, weights;

function preload() {
  img  = loadImage("./img/treboles_100x178.jpg");
  img2 = loadImage("./img/treboles_100x178_70.jpg");
}

function updateLayout() {
  const doc = document.documentElement;

  const viewportH = window.innerHeight;
  const contentH = doc.scrollHeight;

  pageHeight = Math.max(viewportH, contentH);

  sizeScale = (windowWidth >= 1200) ? 2 : 1.5;
}

function selectImage() {
  activeImg = (windowWidth >= 1400) ? img : img2;
  // console.log(activeImg)
}

function setup() {
  pixelDensity(1);

  cache.img  = precomputeForImage(img);
  cache.img2 = precomputeForImage(img2);

  selectImage();
  updateLayout();

  let c = createCanvas(windowWidth + 30, pageHeight);
  // c.parent('canvas-wrapper');
  frameRate(7);
  colorMode(RGB);

  applyActiveImage();
}

function windowResized() {
  selectImage();
  updateLayout();
  applyActiveImage();

  resizeCanvas(windowWidth + 30, pageHeight);
  // c.parent('canvas-wrapper');
}

function applyActiveImage() {
  tileWidth  = width / activeImg.width;
  tileHeight = height / activeImg.height;

  const data = (activeImg === img) ? cache.img : cache.img2;

  // console.log('data', data)
  gray    = data.gray;
  sizes   = data.sizes;
  angles  = data.angles;
  weights = data.weights;
  // console.log('gray', gray)
}


function draw() {
  background(250);

  const slider1 = 0.65;
  const slider2 = 20;

  for (let x = 0; x < activeImg.width; x++) {
    for (let y = 0; y < activeImg.height; y++) {
      const posX = x * tileWidth;
      const posY = y * tileHeight;

      const g = gray[x][y];

      strokeWeight(weights[x][y] * slider1);
      stroke(10, g, 60);
      fill(10, g, 60);

      const n = noise(x * offsetScale, y * offsetScale, t);
      const n2 = noise(x * offsetScale, y * offsetScale, t + 100);

      const xOffset = map(n, 0, 1, -slider2, slider2);
      const yOffset = map(n2, 0, 1, -slider2, slider2);

      translate(posX, posY);
      rotate(angles[x][y]);
      rect(
        xOffset,
        yOffset,
        sizes[x][y] * sizeScale,
        sizes[x][y] * sizeScale
      );
      resetMatrix();
    }
  }

  t += 0.01;
}

function keyReleased() {
  if (key === 's' || key === 'S') {
    saveCanvas(String(Date.now()), 'png');
  }
}

function precomputeForImage(image) {
  const gray = [];
  const sizes = [];
  const angles = [];
  const weights = [];

  image.loadPixels();

  for (let x = 0; x < image.width; x++) {
    gray[x] = [];
    sizes[x] = [];
    angles[x] = [];
    weights[x] = [];

    for (let y = 0; y < image.height; y++) {
      const idx = 4 * (y * image.width + x);
      const r = image.pixels[idx];
      const g = image.pixels[idx + 1];
      const b = image.pixels[idx + 2];

      const gscale = (r + g + b) / 3;

      gray[x][y]    = gscale;
      sizes[x][y]   = map(gscale, 0, 255, 6, 2);
      angles[x][y]  = map(gscale, 0, 255, 1, PI);
      weights[x][y] = map(gscale, 0, 255, 15, 0.1);
    }
  }

  return { gray, sizes, angles, weights };
}

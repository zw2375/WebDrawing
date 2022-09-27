const canvas = document.querySelector('canvas');
const canvas1 = document.querySelector('#c1');
const canvas2 = document.querySelector('#c2');
const context = canvas.getContext('2d');
const context1 = canvas1.getContext('2d');
const context2 = canvas2.getContext('2d');

let width;
let height;

// set the number of canvas pixels, scaled for screen resolution
let pxScale = window.devicePixelRatio;

// use img from DOM
const image1 = document.getElementById('onions');
let color = 258;

function setup() {
    // fixed canvas size
    width = canvas1.width;
    height = canvas1.height;
    canvas1.style.width = width + 'px';
    canvas1.style.height = height + 'px';
    canvas2.style.width = width + 'px';
    canvas2.style.height = height + 'px';
    canvas1.width = width * pxScale;
    canvas1.height = height * pxScale;
    canvas2.width = width * pxScale;
    canvas2.height = height * pxScale;
    // normalize the coordinate system
    context1.scale(pxScale, pxScale);
    context2.scale(pxScale, pxScale);

  }

function draw() {
  context2.fillStyle = 'hsla(' + color + ', 100%, 50%, 0.4)';
  context2.clearRect(0, 0, canvas2.width, canvas2.height);
  if (color >= 360) {
    color = 0;
  } else {
    color += 1;
  }
  for (var i = 0; i < 50; i++) {

    context2.beginPath();

    radius = Math.round(Math.random()*50+10);
    context2.ellipse(Math.random()*width, Math.random()*height, radius, radius, 0, 0, 2 * Math.PI);
}
      // pixel compositing
  context2.fill();
  context2.save();
  context2.restore();
  requestAnimationFrame(draw);
};

  // how far color channel will be shifted
  let redShift = 1;
  let greenShift = -1;

   // direction of shift
  let redPolarity = 1;
  let greenPolarity = -1;
  let count = 0

  let factor = 4; // (a multiple of 4)
  function running(){
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
    context1.drawImage(image1, 0, 0, 600, 400);
    // access pixel data
    let imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
    let data = imageData.data;
    redShift += redPolarity * factor;
    greenShift += greenPolarity * factor;

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        let index = (x + y * imageData.width) * 4; // index position of every pixel
        data[index + 0] = data[(index + 0) + redShift]; // shift red channel
        data[index + 1] = data[(index + 1) + greenShift];
      }
    }

    // // draw image
    context1.putImageData(imageData, 0, 0);

    // alternate shift direction
    if (redShift >= 320 || redShift <= -320) {
      redPolarity *= -1;
      greenPolarity *= -1;
      status *= -1;
    }
    requestAnimationFrame(running);
  }

  window.addEventListener('load', () => {
    setup();
    draw();
    running();
  });

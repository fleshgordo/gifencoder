// for CCapture
const duration = 1000; // duration of recording
const fps = 25;

let currentFrameCount;
let isRecording = false;

let capturer = new CCapture({
  framerate: fps,
  verbose: false,
  format: 'jpg', 
  workersPath: '' 
});

let mic;
let fft;


function setup() {
  // for CCapture
  frameRate(fps);
  // for CCapture (end)

  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  colorMode(HSB, 360, 100, 100, 400);
  requestAnimationFrame(render);
  //angleMode(DEGREES)
}

function draw() {




  // draw function code
  background(0, 25);

  let waveform = fft.waveform();

  translate(width / 2, height / 2);
  rotate(frameCount * 0.1);
  //console.log(waveform.length)
  for (let i = 0; i < waveform.length; i += 2) {
    push();
    rotate(radians(i));
    let maxHeight = map(i, 0, waveform.length, 10, width / 2);
    let y = map(waveform[i], -1, 1, 0, maxHeight);
    let h = map(waveform[i], -1, 1, 0, 360, 20);

    //stroke(100, 100, 10, 10);
    //line(1000, 1000, 0, y);

    noStroke();
    fill(int(h), 100, 100);
    ellipse(0, y, 100, 10);
    pop();
  }



  // for CCapture
  //console.log('capturing frame');


 
  if (isRecording == true) {
    if (frameCount - currentFrameCount > 500) {
      isRecording = false;
      capturer.stop();
        capturer.save();
        console.log('finished recording.');
    }
  }
}

function keyPressed() {
  isRecording = true;
  capturer.start();
  currentFrameCount = frameCount;
  
}
function render() {

  requestAnimationFrame(render);

  capturer.capture(document.getElementById('defaultCanvas0'));
}


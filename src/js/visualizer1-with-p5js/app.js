import p5 from 'p5';
import 'p5/lib/addons/p5.sound';

import filePath from '../modules/filePath';

let sound;
let amplitude;
const fft = new p5.FFT();

/**
 * 音量
 */
const amp = 0.3;

const sketch = function (p) {
  p.preload = () => {
    sound = p.loadSound(`${filePath()}/sound/sample.mp3`);
  };

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.mouseClicked(p.togglePlay);
    p.background(0);
    amplitude = new p5.Amplitude();
    sound.loop(0, 0, amp);
  };

  p.draw = () => {
    p.background(0);
    p.stroke(255);
    p.translate(0, p.height);

    const average = fft.getEnergy(1, 20000);
    const spectrum = fft.analyze().map((value) => {
      return (value > average) ? value - average : 0;
    });
    const spectrumLength = spectrum.length;

    let x = 0;
    let y = 0;

    spectrum.forEach((value, index) => {
      x = p.map(index, 0, spectrumLength, 0, p.width);
      y = p.map(value, 0, 255, 0, p.height);
      p.line(x, 0, x, -y);
    });
  };

  p.togglePlay = () => {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop(0, 0, amp);
    }
  }
};

new p5(sketch, document.body);

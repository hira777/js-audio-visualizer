import p5 from 'p5';
import 'p5/lib/addons/p5.sound';

import filePath from '../modules/filePath';

let sound;
let amplitude;
const fft = new p5.FFT();

/**
 * 音量
 */
const maxAmp = 1;
const amp = 0.3;

/**
 * 半径の初期値
 */
const initialRadius = 200;
const initialCenterCircleRadius = 70;

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
    p.translate(p.width / 2, p.height / 2);

    const waveform = fft.waveform();
    const bufferSize = waveform.length;
    const level = amplitude.getLevel() * (maxAmp / amp);

    const average = fft.getEnergy(1, 20000);
    const spectrum = fft.analyze().map((val) => {return (value > average) ? value - average : 0;});

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

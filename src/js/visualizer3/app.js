import Sound from '../modules/Sound';

import loadBuffer from '../modules/loadBuffer';
import filePath from '../modules/filePath';

const c = document.getElementById('canvas');
let cw = 0;
let ch = 0;
c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;
const ctx = c.getContext('2d');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const url = `${filePath()}/sound/sample.mp3`;

let sound = null;

function setup(buffer) {
  sound = new Sound({
    audioCtx,
    buffer,
  });

  ctx.fillStyle = '#fff';
  sound.start();
}

function draw() {
  requestAnimationFrame(draw);

  ctx.clearRect(0, 0, cw, ch);

  const spectrum = sound.frequencySpectrum();

  spectrum.forEach((value, index) => {
    ctx.fillRect(index * 3, ch / 2, 1, -value);
  });
}

loadBuffer({
  audioCtx,
  url,
}).then((buffer) => {
  setup(buffer);
  draw();
});


//
// let sound;
// let amplitude;
// /**
//  * バッファサイズ（fft.analyze()で取得する配列のインデックス数）
//  */
// const bufferSize = 1024;
// const fft = new p5.FFT(0.8, bufferSize);
//
// /**
//  * 音量
//  */
// const maxAmp = 1;
// const amp = 0.3;
// const ampScale = maxAmp / amp;
//
// /**
//  * 描画に利用する角度と速度
//  */
// let degree = [];
// let velocity = [];
//
// let hue = null;
// const startX = (window.innerWidth / 4);
// let x = 0;
// let spectrum = null;
// let amplitudeLevel = 0;
// let average = 0;
// let spectrumLength = 0;
//
// /**
//  * 描画をチューニングするための累乗
//  */
// const tuningMultiply = Math.pow(1.1, 3);
//
// const sketch = function (p) {
//   p.disableFriendlyErrors = true;
//
//   p.preload = () => {
//     sound = p.loadSound(`${filePath()}/sound/isochronous_free_ver.mp3`);
//   };
//
//   p.setup = () => {
//     const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
//
//     canvas.mouseClicked(p.togglePlay);
//
//     p.background(0);
//     p.noStroke(0);
//     p.colorMode(p.HSB, 360, 100, 100, 100);
//
//     amplitude = new p5.Amplitude();
//     sound.loop(0, 0, amp);
//
//     for (let i = 0; i < bufferSize; i += 1) {
//       degree[i] = 0;
//       velocity[i] = 0;
//     }
//   };
//
//   p.draw = () => {
//     p.background(0, 20);
//     p.translate(p.width / 2, p.height / 2);
//
//     amplitudeLevel = amplitude.getLevel() * ampScale;
//     average = fft.getEnergy(1, 20000);
//
//     /**
//      * 後の処理でspectrum[i]から
//      * fft.getEnergy(1, 20000)（1~20000Hzの周波数の振幅の平均値）の値を減算する
//      * 減算結果で負数を取得したくないため、fft.getEnergy(1, 20000)より大きい振幅のみを抽出しとく
//      */
//     spectrum = fft.analyze()
//       .filter((val) => {
//         return val > average;
//       })
//       .map((val) => {
//         return (val - average) * tuningMultiply
//       });
//     spectrumLength = spectrum.length;
//
//     // for (let i = 0; i < bufferSize; i += 1) {
//     spectrum.forEach((val, i) => {
//       // const level = spectrum[i];
//       hue = p.map(i, 0, spectrumLength, 0, 360);
//       x = p.map(i, 0, spectrumLength, 0, startX + p.map(amplitudeLevel, 0, 1, 0, 200));
//
//       /*
//        * levelの値から直径の値を求める
//        * 直径に対してpow(1.1, 3)を乗算しているが
//        * 直径が大きいほど大きな値を返すためのチューニング値
//        */
//       const diameter = p.map(val, 0, 255, 0, 50) * tuningMultiply;
//
//       velocity[i] += p.map(val, 0, 255, 0, 0.02);
//
//       if (velocity[i] > 5) {
//         velocity[i] = 0;
//       }
//
//       degree[i] += velocity[i];
//
//       p.push();
//       p.rotate(p.radians(degree[i]));
//       p.fill(hue, 100, 100, 50);
//       p.ellipse(x, 0, diameter, diameter);
//       p.pop();
//     });
//   };
//
//   p.togglePlay = () => {
//     if (sound.isPlaying()) {
//       sound.pause();
//     } else {
//       sound.loop(0, 0, amp);
//     }
//   }
// };
//
// new p5(sketch, document.body);

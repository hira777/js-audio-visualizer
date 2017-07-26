// import p5 from 'p5';
// import 'p5/lib/addons/p5.sound';
//
// import filePath from '../modules/filePath';
//
// import * as draw from './draw';
//
// let sound;
// let amplitude;
// const fft = new p5.FFT();
//
// /**
//  * 音量
//  */
// const maxAmp = 1;
// const amp = 0.3;
//
// /**
//  * 半径の初期値
//  */
// const initialRadius = 200;
// const initialCenterCircleRadius = 70;
//
// const sketch = function (p) {
//   p.preload = () => {
//     sound = p.loadSound(`${filePath()}/sound/isochronous_free_ver.mp3`);
//   };
//
//   p.setup = () => {
//     const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
//     canvas.mouseClicked(p.togglePlay);
//     p.background(0);
//     amplitude = new p5.Amplitude();
//     sound.loop(0, 0, amp);
//   };
//
//   p.draw = () => {
//     p.background(0);
//     p.translate(p.width / 2, p.height / 2);
//
//     const waveform = fft.waveform();
//     const bufferSize = waveform.length;
//     const level = amplitude.getLevel() * (maxAmp / amp);
//
//     /**
//      * 画面中央の円を描画する
//      */
//     draw.drawCenterCircle({
//       p,
//       radius: initialCenterCircleRadius * level * Math.pow(1.5, 3) + 50,
//     });
//
//     /**
//      * 円弧上に波形データを描画する
//      */
//     draw.drawBarOnArc({
//       p,
//       bufferSize,
//       offset: 5,
//       waveform,
//       radius: initialRadius * level * Math.pow(1.1, 3) + 150,
//       amp,
//       maxAmp
//     });
//
//     /**
//      * 複数の頂点を指定し、頂点間の線を描画する
//      */
//     draw.drawVertex({
//       p,
//       bufferSize,
//       offset: 30,
//       waveform,
//       radius: initialRadius * level * Math.pow(1.1, 3) + 150,
//       amp,
//       maxAmp
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

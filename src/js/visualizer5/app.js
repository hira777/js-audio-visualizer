import Sound from '../modules/Sound';
import * as math from '../modules/math';

import loadBuffer from '../modules/loadBuffer';
import filePath from '../modules/filePath';
import * as drawer from './drawer';

/**
 * canvasのセットアップ
 */
const c = document.getElementById('canvas');
let cw = 0;
let ch = 0;
c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;
const ctx = c.getContext('2d');

window.resize = () => {
  c.width = cw = window.innerWidth;
  c.height = ch = window.innerHeight;
};

/**
 * audioのセットアップ
 */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const url = `${filePath()}/sound/sample.mp3`;

/**
 * Soundクラスのインスタンス
 */
let sound = null;

function setup(buffer) {
  sound = new Sound({
    audioCtx,
    buffer,
    smoothing: 0.5
  });
  sound.setVolume(0.2);
  sound.start();
}

function draw() {
  requestAnimationFrame(draw);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.fillRect(0, 0, cw, ch);

  const amplitudeLevel = sound.amplitudeLevel();
  const spectrum = sound.deviation(sound.frequencySpectrum(1000, 3000));
  const spectrumLength = spectrum.length;

  ctx.save();
  ctx.translate(cw / 2, ch / 2);

  spectrum.forEach((value, index) => {
    drawer.drawBarOnArc({
      ctx,
      bufferSize: spectrumLength,
      index,
      waveform: (value !== 0) ? value * Math.pow(1.1, 5) : 1,
      radius: math.map(amplitudeLevel, 0, 255, 150, 200),
      lineWidth: 5,
    })
  });

  ctx.restore();
}

/**
 * 音声ファイルを読み込み完了後
 * audioContextをセットアップして再生と描画を開始する
 */
loadBuffer({
  audioCtx,
  url,
}).then((buffer) => {
  setup(buffer);
  draw();
});

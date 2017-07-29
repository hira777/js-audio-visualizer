import Sound from '../modules/Sound';
import * as math from '../modules/math';

import loadBuffer from '../modules/loadBuffer';
import filePath from '../modules/filePath';

/**
 * canvasのセットアップ
 */
const c = document.getElementById('canvas');
let cw = 0;
let ch = 0;
c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;
const ctx = c.getContext('2d');

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
  });
  sound.setVolume(0.5);

  ctx.fillStyle = '#fff';
  sound.start();
}

function draw() {
  requestAnimationFrame(draw);

  ctx.clearRect(0, 0, cw, ch);

  const spectrum = sound.adjustedFrequencySpectrum();

  let x = 0;
  let y = 0;

  spectrum.forEach((value, index) => {
    x = math.map(index, 0, spectrum.length, 0, cw);
    y = math.map(value, 0, 255, 0, ch);
    ctx.fillRect(x, ch, 1, -y);
  });
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

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
const url = `${filePath()}/sound/time_leap_inst_free_ver1.mp3`;

/**
 * Soundクラスのインスタンス
 */
let sound = null;

/**
 * 描画に利用する角度と速度
 */
let degree = [];
let velocity = [];
let hue = 0;
const endX = (window.innerWidth / 6);

/**
 * 描画をチューニングするための累乗
 */
const tuningMultiply = Math.pow(1.1, 3);

function setup(buffer) {
  const bufferSize = 1024;
  for (let i = 0; i < bufferSize; i += 1) {
    degree[i] = 0;
    velocity[i] = 0;
  }

  sound = new Sound({
    audioCtx,
    buffer,
  });
  sound.setVolume(0.2);
  sound.start();
}

function draw() {
  requestAnimationFrame(draw);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, cw, ch);

  const spectrum = sound.AboveAverageFrequencySpectrum(tuningMultiply);
  const spectrumLength = spectrum.length;

  let x = 0;

  spectrum.forEach((value, index) => {
    hue = math.map(index, 0, spectrumLength, 0, 360);
    x = math.map(index, 0, spectrumLength, 0, endX);

    /*
     * levelの値から直径の値を求める
     * 直径に対してpow(1.1, 3)を乗算しているが
     * 直径が大きいほど大きな値を返すためのチューニング値
     */
    const radius = math.map(value, 0, 255, 0, 25) * tuningMultiply;

    velocity[index] += math.map(value, 0, 255, 0, 0.1);

    if (velocity[index] > 5) {
      velocity[index] = 0;
    }

    degree[index] += velocity[index];

    ctx.save();
    ctx.translate(cw / 2, ch / 2);
    ctx.rotate(degree[index] * Math.PI / 180);
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(x, 0, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
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

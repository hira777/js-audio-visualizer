import * as math from '../modules/math';

/**
 * 中央の円を描画する
 * @param p {Function} p5.jsのインスタンス
 * @param radius {number} 描画する円の半径
 */
export function drawCenterCircle({p, radius}) {
  p.push();
  p.noStroke();
  p.fill(255, 10);
  p.ellipse(0, 0, 2 * radius, 2 * radius);
  p.pop();
}

/**
 * 円弧上に波形データを描画する
 * @param ctx {Object} canvasのcontext
 * @param bufferSize {number} サウンドデータのバッファサイズ
 * @param waveform {number} 波形データ 0~255の間の数値
 * @param radius {number} 波形データの描画を開始する円弧の半径
 * @param lineColor {String} 線の色
 * @param radius {number}
 */
export function drawBarOnArc({ctx, bufferSize, index, waveform, radius, lineColor = '#fff', lineWidth = 1}) {
  /**
   * bufferSizeとiからラジアンを算出する
   * ラジアン = 2 * PI * (度数 / 360)
   * なので
   * ラジアン = 2 * PI * (index / bufferSize)
   */
  const radian = 2 * Math.PI * index / bufferSize;
  const x = radius * Math.cos(radian);
  const y = radius * Math.sin(radian);
  const value = math.map(waveform, 0, 255, 0, 150) * Math.pow(1.1, 3);
  const x2 = (radius + value) * Math.cos(radian);
  const y2 = (radius + value) * Math.sin(radian);

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/**
 * 複数の頂点を指定し、頂点間の線を描画する
 * @param p {Function} p5.jsのインスタンス
 * @param bufferSize {number} サウンドデータのバッファサイズ
 * @param offset {number} for文のループ間隔
 *        for (let i = 0; i < bufferSize; i += offset)
 * @param waveform {array} 波形データ、インデックスの数はbufferSizeと同じ
 *        -1から1の間の数値が格納されている
 * @param radius {number} 座標（波形データを描画する）の基準となる半径
 * @param amp {number}
 * @param maxAmp {number}
 */
export function drawVertex({p, bufferSize, offset, waveform, radius, amp, maxAmp}) {
  let sample = 0;
  let radian = 0;
  let x = 0;
  let y = 0;
  let index;

  p.noFill();
  p.stroke(255, 90);
  p.beginShape();

  for (let i = 0; i < bufferSize; i += offset) {
    index = (i + offset > bufferSize) ? 0 : i;
    sample = waveform[index] * (maxAmp / amp);
    radian = 2 * Math.PI * index / bufferSize;
    x = (radius + sample * 100) * Math.cos(radian);
    y = (radius + sample * 100) * Math.sin(radian);

    p.vertex(x, y);
    p.push();
    p.stroke(255, 80);
    p.strokeWeight(2);

    if (i + offset < bufferSize) {
      p.point(x, y);
    }

    p.pop();
  }

  p.endShape();
}
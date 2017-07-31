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
 * @param p {Function} p5.jsのインスタンス
 * @param bufferSize {number} サウンドデータのバッファサイズ
 * @param waveform {number} 波形データ -1から1の間の数値
 * @param radius {number} 波形データの描画を開始する円弧の半径
 * @param amp {number}
 * @param maxAmp {number}
 */
export function drawBarOnArc({p, bufferSize, offset, waveform, radius, amp, maxAmp}) {
  p.push();
  p.stroke(255);

  for (let i = 0; i < bufferSize; i += offset) {
    /**
     * bufferSizeとiからラジアンを算出する
     * ラジアン = 2 * PI * (度数 / 360)
     * なので
     * ラジアン = 2 * PI * (i / bufferSize)
     */
    const radian = 2 * Math.PI * i / bufferSize;

    /**
     * 線を引き始めるx, y座標
     */
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    /**
     * サンプルを取得する
     *
     * NOTE:
     *   同じ音声でもsound.play()で音量を変更すれば、fft.waveform()で取得する値が異なる
     *　 例えばある音声をsound.play(0, 0, 1)で再生し、取得できる波形データが10だとすると
     * 　sound.play(0, 0, 0.5)で再生して取得できるデータは半分の5になる
     *
     *   音量によって取得する値が異なると、描画の調整がかなり大変になるので
     *   どの音量でも同じ値を取得できるように、取得した値に(maxAmp / amp)を乗算してスケーリングする
     *   maxAmpはplay()で指定できる最大音量、これは1で固定、ampはplay()に指定する音量
     *
     *   例えばampを0.5にすると、サンプルを取得する計算は以下の通り
     *   sample = waveform[i] * (1 / 0.5);
     *
     *   上記のようにすればどの音量でも同じ値が取得できる
     */
    let sample = waveform[i] * (maxAmp / amp);

    /**
     * fft.waveform()で取得する値は-1と1の間にあるため
     * 必要に応じてスケーリングする必要がある
     * 今回、スケーリングのために100を乗算している
     * Math.pow(1.1, 3)はチューニング値（ようは適当）
     */
    sample = sample * 100 * Math.pow(1.1, 3);

    /**
     * 線を円の内側に大きく描画したくないため、負数だったら値を小さくする
     */
    if (sample < 0) {
      sample *= 0.2;
    }

    /**
     * 線を引く方向のx, y座標
     * radiusにスケーリングした波形データを加算する
     */
    const x2 = (radius + sample) * Math.cos(radian);
    const y2 = (radius + sample) * Math.sin(radian);

    p.line(x, y, x2, y2);
  }

  p.pop();
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
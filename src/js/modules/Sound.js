export default class Sound {
  constructor({audioCtx, buffer, smoothing = 0.8}) {
    /**
     * AudioBufferSourceNodeを生成
     */
    this.souce = audioCtx.createBufferSource();

    /**
     * 音声データ（バッファ）を音源に指定
     */
    this.souce.buffer = buffer;

    /**
     * 音量を調整するGainNodeを生成する
     */
    this.gain = audioCtx.createGain();

    /**
     * 音声の時間と周波数を解析するAnalyserNodeを生成
     */
    this.analyser = audioCtx.createAnalyser();

    /**
     * スペクトラムデータの動きの速さを設定
     * 0~1の範囲で設定でき、1に近いほど毎時取得できるデータの差が小さくなるため
     * 描画が滑らかになる
     */
    this.analyser.smoothingTimeConstant = smoothing;

    /**
     * FFTサイズ
     */
    this.fftSize = this.analyser.frequencyBinCount;

    /**
     * 周波数領域の波形データを格納する配列を生成する
     * this.analyser.frequencyBinCountのデフォルトは1024のため
     * 1024個のインデックスを持った配列が生成される
     */
    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);

    /**
     * 時間領域の波形データを格納する配列を生成する
     * this.analyser.frequencyBinCountのデフォルトは1024のため
     * 1024個のインデックスを持った配列が生成される
     */
    this.times = new Uint8Array(this.analyser.frequencyBinCount);

    /**
     * GainNodeにAudioBufferSourceNodeを接続
     */
    this.souce.connect(this.gain);

    /**
     * AnalyserNodeにGainNodeを接続
     */
    this.gain.connect(this.analyser);

    /*
     * audioCtxにAnalyserNodeを接続
     */
    this.analyser.connect(audioCtx.destination);
  }

  /**
   * 再生を開始する
   */
  start() {
    this.souce.start(0);
  }

  /**
   * 音量を変更する
   * @param {number} volume 音量 0~1まで指定可能
   */
  setVolume(volume) {
    this.gain.gain.value = volume;
  }

  /**
   * ミュート
   */
  mute() {
    this.gain.gain.value = 0;
  }

  /**
   * 接続を解除する
   */
  disconnect() {
    this.souce.disconnect();
  }

  /**
   * 周波数領域の波形データを返す
   * 引数を指定すれば、指定した範囲のHzの波形データを返す
   * @param {number} minHz
   * @param {number} maxHz
   * @return {array} freqs 周波数領域の波形データ
   */
  frequencySpectrum(minHz, maxHz) {
    /**
     * 周波数領域の波形データを引数の配列freqsに格納する
     * analyser.fftSize / 2のインデックス数の値がthis.freqsに格納される
     */
    this.analyser.getByteFrequencyData(this.freqs);

    if (typeof minHz === 'undefined' && typeof maxHz === 'undefined') {
      return this.freqs;
    } else {
      /**
       * AudioContextのサンプルレート(44100で固定)
       */
      const sampleRate = 44100;
      let hz = 0;
      let spectrum = [];

      this.freqs.forEach((value, index) => {
        // 0 * 44100 / 2048 = 0.0 Hz
        // 1 * 44100 / 2048 = 21.53 Hz
        // 2 * 44100 / 2048 = 43.06 Hz
        // 3 * 44100 / 2048 = 64.59 Hz
        hz = index * sampleRate / this.analyser.fftSize;

        if (hz > minHz && hz < maxHz) {
          spectrum.push(value);
        }
      });

      return spectrum;
    }
  }

  /**
   * 周波数領域の平均値より高い波形データを返す
   * @return {array} freqs 周波数領域の波形データ
   */
  AboveAverageFrequencySpectrum(tuningMultiply = 1) {
    /**
     * 周波数領域の波形データを引数の配列freqsに格納する
     * analyser.fftSize / 2のインデックス数の値がthis.freqsに格納される
     */
    this.analyser.getByteFrequencyData(this.freqs);

    const average = this.freqs.reduce((sum, value) => sum + value, 0) / this.fftSize;

    return this.freqs.filter((value) => {
      return value > average;
    }).map((value) => {
      return (value - average) * tuningMultiply;
    });
  }

  /**
   * 周波数領域の波形データの偏差（負数は0にする）を返す
   * 例えばthis.freqs=[4, 2, 10, 30, 2, 6]だとすると平均値は9になり
   * 各インデックスのデータから9を減算する、今回偏差が負数の場合0にするため
   * this.freqs=[4, 2, 10, 30, 2, 6];
   * ↓
   * this.freqs=[0, 0, 1, 21, 0, 0];
   * になる
   * @return {array} freqs 周波数領域の波形データ
   */
  adjustedFrequencySpectrum() {
    /**
     * 周波数領域の波形データを引数の配列freqsに格納する
     * analyser.fftSize / 2のインデックス数の値がthis.freqsに格納される
     */
    this.analyser.getByteFrequencyData(this.freqs);

    const average = this.freqs.reduce((sum, value) => sum + value, 0) / this.fftSize;

    return this.freqs.map((value) => {
      return (value > average) ? value - average : 0;
    });
  }

  /**
   * 時間領域の波形データの二乗平均平方根した音の大きさを返す
   * @return {number} 音の大きさ
   */
  amplitudeLevel() {
    /**
     * 時間領域の波形データを引数の配列freqsに格納する
     * analyser.fftSize / 2のインデックス数の値がthis.freqsに格納される
     */
    this.analyser.getByteTimeDomainData(this.times);

    return Math.sqrt(
      this.times.map((value) => {
        return value * value;
      }).reduce((sum, value) => {
        return sum + value;
      })
    );
  }

  /**
   * 波形データの偏差したものを返す
   */
  deviation(spectrum) {
    const average = spectrum.reduce((sum, value) => sum + value, 0) / spectrum.length;

    return spectrum.map((value) => {
      return (value > average) ? value - average : 0;
    });
  }
}

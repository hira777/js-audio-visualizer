export default class Sound {
  constructor({ audioCtx, buffer }) {
    /**
     * AudioBufferSourceNodeを生成
     */
    this.souce = audioCtx.createBufferSource();

    /**
     * 音声データ（バッファ）を音源に指定
     */
    this.souce.buffer = buffer;

    /**
     * 音声の時間と周波数を解析するAnalyserNodeを生成
     */
    this.analyser = audioCtx.createAnalyser();

    /**
     * スペクトラムデータの動きの速さを設定
     * 0~1の範囲で設定でき、1に近いほど毎時取得できるデータの差が小さくなるため
     * 描画が滑らかになる
     */
    this.analyser.smoothingTimeConstant = 0.5;

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
     * AnalyserNodeにAudioBufferSourceNode接続
     */
    this.souce.connect(this.analyser);

    /**
     * AudioBufferSourceNodeをAnalyserNodeに接続
     */
    this.analyser.connect(audioCtx.destination);
  }

  start() {
    this.souce.start(0);
  }

  frequencySpectrum() {
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
}

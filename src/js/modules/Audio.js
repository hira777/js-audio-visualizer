export default class Audio {
  constructor({audioCtx, buffer}) {
    this.buffer = buffer;
    this.analyser = audioCtx.createAnalyser();
    this.analyser.connect(audioCtx.destination);
    console.log(this.analyser.frequencyBinCount);
    // this.length = FREQUENCY_LENGTH;
  }
}
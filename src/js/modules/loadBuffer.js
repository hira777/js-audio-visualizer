/**
 * 音声ファイルをロードしてコールバックを返す
 * @constructor
 * @property {Object} audioCtx オーディオコンテキスト
 * @property {string} url 音声ファイルのURL
 */
export default function ({audioCtx, url}) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      audioCtx.decodeAudioData(request.response, (buffer) => {
        if (!buffer) {
          console.log('error');
          reject();
        }

        resolve(buffer);
      }, function (error) {
        console.log('decodeAudioData error');
        reject();
      });
    };

    request.onerror = () => {
      console.log('Loader: XHR error');
      reject();
    };

    request.send();
  });
}
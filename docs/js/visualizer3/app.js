/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var path = (0, _isGitHubPage2.default)() ? getRelativePath() : '';

  /**
   * 現在の階層に応じた相対パスを返す関数
   * location.pathnameが'/web/web/web/'の場合
   * 返ってくる相対パスは'../../../'
   * @returns {string} 相対パス
   */
  function getRelativePath() {
    var path = '';
    var pathArray = location.pathname.split('/');

    /**
     * 配列の中の'/'を取り除く
     */
    pathArray = pathArray.filter(function (path) {
      return path !== '';
    });

    /**
     * 相対パスを生成する
     * https://hira777.github.io/p5.sound-visualizer/visualizer1/の場合
     * pathArrayは['p5.sound-visualizer', 'visualizer1']になる
     *
     * リポジトリであるp5.sound-visualizer/をルートとして想定しているため
     * pathArray.length - 1をした数だけfor文を回して相対パスを生成する
     * そのため、https://hira777.github.io/p5.sound-visualizer/visualizer1/の場合
     * 返ってくる相対パスは'..'
     */
    for (var index = 0, length = pathArray.length - 1; index < length; index += 1) {
      if (index === pathArray.length - 1) {
        path += '..';
      } else {
        path += '../';
      }
    }

    return path;
  }

  return path;
};

var _isGitHubPage = __webpack_require__(2);

var _isGitHubPage2 = _interopRequireDefault(_isGitHubPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var audioCtx = _ref.audioCtx,
      url = _ref.url;

  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
      audioCtx.decodeAudioData(request.response, function (buffer) {
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

    request.onerror = function () {
      console.log('Loader: XHR error');
      reject();
    };

    request.send();
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return location.host.indexOf('github.io') !== -1;
};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Audio = __webpack_require__(7);

var _Audio2 = _interopRequireDefault(_Audio);

var _loadBuffer = __webpack_require__(1);

var _loadBuffer2 = _interopRequireDefault(_loadBuffer);

var _filePath = __webpack_require__(0);

var _filePath2 = _interopRequireDefault(_filePath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var url = (0, _filePath2.default)() + '/sound/isochronous_free_ver.mp3';

(0, _loadBuffer2.default)({
  audioCtx: audioCtx,
  url: url
}).then(function (buffer) {
  setup(buffer);
});

function setup(buffer) {
  var audio = new _Audio2.default({
    audioCtx: audioCtx,
    buffer: buffer
  });
}

//
// let sound;
// let amplitude;
// /**
//  * バッファサイズ（fft.analyze()で取得する配列のインデックス数）
//  */
// const bufferSize = 1024;
// const fft = new p5.FFT(0.8, bufferSize);
//
// /**
//  * 音量
//  */
// const maxAmp = 1;
// const amp = 0.3;
// const ampScale = maxAmp / amp;
//
// /**
//  * 描画に利用する角度と速度
//  */
// let degree = [];
// let velocity = [];
//
// let hue = null;
// const startX = (window.innerWidth / 4);
// let x = 0;
// let spectrum = null;
// let amplitudeLevel = 0;
// let average = 0;
// let spectrumLength = 0;
//
// /**
//  * 描画をチューニングするための累乗
//  */
// const tuningMultiply = Math.pow(1.1, 3);
//
// const sketch = function (p) {
//   p.disableFriendlyErrors = true;
//
//   p.preload = () => {
//     sound = p.loadSound(`${filePath()}/sound/isochronous_free_ver.mp3`);
//   };
//
//   p.setup = () => {
//     const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
//
//     canvas.mouseClicked(p.togglePlay);
//
//     p.background(0);
//     p.noStroke(0);
//     p.colorMode(p.HSB, 360, 100, 100, 100);
//
//     amplitude = new p5.Amplitude();
//     sound.loop(0, 0, amp);
//
//     for (let i = 0; i < bufferSize; i += 1) {
//       degree[i] = 0;
//       velocity[i] = 0;
//     }
//   };
//
//   p.draw = () => {
//     p.background(0, 20);
//     p.translate(p.width / 2, p.height / 2);
//
//     amplitudeLevel = amplitude.getLevel() * ampScale;
//     average = fft.getEnergy(1, 20000);
//
//     /**
//      * 後の処理でspectrum[i]から
//      * fft.getEnergy(1, 20000)（1~20000Hzの周波数の振幅の平均値）の値を減算する
//      * 減算結果で負数を取得したくないため、fft.getEnergy(1, 20000)より大きい振幅のみを抽出しとく
//      */
//     spectrum = fft.analyze()
//       .filter((val) => {
//         return val > average;
//       })
//       .map((val) => {
//         return (val - average) * tuningMultiply
//       });
//     spectrumLength = spectrum.length;
//
//     // for (let i = 0; i < bufferSize; i += 1) {
//     spectrum.forEach((val, i) => {
//       // const level = spectrum[i];
//       hue = p.map(i, 0, spectrumLength, 0, 360);
//       x = p.map(i, 0, spectrumLength, 0, startX + p.map(amplitudeLevel, 0, 1, 0, 200));
//
//       /*
//        * levelの値から直径の値を求める
//        * 直径に対してpow(1.1, 3)を乗算しているが
//        * 直径が大きいほど大きな値を返すためのチューニング値
//        */
//       const diameter = p.map(val, 0, 255, 0, 50) * tuningMultiply;
//
//       velocity[i] += p.map(val, 0, 255, 0, 0.02);
//
//       if (velocity[i] > 5) {
//         velocity[i] = 0;
//       }
//
//       degree[i] += velocity[i];
//
//       p.push();
//       p.rotate(p.radians(degree[i]));
//       p.fill(hue, 100, 100, 50);
//       p.ellipse(x, 0, diameter, diameter);
//       p.pop();
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

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Audio = function Audio(_ref) {
  var audioCtx = _ref.audioCtx,
      buffer = _ref.buffer;

  _classCallCheck(this, Audio);

  this.buffer = buffer;
  this.analyser = audioCtx.createAnalyser();
  this.analyser.connect(audioCtx.destination);
  console.log(this.analyser.frequencyBinCount);
  // this.length = FREQUENCY_LENGTH;
};

exports.default = Audio;

/***/ })
/******/ ]);
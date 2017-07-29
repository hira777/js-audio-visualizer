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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

var _isGitHubPage = __webpack_require__(1);

var _isGitHubPage2 = _interopRequireDefault(_isGitHubPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return location.host.indexOf('github.io') !== -1;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sound = function () {
  function Sound(_ref) {
    var audioCtx = _ref.audioCtx,
        buffer = _ref.buffer,
        _ref$smoothing = _ref.smoothing,
        smoothing = _ref$smoothing === undefined ? 0.8 : _ref$smoothing;

    _classCallCheck(this, Sound);

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


  _createClass(Sound, [{
    key: "start",
    value: function start() {
      this.souce.start(0);
    }

    /**
     * 音量を変更する
     * @param {number} volume 音量 0~1まで指定可能
     */

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      this.gain.gain.value = volume;
    }

    /**
     * ミュート
     */

  }, {
    key: "mute",
    value: function mute() {
      this.gain.gain.value = 0;
    }

    /**
     * 周波数領域の波形データを返す
     * @return {array} freqs 周波数領域の波形データ
     */

  }, {
    key: "frequencySpectrum",
    value: function frequencySpectrum() {
      /**
       * 周波数領域の波形データを引数の配列freqsに格納する
       * analyser.fftSize / 2のインデックス数の値がthis.freqsに格納される
       */
      this.analyser.getByteFrequencyData(this.freqs);

      return this.freqs;
    }
  }, {
    key: "AboveAverageFrequencySpectrum",
    value: function AboveAverageFrequencySpectrum() {
      var tuningMultiply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      /**
       * 周波数領域の波形データを引数の配列freqsに格納する
       * analyser.fftSize / 2のインデックス数の値がthis.freqsに格納される
       */
      this.analyser.getByteFrequencyData(this.freqs);

      var average = this.freqs.reduce(function (sum, value) {
        return sum + value;
      }, 0) / this.fftSize;

      return this.freqs.filter(function (value) {
        return value > average;
      }).map(function (value) {
        return (value - average) * tuningMultiply;
      });
    }

    /**
     * 周波数領域の波形データから、全インデックスのデータの平均値を減算したものを返す
     * 例えばthis.freqs=[4, 2, 10, 30, 2, 6]だとすると平均は9になり
     * 各インデックスのデータから9を減算する、計算結果が負数の場合0にするため
     * this.freqs=[4, 2, 10, 30, 2, 6];
     * ↓
     * this.freqs=[0, 0, 1, 21, 0, 0];
     * になる
     * @return {array} freqs 周波数領域の波形データ
     */

  }, {
    key: "adjustedFrequencySpectrum",
    value: function adjustedFrequencySpectrum() {
      /**
       * 周波数領域の波形データを引数の配列freqsに格納する
       * analyser.fftSize / 2のインデックス数の値がthis.freqsに格納される
       */
      this.analyser.getByteFrequencyData(this.freqs);

      var average = this.freqs.reduce(function (sum, value) {
        return sum + value;
      }, 0) / this.fftSize;

      return this.freqs.map(function (value) {
        return value > average ? value - average : 0;
      });
    }
  }]);

  return Sound;
}();

exports.default = Sound;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
/**
 * ある範囲から別の範囲に数値を再マップする
 * @param  {Number} value  変換される値
 * @param  {Number} start1 現在の値の範囲の下限
 * @param  {Number} stop1  現在の値の範囲の上限
 * @param  {Number} start2 再マップしたい値の範囲の下限
 * @param  {Number} stop2  再マップしたい値の範囲の上限
 * @return {Number}        再マップされた数値
 * @example
 *   map(50, 0, 100, 0, 200)
 *   returns 100
 */
function map(value, start1, stop1, start2, stop2) {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Sound = __webpack_require__(2);

var _Sound2 = _interopRequireDefault(_Sound);

var _math = __webpack_require__(4);

var math = _interopRequireWildcard(_math);

var _loadBuffer = __webpack_require__(3);

var _loadBuffer2 = _interopRequireDefault(_loadBuffer);

var _filePath = __webpack_require__(0);

var _filePath2 = _interopRequireDefault(_filePath);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * canvasのセットアップ
 */
var c = document.getElementById('canvas');
var cw = 0;
var ch = 0;
c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;
var ctx = c.getContext('2d');

/**
 * audioのセットアップ
 */
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var url = (0, _filePath2.default)() + '/sound/time_leap_inst_free_ver1.mp3';

/**
 * Soundクラスのインスタンス
 */
var sound = null;

/**
 * 描画に利用する角度と速度
 */
var degree = [];
var velocity = [];
var hue = 0;
var endX = window.innerWidth / 6;

/**
 * 描画をチューニングするための累乗
 */
var tuningMultiply = Math.pow(1.1, 3);

function setup(buffer) {
  var bufferSize = 1024;
  for (var i = 0; i < bufferSize; i += 1) {
    degree[i] = 0;
    velocity[i] = 0;
  }

  sound = new _Sound2.default({
    audioCtx: audioCtx,
    buffer: buffer
  });
  sound.setVolume(0.2);
  sound.start();
}

function draw() {
  requestAnimationFrame(draw);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, cw, ch);

  var spectrum = sound.AboveAverageFrequencySpectrum(tuningMultiply);
  var spectrumLength = spectrum.length;

  var x = 0;

  spectrum.forEach(function (value, index) {
    hue = math.map(index, 0, spectrumLength, 0, 360);
    x = math.map(index, 0, spectrumLength, 0, endX);

    /*
     * levelの値から直径の値を求める
     * 直径に対してpow(1.1, 3)を乗算しているが
     * 直径が大きいほど大きな値を返すためのチューニング値
     */
    var radius = math.map(value, 0, 255, 0, 25) * tuningMultiply;

    velocity[index] += math.map(value, 0, 255, 0, 0.1);

    if (velocity[index] > 5) {
      velocity[index] = 0;
    }

    degree[index] += velocity[index];

    ctx.save();
    ctx.translate(cw / 2, ch / 2);
    ctx.rotate(degree[index] * Math.PI / 180);
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
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
(0, _loadBuffer2.default)({
  audioCtx: audioCtx,
  url: url
}).then(function (buffer) {
  setup(buffer);
  draw();
});

/***/ })
/******/ ]);
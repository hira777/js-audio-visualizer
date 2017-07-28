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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// import p5 from 'p5';
// import 'p5/lib/addons/p5.sound';
//
// import filePath from '../modules/filePath';
//
// import * as draw from './draw';
//
// let sound;
// let amplitude;
// const fft = new p5.FFT();
//
// /**
//  * 音量
//  */
// const maxAmp = 1;
// const amp = 0.3;
//
// /**
//  * 半径の初期値
//  */
// const initialRadius = 100;
// const initialCenterCircleRadius = 35;
//
// const sketch = function (p) {
//   p.preload = () => {
//     sound = p.loadSound(`${filePath()}/sound/isochronous_free_ver.mp3`);
//   };
//
//   p.setup = () => {
//     const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
//     canvas.mouseClicked(p.togglePlay);
//     p.background(0);
//     amplitude = new p5.Amplitude();
//     sound.loop(0, 0, amp);
//   };
//
//   p.draw = () => {
//     p.background(0);
//     p.translate(p.width / 2, p.height / 2);
//
//     const waveform = fft.waveform();
//     const bufferSize = waveform.length;
//     const level = amplitude.getLevel() * (maxAmp / amp);
//
//     /**
//      * 画面中央の円を描画する
//      */
//     draw.drawCenterCircle({
//       p,
//       radius: initialCenterCircleRadius * level * Math.pow(1.5, 3),
//     });
//
//     /**
//      * 円弧上に波形データを描画する
//      */
//     draw.drawBarOnArc({
//       p,
//       bufferSize,
//       offset: 7,
//       waveform,
//       radius: initialRadius * level * Math.pow(1.1, 5) + 50,
//       amp,
//       maxAmp
//     });
//
//     /**
//      * 複数の頂点を指定し、頂点間の線を描画する
//      */
//     draw.drawVertex({
//       p,
//       bufferSize,
//       offset: 30,
//       waveform,
//       radius: initialRadius * level * Math.pow(1.1, 3) + 100,
//       amp,
//       maxAmp
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


/***/ })

/******/ });
!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=14)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return(0,i.default)()?function(){var e="",t=location.pathname.split("/");t=t.filter(function(e){return""!==e});for(var n=0,r=t.length-1;n<r;n+=1)n===t.length-1?e+="..":e+="../";return e}():""};var r=n(2),i=function(e){return e&&e.__esModule?e:{default:e}}(r)},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return-1!==location.host.indexOf("github.io")}},,function(e,t,n){"use strict";function r(e,t,n,r,i){return(e-t)/(n-t)*(i-r)+r}Object.defineProperty(t,"__esModule",{value:!0}),t.map=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(){function e(t){var n=t.audioCtx,i=t.buffer,u=t.smoothing,o=void 0===u?.8:u;r(this,e),this.souce=n.createBufferSource(),this.souce.buffer=i,this.gain=n.createGain(),this.analyser=n.createAnalyser(),this.analyser.smoothingTimeConstant=o,this.fftSize=this.analyser.frequencyBinCount,this.freqs=new Uint8Array(this.analyser.frequencyBinCount),this.times=new Uint8Array(this.analyser.frequencyBinCount),this.souce.connect(this.gain),this.gain.connect(this.analyser),this.analyser.connect(n.destination)}return i(e,[{key:"start",value:function(){this.souce.start(0)}},{key:"setVolume",value:function(e){this.gain.gain.value=e}},{key:"mute",value:function(){this.gain.gain.value=0}},{key:"disconnect",value:function(){this.souce.disconnect()}},{key:"frequencySpectrum",value:function(e,t){var n=this;if(this.analyser.getByteFrequencyData(this.freqs),void 0===e&&void 0===t)return this.freqs;var r=0,i=[];return this.freqs.forEach(function(u,o){(r=44100*o/n.analyser.fftSize)>e&&r<t&&i.push(u)}),i}},{key:"AboveAverageFrequencySpectrum",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.analyser.getByteFrequencyData(this.freqs);var t=this.freqs.reduce(function(e,t){return e+t},0)/this.fftSize;return this.freqs.filter(function(e){return e>t}).map(function(n){return(n-t)*e})}},{key:"adjustedFrequencySpectrum",value:function(){this.analyser.getByteFrequencyData(this.freqs);var e=this.freqs.reduce(function(e,t){return e+t},0)/this.fftSize;return this.freqs.map(function(t){return t>e?t-e:0})}},{key:"amplitudeLevel",value:function(){return this.analyser.getByteTimeDomainData(this.times),Math.sqrt(this.times.map(function(e){return e*e}).reduce(function(e,t){return e+t}))}},{key:"deviation",value:function(e){var t=e.reduce(function(e,t){return e+t},0)/e.length;return e.map(function(e){return e>t?e-t:0})}}]),e}();t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.audioCtx,n=e.url;return new Promise(function(e,r){var i=new XMLHttpRequest;i.open("GET",n,!0),i.responseType="arraybuffer",i.onload=function(){t.decodeAudioData(i.response,function(t){t||(console.log("error"),r()),e(t)},function(e){console.log("decodeAudioData error"),r()})},i.onerror=function(){console.log("Loader: XHR error"),r()},i.send()})}},,,,,,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){for(var t=0;t<1024;t+=1)q[t]=0,_[t]=0;b=new a.default({audioCtx:m,buffer:e,smoothing:.5}),b.setVolume(.2),b.start()}function u(){requestAnimationFrame(u),g.fillStyle="rgba(0, 0, 0, 0.9)",g.fillRect(0,0,y,p);var e=b.amplitudeLevel(),t=b.AboveAverageFrequencySpectrum(M),n=t.length;g.save(),g.globalAlpha=.8,t.forEach(function(t,r){var i=c.map(r,0,n,0,360),u=window.innerWidth>window.innerHeight?window.innerWidth/8:window.innerHeight/8,o=c.map(r,0,n,0,u+c.map(e,0,255,0,200)),a=c.map(t,0,255,0,25)*M;_[r]+=c.map(t,0,255,0,.05),_[r]>5&&(_[r]=0),q[r]+=_[r],g.save(),g.translate(y/2,p/2),g.rotate(q[r]*Math.PI/180),g.fillStyle="hsl("+i+", 100%, 50%)",g.beginPath(),g.arc(o,0,a,0,2*Math.PI,!1),g.fill(),g.restore()}),g.restore()}var o=n(5),a=r(o),s=n(4),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(s),f=n(6),l=r(f),d=n(0),h=r(d),v=document.getElementById("canvas"),y=0,p=0;v.width=y=window.innerWidth,v.height=p=window.innerHeight;var g=v.getContext("2d");window.addEventListener("resize",function(){v.width=y=window.innerWidth,v.height=p=window.innerHeight});var m=new(window.AudioContext||window.webkitAudioContext),w=(0,h.default)()+"/sound/time_leap_inst_free_ver1.mp3",b=null,q=[],_=[],M=Math.pow(1.1,3);(0,l.default)({audioCtx:m,url:w}).then(function(e){i(e),u()})}]);
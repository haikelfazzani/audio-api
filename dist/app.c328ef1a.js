// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"event-emiter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, listener) {
      var _this = this;

      if (_typeof(this.events[event]) !== 'object') {
        this.events[event] = [];
      }

      this.events[event].push(listener);
      return function () {
        return _this.removeListener(event, listener);
      };
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      if (_typeof(this.events[event]) === 'object') {
        var idx = this.events[event].indexOf(listener);

        if (idx > -1) {
          this.events[event].splice(idx, 1);
        }
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (_typeof(this.events[event]) === 'object') {
        this.events[event].forEach(function (listener) {
          return listener.apply(_this2, args);
        });
      }
    }
  }, {
    key: "once",
    value: function once(event, listener) {
      var _this3 = this;

      var remove = this.on(event, function () {
        remove();

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        listener.apply(_this3, args);
      });
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;
;
},{}],"src/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPlayer = void 0;

var _eventEmiter = _interopRequireDefault(require("./event-emiter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AudioPlayer =
/*#__PURE__*/
function () {
  function AudioPlayer(parentId) {
    var childs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'li';
    var activeClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "active";
    var loop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var loopAll = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, AudioPlayer);

    this.emitter = new _eventEmiter.default();
    this.audio = new Audio();
    this.tracks = []; // list of tracks

    this.currentTrackIndex = 0;
    this.i = 0; // index of each audio stored in the array : tracks

    this.parentId = parentId; // example ul elements

    this.childs = childs; // example li elements

    this.duration = this.audio.duration;
    this.hasChild = false; // parent element (ul) has childs (li)

    this.activeClass = activeClass; // active track class (css)

    this.loopAll = loopAll; // loop all tracks ( : boolean)

    this.audio.loop = loop; // loop single track ( : boolean)

    this.loopAllTacks(); // ( : method)
  }

  _createClass(AudioPlayer, [{
    key: "addTrack",
    value: function addTrack(event) {
      event.preventDefault();

      var audioFiles = _toConsumableArray(event.target.files);

      this.getTracks(audioFiles);
      this.emitter.emit('haschild', this.hasChild = true);
    }
  }, {
    key: "getTracks",
    value: function getTracks(audioFiles) {
      var _this = this;

      audioFiles.map(function (audio) {
        if (!_this.tracks.some(function (_ref) {
          var trackName = _ref.trackName;
          return trackName === audio.name;
        })) {
          _this.createPlayList(audio);

          _this.tracks.push({
            trackName: audio.name,
            name: URL.createObjectURL(audio)
          });
        }
      });
      return this.tracks;
    } // on child element click , play track

  }, {
    key: "onChildPlay",
    value: function onChildPlay() {
      var _this2 = this;

      this.emitter.on('haschild', function (hasChild) {
        if (hasChild) {
          _toConsumableArray(_this2.parentId.childNodes).map(function (child, index) {
            _this2.emitter.removeListener('haschild', _this2.hasChild);

            child.onclick = function () {
              _this2.removeActiveClass();

              child.classList.add(_this2.activeClass);
              _this2.currentTrackIndex = index;

              _this2.playCurrentByIndex(index);
            };
          });
        }
      });
    } // create li list from tracks after converting links to urls object

  }, {
    key: "createPlayList",
    value: function createPlayList(url) {
      this.createElemnt(this.parentId, this.childs, url.name);
    }
    /* ------- Audio Controls -------- */

  }, {
    key: "playTrack",
    value: function playTrack() {
      if (this.tracks.length > 0) {
        this.removeActiveClass();
        this.addActiveClassByIndex(this.currentTrackIndex);
        this.playCurrentByIndex(this.currentTrackIndex);
      }
    }
  }, {
    key: "pauseTack",
    value: function pauseTack() {
      if (this.audio.paused) this.audio.play();else this.audio.pause();
    }
  }, {
    key: "stopTrack",
    value: function stopTrack() {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }, {
    key: "nextTack",
    value: function nextTack() {
      if (this.tracks.length > 0) {
        this.removeActiveClassByIndex(this.currentTrackIndex);
        this.currentTrackIndex++;
        this.currentTrackIndex = this.currentTrackIndex > this.tracks.length - 1 ? 0 : this.currentTrackIndex;
        this.addActiveClassByIndex(this.currentTrackIndex);
        this.playCurrentByIndex(this.currentTrackIndex);
      }
    }
  }, {
    key: "prevTack",
    value: function prevTack() {
      if (this.tracks.length > 0) {
        this.removeActiveClassByIndex(this.currentTrackIndex);
        this.currentTrackIndex--;
        this.currentTrackIndex = this.currentTrackIndex < 0 ? this.tracks.length - 1 : this.currentTrackIndex;
        this.addActiveClassByIndex(this.currentTrackIndex);
        this.playCurrentByIndex(this.currentTrackIndex);
      }
    }
  }, {
    key: "muteTack",
    value: function muteTack() {
      this.audio.muted = this.audio.muted === false ? true : false;
    }
  }, {
    key: "volPlus",
    value: function volPlus() {
      return this.audio.volume = this.audio.volume < 1 ? this.audio.volume + 0.1 : 0.9;
    }
  }, {
    key: "volMinus",
    value: function volMinus() {
      return this.audio.volume = this.audio.volume > 0.1 ? this.audio.volume - 0.1 : 0.1;
    } // loop single track

  }, {
    key: "loopTack",
    value: function loopTack() {
      this.loopAll = false;
      this.audio.loop = this.audio.loop ? false : true;
    } // loop all tracks list

  }, {
    key: "playAll",
    value: function playAll() {
      this.audio.loop = false;
      this.loopAll = this.loopAll ? false : true;
      this.emitter.emit('playall', this.loopAll);
      return this.loopAll;
    } // this method listen for the event 'playall' emited by playAll() method

  }, {
    key: "loopAllTacks",
    value: function loopAllTacks() {
      var _this3 = this;

      this.emitter.on('playall', function (playall) {
        _this3.audio.onended = function () {
          if (playall) {
            _this3.removeActiveClassByIndex(_this3.currentTrackIndex);

            _this3.currentTrackIndex++;
            _this3.currentTrackIndex = _this3.currentTrackIndex > _this3.tracks.length - 1 ? 0 : _this3.tracks.length - 1;

            _this3.addActiveClassByIndex(_this3.currentTrackIndex);

            _this3.playCurrentByIndex(_this3.currentTrackIndex);
          }
        };
      });
    } // play current track by its index passed in parameters

  }, {
    key: "playCurrentByIndex",
    value: function playCurrentByIndex(trackIndex) {
      this.audio.src = this.tracks[trackIndex].name;
      this.audio.play();
    }
    /* add & remove a active class to the current child play (css) */

  }, {
    key: "addActiveClassByIndex",
    value: function addActiveClassByIndex() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.parentId.childNodes[index].classList.add(this.activeClass);
    }
  }, {
    key: "removeActiveClass",
    value: function removeActiveClass() {
      var _this4 = this;

      _toConsumableArray(this.parentId.childNodes).map(function (child) {
        return child.classList.remove(_this4.activeClass);
      });
    }
  }, {
    key: "removeActiveClassByIndex",
    value: function removeActiveClassByIndex() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.parentId.childNodes[index].classList.remove(this.activeClass);
    } // create a child element and appended to the parent element passed in the constructor

  }, {
    key: "createElemnt",
    value: function createElemnt() {
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ul";
      var child = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "li";
      var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var element = document.createElement(child);
      element.innerHTML = text;
      parent.appendChild(element);
    }
  }]);

  return AudioPlayer;
}();

exports.AudioPlayer = AudioPlayer;
},{"./event-emiter":"event-emiter.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _api = require("./src/api");

window.onload = function () {
  var btnPlay = document.getElementById('btn-play'),
      btnPause = document.getElementById('btn-pause'),
      btnStop = document.getElementById('btn-stop'),
      btnNext = document.getElementById('btn-next'),
      btnPrev = document.getElementById('btn-previous'),
      btnMute = document.getElementById('btn-mute'),
      btnPlus = document.getElementById('btn-plus'),
      btnMinus = document.getElementById('btn-minus'),
      btnLoop = document.getElementById('btn-loop'),
      btnLoopAll = document.getElementById('btn-loop-all');
  var inputFile = document.getElementById('input-file'),
      ul = document.getElementById('audio-list');
  /**  */

  var audio = new _api.AudioPlayer(ul, 'li');

  inputFile.onchange = function (event) {
    return audio.addTrack(event);
  }; // on click on audio in the list , the audio play the current


  audio.onChildPlay();
  /* Audio Controls */

  btnPlay.onclick = function () {
    return audio.playTrack();
  };

  btnPause.onclick = function () {
    return audio.pauseTack();
  };

  btnStop.onclick = function () {
    return audio.stopTrack();
  };

  btnMute.onclick = function () {
    return audio.muteTack();
  };

  btnNext.onclick = function () {
    return audio.nextTack();
  };

  btnPrev.onclick = function () {
    return audio.prevTack();
  };

  btnPlus.onclick = function () {
    return audio.volPlus();
  };

  btnMinus.onclick = function () {
    return audio.volMinus();
  }; // get the current audio duration


  audio.onloadedmetadata = function () {
    console.log(audio.duration);
  };

  btnLoop.onclick = function () {
    return audio.loopTack();
  };

  btnLoopAll.onclick = function () {
    return audio.playAll();
  };
};
},{"./src/api":"src/api.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49262" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.map
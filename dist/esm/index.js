import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as React from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":root {\r\n    --color-input: #ababac;\r\n    --font-size-audio:15px;\r\n    --back-box: #737272;\r\n    --icon-color: #efecec;\r\n    --icon-color-hover: #c9c6c6;\r\n    --icon-color-active: #efecec;\r\n}\r\n\r\n\r\n.box-flex {\r\n    width: 100%;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.audio-box{\r\n    padding-top: 5px;\r\n    padding-bottom:  5px;\r\n    color: #f4f4f9;;\r\n    font-size: var(--font-size-audio);\r\n    width: 100%;\r\n    height: fit-content;\r\n    background-color: var(--back-box);\r\n}\r\n.audio-input{\r\n    width: 100%;\r\n}\r\n.audio-input-volume{\r\n    width: 100px;\r\n    margin-right: 10px;\r\n}\r\n.audio-timer{\r\n    text-align: center;\r\n    width: 40px;\r\n    padding: 0 10px;\r\n}\r\n.audio-label-host{\r\n    width: 100%;\r\n    padding-left: 15px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    text-align: left;\r\n}\r\n.no-select {\r\n    -webkit-touch-callout: none; /* iOS Safari */\r\n    -webkit-user-select: none; /* Safari */\r\n    -khtml-user-select: none; /* Konqueror HTML */\r\n    -moz-user-select: none; /* Old versions of Firefox */\r\n    -ms-user-select: none; /* Internet Explorer/Edge */\r\n    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */\r\n}\r\n.audio-icon{\r\n    margin: 0 10px;\r\n    color: var(--icon-color);\r\n    cursor: pointer;\r\n}\r\n.audio-icon:hover{\r\n    color: var(--icon-color-hover);\r\n}\r\n.audio-icon:active{\r\n    color: var(--icon-color-active);\r\n}\r\n.icon-volume{\r\n    color: var(--color-input);\r\n}\r\n\r\n\r\n\r\n\r\n.audio-box input[type=\"range\"] {\r\n    background-color: transparent;\r\n    -webkit-appearance: none;\r\n    -moz-appearance: none;\r\n    appearance: none;\r\n\r\n    height: 18px;\r\n    border: none;\r\n    border-radius: 4px;\r\n    overflow: hidden;\r\n}\r\n\r\n\r\n.audio-box input[type=\"range\"]::-webkit-slider-thumb {\r\n    -webkit-appearance: none;\r\n    appearance: none;\r\n    background-color: var(--color-input);\r\n    border: 0 solid var(--color-input);;\r\n    border-radius: 50%;\r\n    height: 18px;\r\n    width: 18px;\r\n    margin-top: -7px;\r\n    box-shadow: calc(-100vmax - 18px) 0 0 100vmax var(--color-input);;\r\n    clip-path: polygon(\r\n            100% 0,\r\n            2px 0,\r\n            0 7px,\r\n            -100vmax 7px,\r\n            -100vmax 11px,\r\n            0 11px,\r\n            2px 100%,\r\n            100% 100%\r\n    );\r\n}\r\n\r\n\r\n.audio-box input[type=\"range\"]::-moz-range-thumb {\r\n    -moz-appearance: none;\r\n    appearance: none;\r\n    background-color: var(--color-input);;\r\n    border: 0 solid var(--color-input);;\r\n    border-radius: 50%;\r\n    height: 18px;\r\n    width: 18px;\r\n    margin-top: -7px;\r\n}\r\n\r\n.audio-box input[type=\"range\"]::-webkit-slider-runnable-track {\r\n    height: 4px;\r\n    border-radius: 4px;\r\n    border: 0 solid #fff;\r\n    box-shadow: 0 0 0 #353535;\r\n    background: #d7d7d7;\r\n}\r\n\r\n.audio-box input[type=\"range\"]::-moz-range-track {\r\n    height: 4px;\r\n    border-radius: 4px;\r\n    border: 0 solid #fff;\r\n    box-shadow: 0 0 0 #353535;\r\n    background: #d7d7d7;\r\n}\r\n.host-loop{\r\n    width: fit-content;\r\n    text-align: left;\r\n    padding-left: 5px;\r\n}\r\n.host-loop-mode2{\r\n    padding-top: 5px;\r\n    width: fit-content;\r\n\r\n}\r\n.host-volume{\r\n    width: fit-content;\r\n}\r\n.host-volume-mode2{\r\n    width: fit-content;\r\n}\r\n.host-buttons{\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n.host-buttons-mode2{\r\n    width: fit-content;\r\n    align-items: center;\r\n    justify-content: center;\r\n}";
styleInject(css_248z);

var BsrAudio = /** @class */ (function (_super) {
    __extends(BsrAudio, _super);
    function BsrAudio(props) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, props) || this;
        _this.audioRef = React.createRef();
        _this.curMode = '';
        _this.renderLoop = function () {
            if (_this.state.loop) {
                return (jsxs("svg", __assign({ stroke: "currentColor", fill: "none", strokeWidth: "2", viewBox: "0 0 24 24", strokeLinecap: "round", strokeLinejoin: "round", className: "audio-icon", height: "20", width: "20", xmlns: "http://www.w3.org/2000/svg", onClick: function () {
                        _this.setState({ loop: !_this.state.loop });
                    } }, { children: [jsx("path", { d: "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" }), jsx("path", { d: "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" })] })));
            }
            else {
                return (jsxs("svg", __assign({ stroke: "currentColor", fill: "none", strokeWidth: "2", viewBox: "0 0 24 24", strokeLinecap: "round", strokeLinejoin: "round", className: "audio-icon", height: "20", width: "20", xmlns: "http://www.w3.org/2000/svg", onClick: function () {
                        _this.setState({ loop: !_this.state.loop });
                    } }, { children: [jsx("path", { d: "M4 12v-3c0 -1.336 .873 -2.468 2.08 -2.856m3.92 -.144h10m-3 -3l3 3l-3 3" }), jsx("path", { d: "M20 12v3a3 3 0 0 1 -.133 .886m-1.99 1.984a3 3 0 0 1 -.877 .13h-13m3 3l-3 -3l3 -3" }), jsx("path", { d: "M3 3l18 18" })] })));
            }
        };
        _this.handleLoadedMetadata = function () {
            _this.setState({ duration: _this.audioRef.current.duration }, function () {
                if (_this.props.onLoadDurationTrack) {
                    _this.props.onLoadDurationTrack(_this.audioRef.current.duration);
                }
            });
        };
        _this.handleTimeUpdate = function () {
            _this.setState({ time: _this.audioRef.current.currentTime, slider: _this.audioRef.current.currentTime });
        };
        _this.playAudio = function () {
            try {
                _this.audioRef.current.play().then();
            }
            catch (err) {
                if (_this.props.onError) {
                    _this.props.onError(err);
                }
                console.error('Play error:', err);
            }
        };
        _this.handleSliderChange = function (event) {
            _this.audioRef.current.currentTime = parseFloat(event.target.value);
            _this.setState({ slider: parseFloat(event.target.value) });
        };
        _this.handleVolumeChange = function (event) {
            _this.audioRef.current.volume = parseFloat(event.target.value);
            _this.setState({ volume: parseFloat(event.target.value) });
        };
        _this.renderButton = function (mode) {
            if (mode === void 0) { mode = 1; }
            switch (_this.state.button) {
                case 0: {
                    return (jsx("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 512 512", className: "audio-icon", height: mode === 1 ? 25 : 20, width: mode === 1 ? 25 : 20, xmlns: "http://www.w3.org/2000/svg", onClick: function () {
                            _this.playAudio();
                        } }, { children: jsx("path", { d: "M96 52v408l320-204L96 52z" }) })));
                }
                case -1: {
                    return (jsx("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 512 512", className: "audio-icon", height: mode === 1 ? 25 : 20, width: mode === 1 ? 25 : 20, xmlns: "http://www.w3.org/2000/svg", onClick: function () {
                            _this.audioRef.current.pause();
                        } }, { children: jsx("path", { d: "M96 448h106.7V64H96v384zM309.3 64v384H416V64H309.3z" }) })));
                }
            }
        };
        _this.SetVolume = function (volume) {
            _this.audioRef.current.volume = volume;
            _this.setState({ volume: volume });
        };
        _this.GerAudioTag = function () {
            return _this.audioRef;
        };
        _this.curMode = (_a = _this.props.mode) !== null && _a !== void 0 ? _a : 'mode1';
        _this.state = {
            loop: (_b = _this.props.loop) !== null && _b !== void 0 ? _b : false,
            volume: (_c = _this.props.volume) !== null && _c !== void 0 ? _c : 0.5,
            time: 0,
            button: 0,
            duration: 0,
            slider: 0,
            random: (_d = _this.props.random) !== null && _d !== void 0 ? _d : false,
        };
        return _this;
    }
    BsrAudio.prototype.componentDidMount = function () {
        if (this.audioRef.current) {
            this.audioRef.current.volume = this.state.volume;
        }
    };
    BsrAudio.prototype.renderRandom = function () {
        var _this = this;
        if (!this.props.useButtonRandom)
            return null;
        if (this.state.random) {
            return (jsx("svg", __assign({ stroke: "currentColor", fill: "currentColor", className: "audio-icon", strokeWidth: "0", viewBox: "0 0 32 32", height: "20", width: "20", xmlns: "http://www.w3.org/2000/svg", onClick: function () {
                    _this.setState({ random: !_this.state.random }, function () {
                        if (_this.props.onRandomChange) {
                            _this.props.onRandomChange(_this.state.random);
                        }
                    });
                } }, { children: jsx("path", { d: "M 23 3 L 23 7 L 18.40625 7 L 18.125 7.5 L 14.5 13.96875 L 10.59375 7 L 4 7 L 4 9 L 9.40625 9 L 13.34375 16 L 9.40625 23 L 4 23 L 4 25 L 10.59375 25 L 19.59375 9 L 23 9 L 23 13 L 28 8 Z M 16.78125 18 L 15.625 20.0625 L 18.40625 25 L 23 25 L 23 29 L 28 24 L 23 19 L 23 23 L 19.59375 23 Z" }) })));
        }
        else {
            return (jsxs("svg", __assign({ stroke: "currentColor", fill: "none", strokeWidth: "2", className: "audio-icon", viewBox: "0 0 24 24", strokeLinecap: "round", strokeLinejoin: "round", height: "20", width: "20", xmlns: "http://www.w3.org/2000/svg", onClick: function () {
                    _this.setState({ random: !_this.state.random }, function () {
                        if (_this.props.onRandomChange) {
                            _this.props.onRandomChange(_this.state.random);
                        }
                    });
                } }, { children: [jsx("path", { d: "M21 17l-18 0" }), jsx("path", { d: "M18 4l3 3l-3 3" }), jsx("path", { d: "M18 20l3 -3l-3 -3" }), jsx("path", { d: "M21 7l-18 0" })] })));
        }
    };
    BsrAudio.prototype.SetPlay = function () {
        this.playAudio();
    };
    BsrAudio.prototype.SetPause = function () {
        this.audioRef.current.pause();
    };
    BsrAudio.prototype.SetTimer = function (time) {
        this.audioRef.current.currentTime = time;
        this.setState({ slider: time });
    };
    BsrAudio.prototype.mode1 = function () {
        var _this = this;
        return (jsxs("div", __assign({ id: this.props.id, className: 'audio-box no-select', style: this.props.style }, { children: [jsxs("div", __assign({ className: 'box-flex' }, { children: [jsx("div", __assign({ className: 'audio-label-host' }, { children: this.props.label })), jsx("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", id: "a-b-1", className: "audio-icon", height: "20", width: "20", xmlns: "http://www.w3.org/2000/svg", style: { display: this.props.useButtonClose ? 'block' : 'none' }, onClick: function () {
                                if (_this.props.onClose) {
                                    _this.props.onClose();
                                }
                            } }, { children: jsx("path", { fill: "none", strokeWidth: "2", d: "M3,3 L21,21 M3,21 L21,3" }) }))] })), this.renderAudio(), jsxs("div", __assign({ className: 'box-flex' }, { children: [jsx("div", __assign({ className: 'audio-timer' }, { children: formatTime(this.state.time) })), jsx("input", { className: 'audio-input', type: "range", min: "0", max: this.state.duration, value: this.state.slider, onChange: this.handleSliderChange }), jsx("div", __assign({ className: 'audio-timer' }, { children: formatTime(this.state.duration, true) }))] })), jsxs("div", __assign({ className: 'box-flex' }, { children: [jsx("div", __assign({ className: 'host-loop' }, { children: this.renderLoop() })), jsx("div", __assign({ className: 'host-loop' }, { children: this.renderRandom() })), jsxs("div", __assign({ className: 'box-flex host-buttons' }, { children: [this.props.useButtonOpenPrevNext && (jsxs("svg", __assign({ onClick: function () {
                                        if (_this.props.onPrevEvent) {
                                            _this.props.onPrevEvent();
                                        }
                                    }, stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", id: "a-b-2", className: "audio-icon", height: "25", width: "25", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx("path", { d: "M20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" }), jsx("path", { d: "M9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" })] }))), this.renderButton(), this.props.useButtonOpenPrevNext && (jsxs("svg", __assign({ onClick: function () {
                                        if (_this.props.onNextEvent) {
                                            _this.props.onNextEvent();
                                        }
                                    }, stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", id: "a-b-3", className: "audio-icon", height: "25", width: "25", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx("path", { d: "M2 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" }), jsx("path", { d: "M13 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" })] })))] })), jsxs("div", __assign({ className: 'box-flex host-volume' }, { children: [jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 512 512", className: "icon-volume", height: "25", width: "25", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx("path", { d: "M264 416.19a23.92 23.92 0 0 1-14.21-4.69l-.66-.51-91.46-75H88a24 24 0 0 1-24-24V200a24 24 0 0 1 24-24h69.65l91.46-75 .66-.51A24 24 0 0 1 288 119.83v272.34a24 24 0 0 1-24 24zM352 336a16 16 0 0 1-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82 0-19.36-4.66-37.92-14.25-56.73a16 16 0 0 1 28.5-14.54C378.2 208.16 384 231.47 384 256c0 23.83-6 47.78-17.7 71.18A16 16 0 0 1 352 336z" }), jsx("path", { d: "M400 384a16 16 0 0 1-13.87-24C405 327.05 416 299.45 416 256c0-44.12-10.94-71.52-29.83-103.95A16 16 0 0 1 413.83 136C434.92 172.16 448 204.88 448 256c0 50.36-13.06 83.24-34.12 120a16 16 0 0 1-13.88 8z" })] })), jsx("input", { className: 'audio-input-volume', type: "range", min: "0", max: "1", step: "0.01", value: this.state.volume, onChange: this.handleVolumeChange })] }))] }))] })));
    };
    BsrAudio.prototype.renderAudio = function () {
        var _this = this;
        var _a, _b, _c;
        return (jsx("audio", { autoPlay: (_a = this.props.autoPlay) !== null && _a !== void 0 ? _a : false, preload: (_b = this.props.preload) !== null && _b !== void 0 ? _b : 'auto', src: this.props.url, ref: this.audioRef, loop: (_c = this.state.loop) !== null && _c !== void 0 ? _c : false, onLoadedMetadata: this.handleLoadedMetadata, onTimeUpdate: this.handleTimeUpdate, onPlay: function () {
                _this.setState({ button: -1 });
                if (_this.props.onPlay) {
                    _this.props.onPlay();
                }
            }, onError: function (event) {
                if (_this.props.onError) {
                    _this.props.onError(event);
                }
                console.error('Audio error:', event);
            }, onPause: function () {
                _this.setState({ button: 0 });
                if (_this.props.onPause) {
                    _this.props.onPause();
                }
            }, onEnded: function () {
                if (_this.props.onEnded) {
                    _this.props.onEnded();
                }
            }, onVolumeChange: function (event) {
                if (_this.props.onVolumeChange) {
                    _this.props.onVolumeChange(event);
                }
            } }));
    };
    BsrAudio.prototype.mode2 = function () {
        var _this = this;
        return (jsxs("div", __assign({ id: this.props.id, className: 'audio-box no-select', style: this.props.style }, { children: [this.renderAudio(), jsxs("div", __assign({ className: 'box-flex' }, { children: [jsx("div", __assign({ className: 'host-loop-mode2' }, { children: this.renderLoop() })), jsx("div", __assign({ className: 'host-loop-mode2' }, { children: this.renderRandom() })), jsxs("div", __assign({ className: 'box-flex host-buttons-mode2' }, { children: [this.props.useButtonOpenPrevNext && (jsxs("svg", __assign({ onClick: function () {
                                        if (_this.props.onPrevEvent) {
                                            _this.props.onPrevEvent();
                                        }
                                    }, stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", id: "a-b-2", className: "audio-icon", height: "20", width: "20", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx("path", { d: "M20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" }), jsx("path", { d: "M9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" })] }))), this.renderButton(2), this.props.useButtonOpenPrevNext && (jsxs("svg", __assign({ onClick: function () {
                                        if (_this.props.onNextEvent) {
                                            _this.props.onNextEvent();
                                        }
                                    }, stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", id: "a-b-3", className: "audio-icon", height: "20", width: "20", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx("path", { d: "M2 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" }), jsx("path", { d: "M13 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z" })] })))] })), jsxs("div", __assign({ className: 'box-flex' }, { children: [jsx("div", __assign({ className: 'audio-timer' }, { children: formatTime(this.state.time) })), jsx("input", { className: 'audio-input', type: "range", min: "0", max: this.state.duration, value: this.state.slider, onChange: this.handleSliderChange }), jsx("div", __assign({ className: 'audio-timer' }, { children: formatTime(this.state.duration, true) }))] })), jsxs("div", __assign({ className: 'box-flex host-volume-mode2' }, { children: [jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 512 512", className: "icon-volume", height: "25", width: "25", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx("path", { d: "M264 416.19a23.92 23.92 0 0 1-14.21-4.69l-.66-.51-91.46-75H88a24 24 0 0 1-24-24V200a24 24 0 0 1 24-24h69.65l91.46-75 .66-.51A24 24 0 0 1 288 119.83v272.34a24 24 0 0 1-24 24zM352 336a16 16 0 0 1-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82 0-19.36-4.66-37.92-14.25-56.73a16 16 0 0 1 28.5-14.54C378.2 208.16 384 231.47 384 256c0 23.83-6 47.78-17.7 71.18A16 16 0 0 1 352 336z" }), jsx("path", { d: "M400 384a16 16 0 0 1-13.87-24C405 327.05 416 299.45 416 256c0-44.12-10.94-71.52-29.83-103.95A16 16 0 0 1 413.83 136C434.92 172.16 448 204.88 448 256c0 50.36-13.06 83.24-34.12 120a16 16 0 0 1-13.88 8z" })] })), jsx("input", { className: 'audio-input-volume', type: "range", min: "0", max: "1", step: "0.01", value: this.state.volume, onChange: this.handleVolumeChange })] }))] }))] })));
    };
    BsrAudio.prototype.render = function () {
        return (jsx(Fragment, { children: this.curMode === 'mode1' ? this.mode1() : this.mode2() }));
    };
    return BsrAudio;
}(React.Component));
var formatTime = function (time, isTotal) {
    if (isTotal === void 0) { isTotal = false; }
    if (isTotal && time === 0) {
        return '-:-';
    }
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return "".concat(minutes, ":").concat(seconds < 10 ? '0' : '').concat(seconds);
};

export { BsrAudio };

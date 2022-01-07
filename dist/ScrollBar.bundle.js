/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/ScrollBar.js":
/*!*****************************!*\
  !*** ./src/js/ScrollBar.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _scss_ScrollBar_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/ScrollBar.scss */ \"./src/scss/ScrollBar.scss\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\nvar MAX_SIZE = 15;\n\nvar ScrollBar = /*#__PURE__*/function () {\n  /**\r\n   * @summary Custom JavaScript ScrollBar for any conatiner\r\n   * @author Arthur Beaulieu\r\n   * @since September 2018\r\n   * @description Build a custom ScrollBar according to the given DOM target, inspired from https://github.com/buzinas/simple-scrollbar <3\r\n   * @param {object} options - The ScrollBar options\r\n   * @param {object} options.target - The DOM node to add a ScrollBar to\r\n   **/\n  function ScrollBar(options) {\n    _classCallCheck(this, ScrollBar);\n\n    this._target = options.target; // Parent div to put the ScrollBar in\n\n    this._horizontal = options.horizontal || false; // By default, scrollbar is vertical\n\n    this._wrapper = {}; // Wrap both container and ScrollBar\n\n    this._container = {}; // Content to scroll + browser ScrollBar (18px offset)\n\n    this._bar = {}; // ScrollBar itself\n\n    this._scrollRatio = 0;\n    this._lastPageX = 0; // For horizontal scroll\n\n    this._lastPageY = 0; // For vertical scroll\n\n    this._init();\n\n    this._events();\n\n    this._updateScrollBar();\n  } //  --------------------------------  PRIVATE METHODS  --------------------------------  //\n\n  /**\r\n   * @method\r\n   * @name _init\r\n   * @private\r\n   * @memberof ScrollBar\r\n   * @author Arthur Beaulieu\r\n   * @since September 2018\r\n   * @description Build DOM hierrarchy, ScrollBar double wraps the content to append its custom bar\r\n   **/\n\n\n  _createClass(ScrollBar, [{\n    key: \"_init\",\n    value: function _init() {\n      var fragment = document.createDocumentFragment(); // Creating associated elements (wrapper, container, bar)\n\n      this._target.classList.add('scrollbar-container');\n\n      this._wrapper = document.createElement('DIV');\n\n      this._wrapper.setAttribute('class', 'scrollbar-wrapper');\n\n      this._container = document.createElement('DIV'); // Append scroll class\n\n      if (this._horizontal === true) {\n        this._container.setAttribute('class', 'horizontal-scrollbar-content');\n      } else {\n        this._container.setAttribute('class', 'scrollbar-content');\n      } // Move target children into this container\n\n\n      while (this._target.firstChild) {\n        this._container.appendChild(this._target.firstChild);\n      } // Link DOM elements\n\n\n      this._wrapper.appendChild(this._container);\n\n      fragment.appendChild(this._wrapper); // Append fragment to DOM target\n\n      this._target.appendChild(fragment); // Append the scroll depending on scrollbar position\n\n\n      if (this._horizontal === true) {\n        this._target.insertAdjacentHTML('beforeend', '<div class=\"horizontal-scroll\"></div>'); // Append scroll as last child\n\n      } else {\n        this._target.insertAdjacentHTML('beforeend', '<div class=\"scroll\"></div>'); // Append scroll as last child\n\n      }\n\n      this._bar = this._target.lastChild; // Get content from line just over this!\n      // Methods auto binding with this to be able to add/remove listeners easily\n\n      this._drag = this._drag.bind(this);\n      this._stopDrag = this._stopDrag.bind(this);\n    }\n    /**\r\n     * @method\r\n     * @name _events\r\n     * @private\r\n     * @memberof ScrollBar\r\n     * @author Arthur Beaulieu\r\n     * @since September 2018\r\n     * @description Handle ScrollBar mouse events\r\n     **/\n\n  }, {\n    key: \"_events\",\n    value: function _events() {\n      window.addEventListener('resize', this._updateScrollBar.bind(this));\n\n      this._container.addEventListener('scroll', this._updateScrollBar.bind(this));\n\n      this._container.addEventListener('mouseenter', this._updateScrollBar.bind(this)); //    this._container.addEventListener('mousemove', this._updateScrollBar.bind(this));\n\n\n      this._bar.addEventListener('mousedown', this._barClicked.bind(this));\n    }\n    /**\r\n     * @method\r\n     * @name _drag\r\n     * @private\r\n     * @memberof ScrollBar\r\n     * @author Arthur Beaulieu\r\n     * @since September 2018\r\n     * @description Handle the drag animation of the bar\r\n     * @param {object} event - The Mouse event from this._events()\r\n     **/\n\n  }, {\n    key: \"_drag\",\n    value: function _drag(event) {\n      var _this = this;\n\n      if (this._horizontal === true) {\n        var delta = event.pageX - this._lastPageX;\n        this._lastPageX = event.pageX;\n        requestAnimationFrame(function () {\n          _this._container.scrollLeft += delta / _this._scrollRatio;\n        });\n      } else {\n        var _delta = event.pageY - this._lastPageY;\n\n        this._lastPageY = event.pageY;\n        requestAnimationFrame(function () {\n          _this._container.scrollTop += _delta / _this._scrollRatio;\n        });\n      }\n    }\n    /**\r\n     * @method\r\n     * @name _barClicked\r\n     * @private\r\n     * @memberof ScrollBar\r\n     * @author Arthur Beaulieu\r\n     * @since September 2018\r\n     * @description Add document events when bar is clicked to track the mouse movement in parent\r\n     * @param {object} event - The Mouse event from this._events()\r\n     **/\n\n  }, {\n    key: \"_barClicked\",\n    value: function _barClicked(event) {\n      var _this2 = this;\n\n      if (this._horizontal === true) {\n        this._lastPageX = event.pageX;\n      } else {\n        this._lastPageY = event.pageY;\n      }\n\n      this._bar.classList.add('scrollbar-grabbed');\n\n      document.body.classList.add('scrollbar-grabbed');\n      requestAnimationFrame(function () {\n        document.addEventListener('mousemove', _this2._drag);\n        document.addEventListener('mouseup', _this2._stopDrag);\n      });\n    }\n    /**\r\n     * @method\r\n     * @name _stopDrag\r\n     * @private\r\n     * @memberof ScrollBar\r\n     * @author Arthur Beaulieu\r\n     * @since September 2018\r\n     * @description Remove document events when bar is released\r\n     **/\n\n  }, {\n    key: \"_stopDrag\",\n    value: function _stopDrag() {\n      this._bar.classList.remove('scrollbar-grabbed');\n\n      document.body.classList.remove('scrollbar-grabbed');\n      document.removeEventListener('mousemove', this._drag);\n      document.removeEventListener('mouseup', this._stopDrag);\n    }\n    /**\r\n     * @method\r\n     * @name _updateScrollBar\r\n     * @private\r\n     * @memberof ScrollBar\r\n     * @author Arthur Beaulieu\r\n     * @since September 2018\r\n     * @description Compute bar position according to DOM measurements\r\n     **/\n\n  }, {\n    key: \"_updateScrollBar\",\n    value: function _updateScrollBar() {\n      var _this3 = this;\n\n      if (this._horizontal === true) {\n        var totalWidth = this._container.scrollWidth;\n        var ownWidth = this._container.clientWidth;\n        var bottom = (this._target.clientHeight - this._bar.clientHeight) * -1;\n        this._scrollRatio = ownWidth / totalWidth;\n        requestAnimationFrame(function () {\n          if (_this3._scrollRatio >= 1) {\n            // Hide scrollbar if no scrolling is possible\n            _this3._bar.classList.add('hidden');\n          } else {\n            var width = Math.max(_this3._scrollRatio * 100, MAX_SIZE) * ownWidth / 100;\n            var left = _this3._container.scrollLeft / totalWidth * 100 * ownWidth / 100;\n\n            if (Math.max(_this3._scrollRatio * 100, MAX_SIZE) === MAX_SIZE) {\n              // ScrollBar has reached its minimum size\n\n              /* Here is a complex thing : scroll total height != DOM node total height. We must substract\r\n              a growing percentage (as user goes down) that is scaled after total scroll progress in %. */\n              var scrollProgressPercentage = _this3._container.scrollLeft * 100 / (totalWidth - ownWidth);\n              left = (ownWidth - width) * ((_this3._container.scrollLeft + scrollProgressPercentage * ownWidth / 100) / totalWidth * 100) / 100;\n            }\n\n            _this3._bar.classList.remove('hidden');\n\n            _this3._bar.style.cssText = \"width: \".concat(width, \"px; left: \").concat(left, \"px; bottom: \").concat(bottom, \"px;\");\n          }\n        });\n      } else {\n        var totalHeight = this._container.scrollHeight;\n        var ownHeight = this._container.clientHeight;\n        var right = (this._target.clientWidth - this._bar.clientWidth) * -1;\n        this._scrollRatio = ownHeight / totalHeight;\n        requestAnimationFrame(function () {\n          if (_this3._scrollRatio >= 1) {\n            // Hide scrollbar if no scrolling is possible\n            _this3._bar.classList.add('hidden');\n          } else {\n            var height = Math.max(_this3._scrollRatio * 100, MAX_SIZE) * ownHeight / 100;\n            var top = _this3._container.scrollTop / totalHeight * 100 * ownHeight / 100;\n\n            if (Math.max(_this3._scrollRatio * 100, MAX_SIZE) === MAX_SIZE) {\n              // ScrollBar has reached its minimum size\n\n              /* Here is a complex thing : scroll total height != DOM node total height. We must substract\r\n              a growing percentage (as user goes down) that is scaled after total scroll progress in %. */\n              var scrollProgressPercentage = _this3._container.scrollTop * 100 / (totalHeight - ownHeight);\n              top = (ownHeight - height) * ((_this3._container.scrollTop + scrollProgressPercentage * ownHeight / 100) / totalHeight * 100) / 100;\n            }\n\n            _this3._bar.classList.remove('hidden');\n\n            _this3._bar.style.cssText = \"height: \".concat(height, \"px; top: \").concat(top, \"px; right: \").concat(right, \"px;\");\n          }\n        });\n      }\n    } //  --------------------------------  PUBLIC METHODS  --------------------------------  //\n\n  }, {\n    key: \"update\",\n    value: function update() {\n      this._updateScrollBar();\n    }\n  }]);\n\n  return ScrollBar;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollBar);\n\n//# sourceURL=webpack://ScrollBar/./src/js/ScrollBar.js?");

/***/ }),

/***/ "./src/scss/ScrollBar.scss":
/*!*********************************!*\
  !*** ./src/scss/ScrollBar.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ScrollBar/./src/scss/ScrollBar.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/ScrollBar.js");
/******/ 	window.ScrollBar = __webpack_exports__["default"];
/******/ 	
/******/ })()
;
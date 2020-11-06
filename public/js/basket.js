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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/basket.js":
/*!********************************!*\
  !*** ./resources/js/basket.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function setCursorPosition(pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);else if (elem.createTextRange) {
    var range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

function mask(event) {
  var matrix = '+7 (___) ___-____',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');
  if (def.length >= val.length) val = def;
  this.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
  });

  if (event.type == 'blur') {
    if (this.value.length == 2) this.value = '';
  } else setCursorPosition(this.value.length, this);
} // function mask(event) {
// 	const keyCode = event.keyCode;
// 	const template = '+7 (___) ___-__-__',
// 		def = template.replace(/\D/g, ""),
// 		val = this.value.replace(/\D/g, "");
// 	// console.log(template);
// 	let i = 0,
// 		newValue = template.replace(/[_\d]/g, function (a) {
// 			return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
// 		});
// 	i = newValue.indexOf("_");
// 	if (i !== -1) {
// 		newValue = newValue.slice(0, i);
// 	}
// 	let reg = template.substr(0, this.value.length).replace(/_+/g,
// 		function (a) {
// 			return "\\d{1," + a.length + "}";
// 		}).replace(/[+()]/g, "\\$&");
// 	reg = new RegExp("^" + reg + "$");
// 	if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
// 		this.value = newValue;
// 	}
// 	if (event.type === "blur" && this.value.length < 5) {
// 		this.value = "";
// 	}
// }


function recalcAllPrice() {
  var orderSumm = 0;
  var deliverySumm = document.querySelector('input[name="delivery"]:checked').getAttribute('price');
  document.querySelectorAll('.price').forEach(function (elem) {
    orderSumm += Number(elem.getAttribute('price'));
  });
  var allSumm = Number(orderSumm) + Number(deliverySumm);
  var allSummElem = document.getElementById('all-price');
  allSummElem.innerHTML = allSumm;
  allSummElem.setAttribute('allsumm', allSumm);
  document.querySelector('input[name="price"]').value = orderSumm;
  document.querySelector('input[name="deliveryprice"]').value = deliverySumm;
}

document.addEventListener('DOMContentLoaded', function () {
  recalcAllPrice();
  var elems = document.getElementById('tel');
  elems.addEventListener('input', mask);
  elems.addEventListener('focus', mask);
  elems.addEventListener('blur', mask);
  var adress = document.querySelector('.adress-block');
  document.querySelectorAll('input[name="delivery"]').forEach(function (elem) {
    elem.onchange = function (event) {
      if (event.target.value == 'vrn_delivery') {
        adress.classList.remove('hide');
      } else {
        adress.classList.add('hide');
      }

      recalcAllPrice();
    };
  });
});

/***/ }),

/***/ 3:
/*!**************************************!*\
  !*** multi ./resources/js/basket.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/js/basket.js */"./resources/js/basket.js");


/***/ })

/******/ });
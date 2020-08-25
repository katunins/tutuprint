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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/gallery.js":
/*!*********************************!*\
  !*** ./resources/js/gallery.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var priceArr = new Object({
  photoprint: {
    size: {
      '10x15': 10,
      '15x21': 20
    },
    'white-border': {
      '10x15': {
        price: 0
      },
      '15x21': {
        price: 0
      }
    },
    box: {
      '10x15': {
        price: 500,
        maxcount: 100
      },
      '15x21': {
        price: 700,
        maxcount: 150
      }
    }
  },
  photocards: {
    size: {
      '10x15': 30,
      '15x21': 50
    },
    'white-border': {
      '10x15': {
        price: 0
      },
      '15x21': {
        price: 0
      }
    },
    box: {
      '10x15': {
        price: 500,
        maxcount: 15
      },
      '15x21': {
        price: 700,
        maxcount: 30
      }
    }
  }
});

function getPhotoCount() {
  var allPhotos = document.querySelectorAll('.image-box');
  var count = 0;
  allPhotos.forEach(function (el) {
    count += Number(el.getAttribute('count'));
  });
  return count;
}

function updatePrice() {
  var paramSelected = {
    product: document.querySelector('.param.active[name="product"]').attributes.value.value,
    size: document.querySelector('.param.active[name="size"]').attributes.value.value,
    'white-border': document.getElementById('white-border').checked,
    box: document.getElementById('box').checked
  };
  var pricePerOne = priceArr[paramSelected.product].size[paramSelected.size];
  var priceAdditionally = paramSelected.box ? priceArr[paramSelected.product].box[paramSelected.size].price : 0;
  var count = getPhotoCount();
  var priceToBasket = pricePerOne * count + priceAdditionally;
  document.querySelector('input[name="summ"]').value = priceToBasket;
  document.getElementById('price-to-basket').innerHTML = priceToBasket.toLocaleString('rus-IN');
  var productName = document.querySelector('.param.active[name="product"]').innerHTML;
  document.getElementById('description-1').innerHTML = productName + ': <b>' + count + ' шт.</b> x <b>' + pricePerOne + '₽</b>';
  document.getElementById('description-2').innerHTML = paramSelected.box ? '+ коробка: <b>' + priceAdditionally + '₽</b>' : '';
}

function switchRefresh(element) {
  // обновление переключателя
  var switchStatus = element.checked.toString();
  var params = element.parentNode.parentNode.querySelectorAll('.param');
  params.forEach(function (el) {
    if (el.getAttribute('switchdata') === switchStatus) {
      el.classList.add('active');
      el.classList.remove('inactive');
    } else {
      el.classList.add('inactive');
      el.classList.remove('active');
    }
  });
  updatePrice();
}

document.addEventListener('DOMContentLoaded', function () {
  updatePrice();
  document.querySelectorAll('.switcher').forEach(function (elem) {
    elem.addEventListener('click', function () {
      switchRefresh(this);
    });
  });
  document.getElementById('box').addEventListener('click', function () {
    var textForBox = document.querySelector('.text-for-box');

    if (this.checked) {
      textForBox.classList.remove('hide');
    } else {
      textForBox.classList.add('hide');
      document.querySelector('input[name="text-for-box"]').value = '';
    }

    updatePrice();
  });
  document.getElementById('white-border').addEventListener('click', function () {
    updatePrice();
  });
});

/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./resources/js/gallery.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/js/gallery.js */"./resources/js/gallery.js");


/***/ })

/******/ });
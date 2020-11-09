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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
// require('./bootstrap');
__webpack_require__(/*! ./general */ "./resources/js/general.js"); // alert ()
// window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// const app = new Vue({
//     el: '#app',
// });

/***/ }),

/***/ "./resources/js/general.js":
/*!*********************************!*\
  !*** ./resources/js/general.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.ajax = function (url, data) {
  var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (response) {// console.log ('ajax', response);
    // return true
  };
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text-plain, */*',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    method: 'post',
    credentials: 'same-origin',
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    callBack(response); // console.log (callBack);
  })["catch"](function (error) {
    console.log(error);
  });
};

window.updateBasketIconCount = function () {
  ajax('/getBasketCount', {}, function (result) {
    // console.log (result)
    if (result != false) {
      document.querySelector('.basket').classList.remove('half-opacity');
      var basketPrice = result.summ;
      document.getElementById('basket-icon-summ').innerHTML = basketPrice.toLocaleString('rus-IN') + ' ₽';
      document.getElementById('basket-icon-summ').classList.remove('hide');
    } else {
      document.querySelector('.basket').classList.add('half-opacity');
      document.getElementById('basket-icon-summ').innerHTML = '0 ₽'; // document.getElementById ('basket-icon-summ').classList.add ('hide')
    }
  });
};

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/basket.scss":
/*!************************************!*\
  !*** ./resources/sass/basket.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/bigbuttons.scss":
/*!****************************************!*\
  !*** ./resources/sass/bigbuttons.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/gallery.scss":
/*!*************************************!*\
  !*** ./resources/sass/gallery.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/login.scss":
/*!***********************************!*\
  !*** ./resources/sass/login.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/personal.scss":
/*!**************************************!*\
  !*** ./resources/sass/personal.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/supermodal.scss":
/*!****************************************!*\
  !*** ./resources/sass/supermodal.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/welcome.scss":
/*!*************************************!*\
  !*** ./resources/sass/welcome.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/welcome.scss ./resources/sass/bigbuttons.scss ./resources/sass/personal.scss ./resources/sass/login.scss ./resources/sass/gallery.scss ./resources/sass/supermodal.scss ./resources/sass/basket.scss ./resources/sass/app.scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/js/app.js */"./resources/js/app.js");
__webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/sass/welcome.scss */"./resources/sass/welcome.scss");
__webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/sass/bigbuttons.scss */"./resources/sass/bigbuttons.scss");
__webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/sass/personal.scss */"./resources/sass/personal.scss");
__webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/sass/login.scss */"./resources/sass/login.scss");
__webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/sass/gallery.scss */"./resources/sass/gallery.scss");
__webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/sass/supermodal.scss */"./resources/sass/supermodal.scss");
__webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/sass/basket.scss */"./resources/sass/basket.scss");
module.exports = __webpack_require__(/*! /Users/katunin/Documents/tutuprint.ru/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });
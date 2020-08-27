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
      '10x15': [{
        price: 500,
        maxCount: 100,
        minCount: 1
      }, {
        price: 3500,
        maxCount: 1000,
        minCount: 101
      }],
      '15x21': [{
        price: 700,
        maxCount: 150,
        minCount: 1
      }, {
        price: 5000,
        maxCount: 1000,
        minCount: 151
      }]
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
      '10x15': [{
        price: 500,
        maxCount: 100,
        minCount: 1
      }, {
        price: 3500,
        maxCount: 1000,
        minCount: 101
      }],
      '15x21': [{
        price: 700,
        maxCount: 150,
        minCount: 1
      }, {
        price: 5000,
        maxCount: 1000,
        minCount: 151
      }]
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
  var count = getPhotoCount();

  if (paramSelected.box) {
    priceAdditionally = 0;
    priceArr[paramSelected.product].box[paramSelected.size].forEach(function (ee) {
      if (count <= ee.maxCount && count >= ee.minCount) priceAdditionally = ee.price;
    });
  } else {
    priceAdditionally = 0;
  }

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

function changeModalCount() {
  // let currentImage = document.getElementById (this.id); //div самого изображения
  var currentImage = document.querySelector('div[name="' + this.id + '"]');
  var modalTempData = document.getElementById('modal-temporary-data'); //буфер модального окна

  var currentCount = modalTempData.value ? modalTempData.value : currentImage.getAttribute('count');
  currentCount = Number(currentCount) + Number(this.increase);
  if (currentCount < 0) currentCount = 0;
  document.getElementById('image-modal-count').innerHTML = currentCount;
  modalTempData.value = currentCount;
}

function ajax(url, data, callBack) {
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
    callBack(response); // console.log (response)
    // console.log (JSON.parse(response));
    // form.reset ();
    // window.location.href = redirect;
  })["catch"](function (error) {
    console.log(error);
  });
}

function turnOffSuperModal() {
  document.querySelector('.super-modal').classList.add('hide');
  document.querySelector('.modal-img-block').style = '';
  document.getElementById('image-modal-count').innerHTML = '';
}

var imageBoxListener = function ImageBoxClick() {
  var _this = this;

  // функция нажатия на фотографию
  // настраиваем модальное окно
  var imageUrl = this.getAttribute('name');
  document.querySelector('.super-modal').classList.remove('hide');
  document.querySelector('.modal-img-block').style = 'background-image: url(' + imageUrl + ')';
  document.getElementById('image-modal-count').innerHTML = this.getAttribute('count'); // повесим onclick на компку OK модального окна

  document.getElementById('ok-modal-button').onclick = function () {
    var count = document.getElementById('modal-temporary-data').value;

    _this.setAttribute('count', count);

    var imageCountElement = _this.querySelector('div'); //Передадим данные в контроллер для изменения данных сессии


    ajax('/updatecount', {
      url: imageUrl,
      count: count
    }, function () {
      console.log(_this);
    }); // 
    // покажем количество, если более 1шт

    if (count > 1) {
      imageCountElement.innerHTML = count + 'x';
      imageCountElement.classList.remove('hide');
    } else {
      imageCountElement.classList.add('hide');
    } // удалим фотогарфию


    if (count == 0) {
      _this.remove();
    } else {}

    document.querySelector('.super-modal').classList.add('hide');
  };

  document.querySelectorAll('.inc-modal-button').forEach(function (changeModalButton) {
    changeModalButton.onclick = changeModalCount.bind({
      id: _this.getAttribute('name'),
      increase: changeModalButton.getAttribute('direction')
    });
  });
  document.addEventListener('keyup', function (key) {
    if (key.key === 'Escape') turnOffSuperModal();
  }, {
    once: true
  });
  document.querySelector('.close-modal-button').querySelector('button').onclick = turnOffSuperModal;
  document.querySelector('.super-modal').classList.remove('hide');
};

var imageSelectListener = function imageSelectListener() {
  console.log(this);
};

function turnCheckBoxes() {
  var button = document.getElementById('changeGroupButton');
  var status = button.value == 'on' ? true : false;

  if (status) {
    // выключен режим выделения
    button.value = 'off';
    button.classList.remove('active-button');
    var imageBoxes = document.querySelectorAll('.image-box');
    imageBoxes.forEach(function (elem) {
      elem.addEventListener('click', imageBoxListener, false);
      if (elem.getAttribute('count') > 1) elem.querySelector('.img-count').classList.remove('hide');
      elem.querySelector('.img-select').classList.add('hide');
    });
  } else {
    // включен режим выделения
    button.value = 'on';
    button.classList.add('active-button');

    var _imageBoxes = document.querySelectorAll('.image-box');

    _imageBoxes.forEach(function (elem) {
      elem.removeEventListener('click', imageBoxListener, false);
      elem.querySelector('.img-select').addEventListener('click', imageSelectListener.bind(elem), false);
      elem.querySelector('.img-count').classList.add('hide');
      elem.querySelector('.img-select').classList.remove('hide');
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  updatePrice(); // обработчик нажатия на кнопку группового изменения

  console.log(document.getElementById('changeGroupButton'));
  document.getElementById('changeGroupButton').onclick = turnCheckBoxes;
  console.log(document.getElementById('changeGroupButton'));
  document.querySelectorAll('.switcher').forEach(function (elem) {
    elem.addEventListener('click', function () {
      switchRefresh(this);
    });
  }); // обработчик пересчета цены с коробкой

  document.getElementById('box').addEventListener('click', function () {
    var textForBox = document.querySelector('.text-for-box');

    if (this.checked) {
      textForBox.classList.remove('hide');
    } else {
      textForBox.classList.add('hide');
      document.querySelector('textarea[name="text-for-box"]').value = '';
    }

    updatePrice();
  });
  document.getElementById('white-border').addEventListener('click', function () {
    updatePrice();
  }); // обработчик нажатия на фотогарфию

  document.querySelectorAll('.image-box').forEach(function (elem) {
    // пропишем стартовые колличества
    var count = elem.getAttribute('count');
    var imageCountElement = elem.querySelector('div'); // покажем количество, если более 1шт

    if (count > 1) {
      imageCountElement.innerHTML = count + 'x';
      imageCountElement.classList.remove('hide');
    }

    elem.addEventListener('click', imageBoxListener, false);
  });
});

/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./resources/js/gallery.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/pavelkatuninhome/Documents/tutuprint/resources/js/gallery.js */"./resources/js/gallery.js");


/***/ })

/******/ });
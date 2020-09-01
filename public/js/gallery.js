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
  var currentImage = document.getElementById(this.id);
  var modalTempData = document.getElementById('modal-temporary-data'); //буфер модального окна

  var currentCount = modalTempData.value ? modalTempData.value : currentImage.getAttribute('count');
  currentCount = Number(currentCount) + Number(this.increase);
  if (currentCount < 0) currentCount = 0;
  document.getElementById('image-modal-count').innerHTML = currentCount;
  modalTempData.value = currentCount;
}

function ajax(url, data) {
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
  }).then(function (response) {// console.log (response);
  })["catch"](function (error) {
    console.log(error);
  });
}

var imageBoxOpenModalListener = function imageBoxOpenModalListener() {
  var _this = this;

  // функция нажатия на фотографию - открытие модального окна
  // настраиваем модальное окно
  // console.log (this.style.backgroundImage)
  // let imageUrl = this.getAttribute ('url');
  document.querySelector('.super-modal').classList.remove('hide');
  document.querySelector('.modal-img-block').classList.remove('hide');
  document.querySelector('.count-block').classList.remove('hide');
  document.querySelector('.modal-img-block').style.backgroundImage = this.style.backgroundImage; //='background-image: url(' + imageUrl + ')';

  document.getElementById('image-modal-count').innerHTML = this.getAttribute('count');
  document.querySelector('.modal-block').style = 'margin-top: -205px'; // повесим onclick на компку OK модального окна

  document.getElementById('ok-modal-button').addEventListener('click', function () {
    var count = document.getElementById('modal-temporary-data').value;
    this.setAttribute('count', count);
    var imageCountElement = this.querySelector('div.img-count'); //Передадим данные в контроллер для изменения данных сессии

    ajax('/updatecount', {
      data: [{
        id: this.id,
        count: count
      }]
    }); // покажем количество, если более 1шт

    if (count > 1) {
      imageCountElement.innerHTML = count + 'x';
      imageCountElement.classList.remove('hide');
    } else {
      imageCountElement.classList.add('hide');
    } // удалим фотогарфию


    if (count == 0) {
      this.remove();
    }

    turnOFFSuperModal(); // document.querySelector ('.super-modal').classList.add ('hide');
  }.bind(this), {
    once: true
  });
  document.querySelectorAll('.inc-modal-button').forEach(function (changeModalButton) {
    changeModalButton.onclick = changeModalCount.bind({
      id: _this.id,
      increase: changeModalButton.getAttribute('direction')
    });
  });
};

var generalChangeCountListner = function generalChangeCountListner() {
  // изменяет количество выбранных фотографий
  var newGeneralCount = window.selectElemsArr.count + Number(this.getAttribute('direction'));

  if (newGeneralCount >= 0) {
    window.selectElemsArr.count = newGeneralCount;
    document.getElementById('general-image-modal-count').innerHTML = newGeneralCount;
  }
};

var generalButtonsListnerSave = function generalButtonsListnerSave() {
  // конпка группового выбора СОХРАНИТЬ
  var arrList = [];
  window.selectElemsArr.list.forEach(function (data) {
    arrList.push({
      id: data,
      count: window.selectElemsArr.count
    }); // изменим количество в DIV элементах

    var elem = document.getElementById(data);

    if (window.selectElemsArr.count > 0) {
      elem.setAttribute('count', window.selectElemsArr.count);
      elem.querySelector('.img-count').innerHTML = window.selectElemsArr.count + 'x';
    } else {
      elem.parentNode.removeChild(elem);
    }
  }); // Передадим данные в контроллер для изменения данных сессии

  ajax('/updatecount', {
    data: arrList
  });
  clearGeneralCount();
  turnSelectMode();
};

var generalButtonsListnerCancel = function generalButtonsListnerCancel() {
  // конпка группового выбора ОТМЕНА
  clearGeneralCount();
  turnSelectMode();
};

function clearGeneralCount() {
  window.selectElemsArr = {
    list: [],
    count: 1
  };
  document.getElementById('general-image-modal-count').innerHTML = 1;
}

function turnAdditionalConfigButtons() {
  var status = window.selectElemsArr.list.length !== 0;
  var countBlock = document.querySelector('.general-count-block');
  var buttonsBlock = document.querySelector('.buttons');

  if (status) {
    document.querySelector('.general-count-block').classList.remove('half-opacity');
    document.getElementById('general-additional-button-save').classList.remove('half-opacity');
    document.querySelector('.general-additional-params-block').querySelector('p').classList.add('hide');
  } else {
    document.querySelector('.general-count-block').classList.add('half-opacity');
    document.getElementById('general-additional-button-save').classList.add('half-opacity');
    document.querySelector('.general-additional-params-block').querySelector('p').classList.remove('hide');
    clearGeneralCount();
  }
}

var imageSelectListener = function imageSelectListener() {
  var selectElem = this.querySelector('.img-select');

  if (selectElem.classList.contains('hide')) {
    // элемент выбран
    selectElem.classList.remove('hide');
    window.selectElemsArr.list.push(this.id);
  } else {
    // элемент Не выбран
    selectElem.classList.add('hide');
    var idTodelete = this.id;
    window.selectElemsArr.list = window.selectElemsArr.list.filter(function (item) {
      return item !== idTodelete;
    }); // delete window.selectElemsArr.list[this.id]
  }

  turnAdditionalConfigButtons();
};

function turnSelectMode() {
  var button = document.getElementById('changeGroupButton');
  var status = button.value == 'on' ? true : false;
  var imageBoxes = document.querySelectorAll('.image-box');

  if (status) {
    // режим выделения ВЫКЛЮЧЕН
    button.value = 'off';
    button.classList.remove('hide');
    imageBoxes.forEach(function (elem) {
      elem.removeEventListener('click', imageSelectListener, false);
      elem.addEventListener('click', imageBoxOpenModalListener, false);

      if (elem.getAttribute('count') > 1) {
        elem.querySelector('.img-count').classList.remove('hide');
      }

      elem.querySelector('.img-select').classList.add('hide');
    });
    document.querySelector('.general-additional-params-block').classList.add('hide');
    document.querySelector('.general-params-block').classList.remove('hide');
    document.getElementById('imgLoadPlusButton').classList.remove('hide');
    document.getElementById('clearAllImagesButton').classList.add('hide');
    document.querySelector('.to-order-block').classList.remove('half-opacity');
    document.querySelector('.info').classList.remove('half-opacity');
  } else {
    // режим выделения ВКЛЮЧЕН
    button.value = 'on';
    button.classList.add('hide');
    clearGeneralCount(); //очистим массив с выбранным количеством

    imageBoxes.forEach(function (elem) {
      elem.removeEventListener('click', imageBoxOpenModalListener, false);
      elem.addEventListener('click', imageSelectListener, false);
      elem.querySelector('.img-count').classList.add('hide');
    });
    document.querySelector('.general-additional-params-block').classList.remove('hide');
    document.querySelector('.general-params-block').classList.add('hide');
    document.getElementById('imgLoadPlusButton').classList.add('hide');
    document.getElementById('clearAllImagesButton').classList.remove('hide');
    document.querySelector('.to-order-block').classList.add('half-opacity');
    document.querySelector('.info').classList.add('half-opacity');
  }
}

function clearAll() {
  // удаляет все фотографии
  // настроем моадальное окно
  document.querySelector('.super-modal').classList.remove('hide');
  document.querySelector('.super-modal-message').innerHTML = 'Удалить все загруженные фотографии?';
  document.querySelector('.super-modal-message').classList.remove('hide');
  document.getElementById('cancel-modal-button').classList.remove('hide');
  document.querySelector('.modal-block').style = 'margin-top: -78px'; // повесим onclick на компку OK модального окна

  document.getElementById('ok-modal-button').addEventListener('click', function () {
    // Удалим все блоки с изображениями
    document.querySelectorAll('.image-box').forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
    ajax('/eraseall', {});
    turnSelectMode();
    turnOFFSuperModal();
  }, {
    once: true
  });
}

function filesUpload() {
  var filesToRequest = new FormData();

  for (var x = 0; x < this.files.length; x++) {
    if (!this.files[x].type.match('image.*')) {
      continue;
    }

    filesToRequest.append('image[]', this.files[x]);
  }

  var xhr = new XMLHttpRequest();
  upload = xhr.upload; // Создаем прослушиватель события progress, который будет "двигать" прогресс-бар.

  upload.addEventListener('progress', function (event) {
    // if (event.lengthComputable) {
    // var pbar = $('tr.' + trnum + ' td.size div.pbar');
    console.log(event.loaded, event.total); // console.log (Math.round (event.loaded / event.total * 100));
    // pbar.css('width', Math.round((event.loaded / event.total) * 100) + 'px');
    // }
  }, false);
  xhr.open('POST', '/imageupload');
  xhr.setRequestHeader('enctype', 'multipart/form-data');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content')); // Отправляем файл.

  xhr.send(filesToRequest);

  xhr.onload = function () {
    // Добавим полученные элементы в DOM
    var gallery = document.querySelector('.gallery');
    var elementBefore = gallery.querySelector('form');
    var result = JSON.parse(xhr.response).result;
    result.forEach(function (image) {
      // создадим элемент
      var elem = document.createElement('div');
      elem.id = image.id;
      elem.classList.add('image-box');
      elem.setAttribute('count', 1);
      elem.setAttribute('url', image.url);
      elem.style = 'background-image: url(' + image.thumbnail + ')';
      elem.innerHTML = '<div class="img-count hide"></div><div class="img-select hide"></div>';
      elem.addEventListener('click', imageBoxOpenModalListener, false);
      gallery.insertBefore(elem, elementBefore);
    }); // 
  };
}

function turnInfo() {
  // настроем моадальное окно
  document.querySelector('.super-modal').classList.remove('hide');
  document.querySelector('.super-modal-message').innerHTML = document.getElementById('info-page').innerHTML;
  document.querySelector('.super-modal-message').classList.remove('hide'); // document.querySelector ('.modal-block').style = 'margin-top: -78px';
  // повесим onclick на компку OK модального окна

  document.getElementById('ok-modal-button').addEventListener('click', function () {
    turnOFFSuperModal();
  }, {
    once: true
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // обработчик нопки info
  document.querySelector('.info').onclick = turnInfo;
  updatePrice(); // обработчик нажатия на кнопку группового изменения

  document.getElementById('changeGroupButton').onclick = turnSelectMode; // обработчик на кнопку удалить все

  document.getElementById('clearAllImagesButton').onclick = clearAll; // обработчик переключателя

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
  document.querySelectorAll('.image-box').forEach(function (elem) {
    // пропишем стартовые колличества
    var count = elem.getAttribute('count');
    var imageCountElement = elem.querySelector('div.img-count'); // покажем количество, если более 1шт

    if (count > 1) {
      imageCountElement.innerHTML = count + 'x';
      imageCountElement.classList.remove('hide');
    } // обработчик нажатия на фотогарфию


    elem.addEventListener('click', imageBoxOpenModalListener, false);
  }); //Обработчик кнопок группового изменения Сохранить, Отмена и изменения количества

  document.getElementById('general-additional-button-save').addEventListener('click', generalButtonsListnerSave, false);
  document.getElementById('general-additional-button-cancel').addEventListener('click', generalButtonsListnerCancel, false);
  document.querySelectorAll('.general-inc-modal-button').forEach(function (elem) {
    elem.addEventListener('click', generalChangeCountListner, false);
  }); // обработчик загрузки фотографий

  document.getElementById('imgLoad').onchange = filesUpload;
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
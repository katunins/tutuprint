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

function switchClearAllButton(status) {
  // сменим название и назначение кнопки Стереть все
  var clearAllButton = document.getElementById('clearAllImagesButton');

  if (status == 'all') {
    clearAllButton.removeEventListener('click', clearSelected, false);
    clearAllButton.addEventListener('click', clearAll, false);
    clearAllButton.innerHTML = 'Удалить все';
  } else {
    clearAllButton.removeEventListener('click', clearAll, false);
    clearAllButton.addEventListener('click', clearSelected, false);
    clearAllButton.innerHTML = 'Удалить выбранные';
  }
}

function addEmptyElems() {
  // функция проверяет заполнена ли галерея фотографиями или есть пустые места.
  // добавляет в DOM пустые EMPTY элементы необходимого количества на всю возможную высоту window
  // console.log ('Функция запущена');
  function isElemIsRight(elem) {
    // вспомогательная функция проверяет элемент находится в конце (справа) своего родителя (gallert)
    var margin = 1;
    var gallery = document.querySelector('.gallery');
    var galleryRightSide = window.innerWidth - (gallery.offsetLeft + gallery.offsetWidth); //правый край блока родителя - gallery

    var elemRightSide = window.innerWidth - (elem.offsetLeft + elem.offsetWidth + margin); //правый край эелемента

    return elemRightSide - galleryRightSide < elem.offsetWidth;
    a;
  }

  function isControlsBlockMaxBottom() {
    var lineHeight = document.querySelector('.imgLoadPlusButton').offsetHeight; // расстояние на которую смещается блок Controls, если добавляется ряд image-box, она равна высоте блока, к примеру Plus

    var controlsBlock = document.querySelector('.controls');
    var controlsBlockBottom = controlsBlock.offsetTop + controlsBlock.offsetHeight;
    return lineHeight + controlsBlockBottom > window.innerHeight;
  }

  function fillEmptyElemsInLine() {
    // если элемент в конце строки
    // var fakeEndElem = document.getElementById ('fake-end-elem');
    do {
      var emptyElem = document.createElement('div');
      emptyElem.classList.add('fake-empty-block');
      emptyElem.setAttribute('drop', true);
      gallery.appendChild(emptyElem);
    } while (!isElemIsRight(emptyElem));
  }

  var gallery = document.querySelector('.gallery'); // Завершим строку из EMPTY блоков, если есть пустые места, например при удалении

  var emptyElements = document.querySelectorAll('.fake-empty-block');

  if (emptyElements.length > 0) {
    if (!isElemIsRight(emptyElements[emptyElements.length - 1])) {
      fillEmptyElemsInLine();
    }
  } else {
    if (!isControlsBlockMaxBottom) fillEmptyElemsInLine();
    if (!isElemIsRight(document.getElementById('imgLoadPlusButton'))) fillEmptyElemsInLine();
  } // Запустим функцию, пока есть возможность двигать вблок Controls вниз


  while (!isControlsBlockMaxBottom()) {
    fillEmptyElemsInLine();
  }

  resizeDropArea();
}

function resizeDropArea() {
  var dropArea = document.querySelector('.dropPlus');
  var gallery = document.querySelector('.gallery');
  dropArea.style.height = gallery.offsetHeight;
  dropArea.querySelector('img').style.marginTop = gallery.offsetHeight / 2;
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

  turnONSuperModal('clickToImage');
  document.querySelector('.modal-img-block').style.backgroundImage = this.style.backgroundImage; //='background-image: url(' + imageUrl + ')';

  document.getElementById('image-modal-count').innerHTML = this.getAttribute('count'); // повесим onclick на компку OK модального окна

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

    updatePrice();
    turnOFFSuperModal(); // добавим пустые эелементы

    addEmptyElems();
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
  updatePrice();
  clearGeneralCount();
  turnSelectMode(); // добавим пустые эелементы

  addEmptyElems();
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
  }; // document.getElementById('general-image-modal-count').innerHTML = 1;
}

function turnAdditionalConfigButtons() {
  var status = window.selectElemsArr.list.length !== 0;

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
    });
  }

  turnAdditionalConfigButtons(); // Если есть выбранные элементы, то сменить назначение кнопки Стереть все на стереть выбранные и обратно

  if (window.selectElemsArr.list.length > 0) {
    switchClearAllButton('selected');
  } else {
    switchClearAllButton('all');
  }
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
    document.querySelector('.info').classList.remove('half-opacity'); // document.getElementById('clearAllImagesButton').classList.remove ('half-opacity')
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
    document.querySelector('.info').classList.add('half-opacity'); // document.getElementById('clearAllImagesButton').classList.add ('half-opacity')

    document.getElementById('general-image-modal-count').innerHTML = 1;
  }
}

function clearAll() {
  // настроем моадальное окно
  turnONSuperModal('clearAll'); // повесим onclick на компку OK модального окна

  document.getElementById('ok-modal-button').addEventListener('click', function () {
    // Удалим все блоки с изображениями
    document.querySelectorAll('.image-box').forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
    ajax('/eraseall', {});
    updatePrice();
    turnSelectMode();
    turnOFFSuperModal();
    addEmptyElems();
  }, {
    once: true
  });
}

function clearSelected() {
  var arrList = [];
  window.selectElemsArr.list.forEach(function (data) {
    arrList.push({
      id: data,
      count: 0
    }); // изменим количество в DIV элементах

    var elem = document.getElementById(data);
    elem.parentNode.removeChild(elem);
  }); // Передадим данные в контроллер для изменения данных сессии

  ajax('/updatecount', {
    data: arrList
  });
  updatePrice();
  clearGeneralCount();
  turnSelectMode(); // добавим пустые эелементы

  addEmptyElems();
  switchClearAllButton('all');
}

function filesUpload() {
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  function timeRecalc() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    // Вспомогательная функция для плавного пересчета процента загрузки в промежутке между ответами сервера.
    if (start) {
      timepoints = {
        totalProgress: 0,
        progressShift: 0,
        time: parseInt(new Date().getTime()),
        lasttime: 0,
        onePointPerSecond: 200
      };
    } else {
      timepoints.totalProgress += onePointProgress;
      timepoints.progressShift = 0;
      timepoints.lasttime = timepoints.time;
      timepoints.time = parseInt(new Date().getTime());
      timepoints.onePointPerSecond = (timepoints.time - timepoints.lasttime) / onePointProgress; // расчетное время прохождения одного процента
    } // запустим фукнцию с интервалом, разным расчтеному времени 1 процента


    var shiftProgress = setInterval(function () {
      if (timepoints.progressShift < onePointProgress) {
        document.querySelector('.super-modal-message').innerHTML = 'Загрузка ' + Math.round(timepoints.totalProgress + timepoints.progressShift) + '%';
      } else {
        clearInterval(shiftProgress);
      }

      timepoints.progressShift++;
    }, timepoints.onePointPerSecond);

    if (Math.round(timepoints.totalProgress) == 100) {
      document.getElementById('imgLoad').value = null;
      clearInterval(shiftProgress);
      updatePrice();
      turnOFFSuperModal();
      addEmptyElems();
    }
  }

  turnONSuperModal('uploadProgress');
  var progressListener = setInterval(function () {
    fetch('/progress').then(function (response) {
      return response.json();
    }).then(function (data) {
      return console.log(data);
    }); // console.log('progress')
  }, 500); // каждый период опрашиваются данные прогресса в АПИ

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/imageupload', true);

  xhr.upload.onprogress = function (event) {
    if (lengthComputable) console.log('Загружено на сервер ' + event.loaded + ' байт из ' + event.total);
  }; // xhr.onreadystatechange = function (event) {
  //   console.log (event)
  // }


  xhr.onload = function (event) {
    console.log('onload', new Date().getTime());
    var gallery = document.querySelector('.gallery');
    var elementBefore = gallery.querySelector('form');
    JSON.parse(event.target.response).forEach(function (result) {
      // Добавим загруженную миниатюру в элемент
      var elem = document.createElement('div');
      elem.id = result.id;
      elem.classList.add('image-box');
      elem.setAttribute('count', 1);
      elem.setAttribute('url', result.url);
      elem.style = 'background-image: url(' + result.thumbnail + ')';
      elem.innerHTML = '<div class="img-count hide"></div><div class="img-select hide"></div>';
      elem.addEventListener('click', imageBoxOpenModalListener, false);
      gallery.insertBefore(elem, elementBefore); // удалим пустые EMPTY блоки, если необходимо

      var fakeEmptyBlock = document.querySelector('.fake-empty-block');

      if (fakeEmptyBlock) {
        document.querySelector('.gallery').removeChild(fakeEmptyBlock);
      }
    });
    clearInterval(progressListener);
    turnOFFSuperModal();
    updatePrice();
    addEmptyElems(); // timeRecalc();
  };

  xhr.setRequestHeader('enctype', 'multipart/form-data');
  xhr.setRequestHeader('X-CSRF-TOKEN', token);
  var formData = new FormData();

  for (i = 0; i < this.files.length; i++) {
    formData.append('images[]', this.files[i]);
  }

  xhr.send(formData);
}

function turnInfo() {
  // настроем моадальное окно
  turnONSuperModal('info'); // повесим onclick на компку OK модального окна

  document.getElementById('ok-modal-button').addEventListener('click', function () {
    turnOFFSuperModal();
  }, {
    once: true
  });
}

function createDropListener() {
  // обработчик события перетаскивания фотографий в gallery
  var droptarget = document.querySelector('.gallery'); // уберем собития стандартного открытия файла в соседнем окне

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    droptarget.addEventListener(eventName, function (e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });
  var dropPlus = document.querySelector('.dropPlus');
  ['dragenter', 'dragover'].forEach(function (eventName) {
    droptarget.addEventListener(eventName, function (event) {
      dropPlus.classList.add('drop-visibility');
      dropPlus.classList.remove('drop-no-visibility');
    }, false);
  });
  droptarget.addEventListener('dragleave', function (event) {
    dropPlus.classList.remove('drop-visibility');
    dropPlus.classList.add('drop-no-visibility');
  }, false);
  droptarget.addEventListener('drop', function (event) {
    dropPlus.classList.remove('drop-visibility');
    dropPlus.classList.add('drop-no-visibility');
    var files = event.dataTransfer.files;
    var dropFilesUpload = filesUpload.bind(event.dataTransfer);
    dropFilesUpload(); // for (var i = 0; i < files.length; i++) {
    //   var file = files[i];
    //   console.log ('file: ' + file.name);
    // }

    return false;
  }, false);
}

document.addEventListener('DOMContentLoaded', function () {
  // обработчик нопки info
  document.querySelector('.info').onclick = turnInfo;
  turnOFFSuperModal();
  updatePrice(); // добавим пустые эелементы

  addEmptyElems(); // обработчик нажатия на кнопку группового изменения

  document.getElementById('changeGroupButton').onclick = turnSelectMode; // обработчик на кнопку удалить все

  switchClearAllButton('all'); // обработчик переключателя

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

  document.getElementById('imgLoad').onchange = filesUpload; // запустим обработчик события перетаскивания фотографий в gallery

  createDropListener();
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
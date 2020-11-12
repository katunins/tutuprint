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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
      '10x15': 18,
      '15x21': 36
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
      '10x15': 40,
      '15x21': 80
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
  // добавляет в DOM пустые EMPTY элементы необходимого количества на всю необходимую высоту window
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

  function isLastEmptyElementMaxBottom() {
    // Если последний empty спрячется при добавлении новой линии за скрол, то возвращает true
    var galleryBlock = document.querySelector('.gallery');
    var galleyBottomLine = Number(galleryBlock.offsetTop + galleryBlock.offsetHeight);
    var emptyElements = document.querySelectorAll('.fake-empty-block');
    if (emptyElements.length == 0) return false; //для ситуации, где empty элемент вообще отсутсвует

    var lastEmptyElement = emptyElements[emptyElements.length - 1];
    var lastEmptyElementBottomLine = Number(lastEmptyElement.offsetTop + lastEmptyElement.offsetHeight);
    var lastEmptyUnderGalleryScrool = Number(lastEmptyElementBottomLine + lastEmptyElement.offsetHeight) > galleyBottomLine; // Если блок с кнопками управления уйдет за экран при добавлении новой линии, то вренет true

    var emptyElemHeight = document.querySelector('.imgLoadPlusButton').offsetHeight; // расстояние на которую смещается блок Controls, если добавляется ряд image-box, она равна высоте блока, к примеру Plus

    var controlsBlock = document.querySelector('.controls');
    var controlsBlockBottomLine = controlsBlock.offsetTop + controlsBlock.offsetHeight;
    var ControlBlockisBottom = Number(emptyElemHeight + controlsBlockBottomLine) > window.innerHeight; // alert (ControlBlockisBottom)

    if (ControlBlockisBottom && lastEmptyUnderGalleryScrool) return true;else return false;
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
    // if (isLastEmptyElementMaxBottom) fillEmptyElemsInLine ();
    if (!isElemIsRight(document.getElementById('imgLoadPlusButton'))) fillEmptyElemsInLine();
  } // Запустим функцию, пока кнопка плюс не скроется за линии скрола


  line = 0; // - на всякий случай защитимся от багов. Сделаем максимум 10 линий

  while (!isLastEmptyElementMaxBottom() && line < 10) {
    line++;
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
  var basketButton = document.getElementById('add-to-basket-button');

  if (count == 0) {
    basketButton.classList.add('half-opacity');
  } else {
    basketButton.classList.remove('half-opacity');
  }

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
  document.getElementById('int-price-to-basket').value = priceToBasket;
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

var imageBoxOpenModalListener = function imageBoxOpenModalListener() {
  var _this = this;

  "";
  turnONmodalImage(this.style.backgroundImage);
  turnONmodal('-306px');
  turnONmodalCount(this.getAttribute('count'));

  function formatSize(length) {
    var i = 0,
        type = ['б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб'];

    while (length / 1000 | 0 && i < type.length - 1) {
      length /= 1024;
      i++;
    }

    return length.toFixed(2) + ' ' + type[i];
  }

  var filename = this.getAttribute('url').split('/').pop();
  var filesize = formatSize(this.getAttribute('size'));
  var resolution = this.getAttribute('width') + ' x ' + this.getAttribute('heigh');
  var alert = this.getAttribute('lowquality') ? '<img src="images/alert.png">' : '';
  turnONmodalFilename(filename + '<br><span>' + alert + '(' + filesize + ', ' + resolution + 'px)</span>');
  setOkModalButton(function () {
    var newCount = document.getElementById('modal-temporary-data').value;
    if (newCount == '') return true;
    this.setAttribute('count', newCount);
    var imageCountElement = this.querySelector('div.img-count'); //Передадим данные в контроллер для изменения данных сессии

    ajax('/updatecount', {
      data: [{
        id: this.id,
        count: newCount
      }]
    }); // покажем количество, если более 1шт

    if (newCount > 1) {
      imageCountElement.innerHTML = newCount + 'x';
      imageCountElement.classList.remove('hide');
    } else {
      imageCountElement.classList.add('hide');
    } // удалим фотогарфию


    if (newCount == 0) {
      // this.parentNode.this
      this.parentNode.removeChild(this); // this.remove ();
    }

    updatePrice();
    turnOFFSuperModal(); // добавим пустые эелементы

    addEmptyElems();
  }.bind(this));
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
    document.querySelector('.to-order-block').classList.remove('half-opacity', 'modal-hide');
    document.querySelector('.info').classList.remove('hide'); // document.getElementById('clearAllImagesButton').classList.remove ('half-opacity')
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
    document.querySelector('.to-order-block').classList.add('half-opacity', 'modal-hide');
    document.querySelector('.info').classList.add('hide'); // document.getElementById('clearAllImagesButton').classList.add ('half-opacity')

    document.getElementById('general-image-modal-count').innerHTML = 1;
  }
}

function clearAll() {
  // настроем моадальное окно
  setOkModalButton(function () {
    // Удалим все блоки с изображениями
    document.querySelectorAll('.image-box').forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
    ajax('/eraseall', {});
    updatePrice();
    turnSelectMode();
    turnOFFSuperModal();
    addEmptyElems();
  });
  setCancelModalButton();
  turnONmodalMessage('Удалить все загруженные фотографии?');
  turnONmodal('-78px');
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

function checkLowQuality() {
  // уведомляет клиента о низком разрешении
  var lowQuality = 0;
  document.querySelectorAll('.image-box').forEach(function (image) {
    var currentWidth = Number(image.getAttribute('width'));
    var currentHeigh = Number(image.getAttribute('heigh')); // console.log (currentWidth, currentHeigh)

    if (currentHeigh > currentWidth) {
      var temp = currentHeigh;
      currentHeigh = currentWidth;
      currentWidth = temp;
    } // let longSide = currentWidth > currentHeigh ? currentWidth : currentHeigh;
    // let minHeigh = Number (
    //   document.querySelector ('.active[name="size"]').getAttribute ('minWidth')
    // );


    var minWidth = Number(document.querySelector('.active[name="size"]').getAttribute('minHeigh')); // эта проверка по всем сторонам currentWidth < minWidth || currentHeigh < minHeigh

    if (currentWidth < minWidth) {
      image.setAttribute('lowQuality', true);
      image.querySelector('.img-alert').classList.remove('hide');
      if (!image.hasAttribute('lowqualityagree')) lowQuality++;
    } else {
      image.removeAttribute('lowQuality');
      image.querySelector('.img-alert').classList.add('hide');
    }
  });

  if (lowQuality > 0) {
    // повесим onclick на компку OK модального окна
    setOkModalButton(function () {
      var arrList = [];
      document.querySelectorAll('.image-box[lowquality="true"]').forEach(function (elem) {
        arrList.push({
          id: elem.id,
          count: 0
        });
        elem.parentNode.removeChild(elem);
      });
      ajax('/updatecount', {
        data: arrList
      });
      updatePrice();
      addEmptyElems();
      turnOFFSuperModal();
    }, 'Удалить');
    setCancelModalButton(function () {
      var elemsToAgree = [];
      document.querySelectorAll('.image-box[lowquality="true"]').forEach(function (elem) {
        elem.setAttribute('lowqualityagree', true);
        elemsToAgree.push(elem.id);
      });

      if (elemsToAgree.length > 0) {
        // console.log (elemsToAgree)
        ajax('/setlowqualityargee', {
          data: elemsToAgree
        });
      }

      turnOFFSuperModal();
    }, 'Оставить');
    turnONmodalImage("url('images/alert.png')", '40px', '100px');
    turnONmodalMessage('Разрешение у некоторых загруженных фотографий (' + lowQuality + 'шт) ниже необходимого. При печати у этих фотографий может быть слабая детализация. Оставить их или удалить?');
    turnONmodal('-78px');
  }
}

function filesUpload() {
  if (!this.files) return; //вдруг нажемт ESC при выборе файлов и this будет без файлов

  var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var nowTime = new Date().getTime();
  var lastProgressUpload = 0;
  var lastProgressResize = 0;
  var progressUpload = 0;
  var progressResize = 0;
  var lastUploadPeriod = 0;
  var lastResizePeriod = 0;
  var lastTimeUpload = nowTime;
  var lastTimeResize = nowTime;
  var nowTimeUpload = nowTime;
  var nowTimeResize = nowTime;

  function changeProgress(progressAll) {
    // обновляет процент в модальном окне
    var spanAllProgress = document.querySelector('.super-modal-message').querySelector('span');

    if (spanAllProgress) {
      if (progressAll > spanAllProgress.innerHTML) {
        spanAllProgress.innerHTML = progressAll;
      }
    }
  }

  function progressUpdate() {
    // расчитывает общий процент загрузки и ресайза + обновляет текст
    var progressAll = Math.round(progressUpload + progressResize);
    changeProgress(progressAll); // обновим скорости и последние пероиды Resize и Upload

    if (progressResize > 0 && progressResize < 50) {
      lastResizePeriod = progressResize - lastProgressResize;
      speedResize = (nowTimeResize - lastTimeResize) / lastResizePeriod;
    } else {
      speedResize = 0;
      lastResizePeriod = 0;
    }

    if (progressUpload > 0 && progressUpload < 50) {
      lastUploadPeriod = progressUpload - lastProgressUpload;
      speedUpdate = (nowTimeUpload - lastTimeUpload) / lastUploadPeriod;
    } else {
      speedUpdate = 0;
      lastUploadPeriod = 0;
    }

    var allSpeed = speedUpdate + speedResize;
    var lastAllPeriods = lastResizePeriod + lastUploadPeriod;
    clearInterval(shiftProgress); //отключим предыдущую итерацию Shift

    if (allSpeed > 0) {
      var shiftPeriod = 0;
      var shiftProgress = setInterval(function () {
        // Что бы не было слишком резких прыжков в проценте в момент этой паузы запустим Shift цикл со скоростью последней итерации
        shiftPeriod++;

        if (shiftPeriod > lastAllPeriods) {
          clearInterval(shiftProgress);
        } else {
          changeProgress(progressAll + shiftPeriod);
        }
      }, allSpeed);
    }
  }

  function getResize() {
    // Запрашиваем на сервере статус resize
    fetch('/progress').then(function (response) {
      return response.text();
    }).then(function (data) {
      if (data && data != lastProgressResize * 2) {
        lastProgressResize = progressResize;
        progressResize = data / 2;
        lastTimeResize = nowTimeResize;
        nowTimeResize = new Date().getTime();
        progressUpdate();
      }
    });
  }

  turnONmodalLoader();
  turnONmodalMessage('Загрузка <span></span> %');
  turnONmodal('-135px');
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/imageupload', true);

  xhr.upload.onprogress = function (event) {
    // Запрашиваем итерации во время загрузки файлов
    if (event.lengthComputable) {
      lastProgressUpload = progressUpload;
      progressUpload = event.loaded / event.total * 100 / 2;
      lastTimeUpload = nowTimeUpload;
      nowTimeUpload = new Date().getTime();
      progressUpdate();
    }
  };

  var progressListener = setInterval(getResize, 500);

  xhr.onload = function (event) {
    // return false
    var gallery = document.querySelector('.gallery');
    var elementBefore = gallery.querySelector('form'); // console.log (event.target.response)

    JSON.parse(event.target.response).forEach(function (result) {
      // Добавим загруженную миниатюру в элемент
      var elem = document.createElement('div');
      elem.id = result.id;
      elem.classList.add('image-box');
      elem.setAttribute('count', 1);
      elem.setAttribute('url', result.url);
      elem.setAttribute('width', result.width);
      elem.setAttribute('heigh', result.heigh);
      elem.setAttribute('size', result.size);
      elem.style = 'background-image: url(' + result.thumbnail + ')';
      elem.innerHTML = '<div class="img-count hide"></div><div class="img-select hide"></div><div class="img-alert hide"></div>';
      elem.addEventListener('click', imageBoxOpenModalListener, false);
      gallery.insertBefore(elem, elementBefore); // удалим пустые EMPTY блоки, если необходимо

      var fakeEmptyBlock = document.querySelector('.fake-empty-block');

      if (fakeEmptyBlock) {
        document.querySelector('.gallery').removeChild(fakeEmptyBlock);
      }
    });
    getResize(); //последний запрос, что бы сбросить в 0

    clearInterval(progressListener);
    turnOFFSuperModal();
    updatePrice();
    addEmptyElems();
    document.getElementById('imgLoad').value = null;
    checkLowQuality();
  };

  xhr.setRequestHeader('enctype', 'multipart/form-data');
  xhr.setRequestHeader('X-CSRF-TOKEN', token);
  var formData = new FormData();
  var isImagesTypeTrue = false;
  trueFilesType = 0;
  falseFilesType = 0;

  for (i = 0; i < this.files.length; i++) {
    if (this.files[i].type == 'image/jpeg' || this.files[i].type == 'image/png') {
      trueFilesType++;
      formData.append('images[]', this.files[i]);
    } else {
      falseFilesType++;
    }
  }

  if (trueFilesType > 0) {
    xhr.send(formData);
  } else {
    turnOFFSuperModal(); //   turnONmodalLoader ();

    turnONmodalMessage('Тип некоторых файлов не подходит к печати (' + falseFilesType + ' шт.)<br>Используйте файлы форматом jpg');
    setOkModalButton(function () {
      turnOFFSuperModal();
    }, 'Ok');
    turnONmodal('-135px');
    return false;
  } // if (isImagesTypeTrue) xhr.send (formData);

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

function pressAddToBasket(event) {
  // кнопка добавить в корзину
  event.preventDefault(); // Добавим в корзину

  var params = {
    product: {
      name: 'Продукт',
      data: document.querySelector('.param.active[name="product"]').innerHTML
    },
    size: {
      name: 'Формат',
      data: document.querySelector('.param.active[name="size"]').innerHTML
    },
    whiteborder: {
      name: 'Белая рамка по краям',
      data: document.getElementById('white-border').checked
    },
    count: {
      name: 'Количество',
      data: getPhotoCount()
    },
    box: {
      name: 'Коробка',
      data: document.getElementById('box').checked,
      text: document.getElementById('text-for-box').value
    },
    price: {
      name: 'Стоимость',
      data: document.getElementById('int-price-to-basket').value
    }
  }; // пока ждет ответ - loader

  turnONmodalLoader();
  turnONmodal('-78px', false);
  ajax('/addtobasket', params, function (result) {
    turnOFFSuperModal();

    if (result === true) {
      updateBasketIconCount();
      updatePrice();
      setOkModalButton(function () {
        turnOFFSuperModal(); // Удалим все блоки с изображениями

        document.querySelectorAll('.image-box').forEach(function (elem) {
          elem.parentNode.removeChild(elem);
        });
        addEmptyElems();
      }, 'Добавить еще');
      setCancelModalButton(function () {
        document.location.href = '/basket';
      }, 'В корзину');
      turnONmodalMessage('Фотографии (' + getPhotoCount() + ' шт.) добавлены в корзину.<br>Желаете ли еще загрузить фотографии или перейти в коризну?');
      turnONmodal('-78px', false);
    } else {
      alert('К сожалению на сервере произошла какая то ошибка! Проверьте козрзину. Если ошибка повториться, сообщите пожалуйста на почту admin@tutuprint.ru');
      window.location = '/basket';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.info').onclick = function () {
    setOkModalButton();
    turnONmodalMessage(document.getElementById('info-page').innerHTML);
    turnONmodal(0);
  };

  turnOFFSuperModal();
  updatePrice(); // добавим пустые эелементы

  addEmptyElems(); // обработчик нажатия на кнопку группового изменения

  document.getElementById('changeGroupButton').onclick = turnSelectMode; // обработчик на кнопку удалить все

  switchClearAllButton('all'); // обработчик переключателя

  document.querySelectorAll('.switcher').forEach(function (elem) {
    elem.addEventListener('click', function () {
      switchRefresh(this);
      if (this.classList.contains('size-switcher')) checkLowQuality();
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

  createDropListener(); // проверим на плохое качество

  checkLowQuality(); // клик на кнопку добавить в корзину

  document.getElementById('add-to-basket-button').onclick = pressAddToBasket; // setOkModalButton ();
  // turnONmodalMessage (document.getElementById ('info-page').innerHTML);
  // turnONmodal (0);
});

/***/ }),

/***/ 2:
/*!***************************************!*\
  !*** multi ./resources/js/gallery.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/pavelkatunin/Documents/tutuprint.ru/resources/js/gallery.js */"./resources/js/gallery.js");


/***/ })

/******/ });
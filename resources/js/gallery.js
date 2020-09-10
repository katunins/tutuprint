const priceArr = new Object({
  photoprint: {
    size: {
      '10x15': 10,
      '15x21': 20,
    },
    'white-border': {
      '10x15': {
        price: 0,
      },
      '15x21': {
        price: 0,
      },
    },
    box: {
      '10x15': [
        {
          price: 500,
          maxCount: 100,
          minCount: 1,
        },
        {
          price: 3500,
          maxCount: 1000,
          minCount: 101,
        },
      ],
      '15x21': [
        {
          price: 700,
          maxCount: 150,
          minCount: 1,
        },
        {
          price: 5000,
          maxCount: 1000,
          minCount: 151,
        },
      ],
    },
  },
  photocards: {
    size: {
      '10x15': 30,
      '15x21': 50,
    },
    'white-border': {
      '10x15': {
        price: 0,
      },
      '15x21': {
        price: 0,
      },
    },
    box: {
      '10x15': [
        {
          price: 500,
          maxCount: 100,
          minCount: 1,
        },
        {
          price: 3500,
          maxCount: 1000,
          minCount: 101,
        },
      ],
      '15x21': [
        {
          price: 700,
          maxCount: 150,
          minCount: 1,
        },
        {
          price: 5000,
          maxCount: 1000,
          minCount: 151,
        },
      ],
    },
  },
});

function getPhotoCount() {
  let allPhotos = document.querySelectorAll('.image-box');
  let count = 0;
  allPhotos.forEach(el => {
    count += Number(el.getAttribute('count'));
  });
  return count;
}

function switchClearAllButton(status) {
  // сменим название и назначение кнопки Стереть все
  let clearAllButton = document.getElementById('clearAllImagesButton');
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

    let margin = 1;
    let gallery = document.querySelector('.gallery');
    let galleryRightSide =
      window.innerWidth - (gallery.offsetLeft + gallery.offsetWidth); //правый край блока родителя - gallery

    let elemRightSide =
      window.innerWidth - (elem.offsetLeft + elem.offsetWidth + margin); //правый край эелемента
    return elemRightSide - galleryRightSide < elem.offsetWidth;
    a;
  }

  function isControlsBlockMaxBottom() {
    let lineHeight = document.querySelector('.imgLoadPlusButton').offsetHeight; // расстояние на которую смещается блок Controls, если добавляется ряд image-box, она равна высоте блока, к примеру Plus
    let controlsBlock = document.querySelector('.controls');
    let controlsBlockBottom =
      controlsBlock.offsetTop + controlsBlock.offsetHeight;
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

  let gallery = document.querySelector('.gallery');

  // Завершим строку из EMPTY блоков, если есть пустые места, например при удалении
  let emptyElements = document.querySelectorAll('.fake-empty-block');
  if (emptyElements.length > 0) {
    if (!isElemIsRight(emptyElements[emptyElements.length - 1])) {
      fillEmptyElemsInLine();
    }
  } else {
    if (!isControlsBlockMaxBottom) fillEmptyElemsInLine();
    if (!isElemIsRight(document.getElementById('imgLoadPlusButton')))
      fillEmptyElemsInLine();
  }

  // Запустим функцию, пока есть возможность двигать вблок Controls вниз
  while (!isControlsBlockMaxBottom()) {
    fillEmptyElemsInLine();
  }

  resizeDropArea();
}

function resizeDropArea() {
  let dropArea = document.querySelector('.dropPlus');
  let gallery = document.querySelector('.gallery');
  dropArea.style.height = gallery.offsetHeight;
  dropArea.querySelector('img').style.marginTop = gallery.offsetHeight / 2;
}

function updatePrice() {
  let paramSelected = {
    product: document.querySelector('.param.active[name="product"]').attributes
      .value.value,
    size: document.querySelector('.param.active[name="size"]').attributes.value
      .value,
    'white-border': document.getElementById('white-border').checked,
    box: document.getElementById('box').checked,
  };

  let pricePerOne = priceArr[paramSelected.product].size[paramSelected.size];
  let count = getPhotoCount();

  if (paramSelected.box) {
    priceAdditionally = 0;
    priceArr[paramSelected.product].box[paramSelected.size].forEach(ee => {
      if (count <= ee.maxCount && count >= ee.minCount)
        priceAdditionally = ee.price;
    });
  } else {
    priceAdditionally = 0;
  }

  let priceToBasket = pricePerOne * count + priceAdditionally;

  document.querySelector('input[name="summ"]').value = priceToBasket;
  document.getElementById(
    'price-to-basket'
  ).innerHTML = priceToBasket.toLocaleString('rus-IN');

  let productName = document.querySelector('.param.active[name="product"]')
    .innerHTML;
  document.getElementById('description-1').innerHTML =
    productName + ': <b>' + count + ' шт.</b> x <b>' + pricePerOne + '₽</b>';
  document.getElementById('description-2').innerHTML = paramSelected.box
    ? '+ коробка: <b>' + priceAdditionally + '₽</b>'
    : '';
}

function switchRefresh(element) {
  // обновление переключателя
  let switchStatus = element.checked.toString();
  let params = element.parentNode.parentNode.querySelectorAll('.param');
  params.forEach(el => {
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
  let currentImage = document.getElementById(this.id);
  let modalTempData = document.getElementById('modal-temporary-data'); //буфер модального окна

  let currentCount = modalTempData.value
    ? modalTempData.value
    : currentImage.getAttribute('count');
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
      'X-CSRF-TOKEN': document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute('content'),
    },
    method: 'post',
    credentials: 'same-origin',
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(response => {
      // console.log (response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const imageBoxOpenModalListener = function () {
  turnONSuperModal('clickToImage');
  document.querySelector(
    '.modal-img-block'
  ).style.backgroundImage = this.style.backgroundImage; //='background-image: url(' + imageUrl + ')';
  document.getElementById('image-modal-count').innerHTML = this.getAttribute(
    'count'
  );

  // повесим onclick на компку OK модального окна
  document
    .getElementById('ok-modal-button')
    .addEventListener(
      'click',
      function () {
        let count = document.getElementById('modal-temporary-data').value;
        this.setAttribute('count', count);
        let imageCountElement = this.querySelector('div.img-count');

        //Передадим данные в контроллер для изменения данных сессии
        ajax('/updatecount', {
          data: [
            {
              id: this.id,
              count: count,
            },
          ],
        });

        // покажем количество, если более 1шт
        if (count > 1) {
          imageCountElement.innerHTML = count + 'x';
          imageCountElement.classList.remove('hide');
        } else {
          imageCountElement.classList.add('hide');
        }

        // удалим фотогарфию
        if (count == 0) {
          this.remove();
        }
        updatePrice();
        turnOFFSuperModal();
        // добавим пустые эелементы
        addEmptyElems();
      }.bind(this),
      { once: true }
    );

  document
    .querySelectorAll('.inc-modal-button')
    .forEach(changeModalButton => {
      changeModalButton.onclick = changeModalCount.bind({
        id: this.id,
        increase: changeModalButton.getAttribute('direction'),
      });
    });
};

const generalChangeCountListner = function () {
  // изменяет количество выбранных фотографий
  let newGeneralCount =
    window.selectElemsArr.count + Number(this.getAttribute('direction'));

  if (newGeneralCount >= 0) {
    window.selectElemsArr.count = newGeneralCount;
    document.getElementById(
      'general-image-modal-count'
    ).innerHTML = newGeneralCount;
  }
};

const generalButtonsListnerSave = function () {
  // конпка группового выбора СОХРАНИТЬ
  let arrList = [];
  window.selectElemsArr.list.forEach(data => {
    arrList.push({
      id: data,
      count: window.selectElemsArr.count,
    });
    // изменим количество в DIV элементах
    let elem = document.getElementById(data);
    if (window.selectElemsArr.count > 0) {
      elem.setAttribute('count', window.selectElemsArr.count);
      elem.querySelector('.img-count').innerHTML =
        window.selectElemsArr.count + 'x';
    } else {
      elem.parentNode.removeChild(elem);
    }
  });
  // Передадим данные в контроллер для изменения данных сессии
  ajax('/updatecount', {
    data: arrList,
  });
  updatePrice();
  clearGeneralCount();
  turnSelectMode();
  // добавим пустые эелементы
  addEmptyElems();
};

const generalButtonsListnerCancel = function () {
  // конпка группового выбора ОТМЕНА
  clearGeneralCount();
  turnSelectMode();
};

function clearGeneralCount() {
  window.selectElemsArr = {
    list: [],
    count: 1,
  };
  // document.getElementById('general-image-modal-count').innerHTML = 1;
}

function turnAdditionalConfigButtons() {
  let status = window.selectElemsArr.list.length !== 0;

  if (status) {
    document
      .querySelector('.general-count-block')
      .classList.remove('half-opacity');
    document
      .getElementById('general-additional-button-save')
      .classList.remove('half-opacity');

    document
      .querySelector('.general-additional-params-block')
      .querySelector('p')
      .classList.add('hide');
  } else {
    document
      .querySelector('.general-count-block')
      .classList.add('half-opacity');
    document
      .getElementById('general-additional-button-save')
      .classList.add('half-opacity');

    document
      .querySelector('.general-additional-params-block')
      .querySelector('p')
      .classList.remove('hide');
    clearGeneralCount();
  }
}

const imageSelectListener = function () {
  let selectElem = this.querySelector('.img-select');
  if (selectElem.classList.contains('hide')) {
    // элемент выбран
    selectElem.classList.remove('hide');
    window.selectElemsArr.list.push(this.id);
  } else {
    // элемент Не выбран
    selectElem.classList.add('hide');
    let idTodelete = this.id;
    window.selectElemsArr.list = window.selectElemsArr.list.filter(function (
      item
    ) {
      return item !== idTodelete;
    });
  }
  turnAdditionalConfigButtons();

  // Если есть выбранные элементы, то сменить назначение кнопки Стереть все на стереть выбранные и обратно
  if (window.selectElemsArr.list.length > 0) {
    switchClearAllButton('selected');
  } else {
    switchClearAllButton('all');
  }
};

function turnSelectMode() {
  let button = document.getElementById('changeGroupButton');
  let status = button.value == 'on' ? true : false;
  let imageBoxes = document.querySelectorAll('.image-box');

  if (status) {
    // режим выделения ВЫКЛЮЧЕН
    button.value = 'off';
    button.classList.remove('hide');
    imageBoxes.forEach(elem => {
      elem.removeEventListener('click', imageSelectListener, false);
      elem.addEventListener('click', imageBoxOpenModalListener, false);
      if (elem.getAttribute('count') > 1) {
        elem.querySelector('.img-count').classList.remove('hide');
      }
      elem.querySelector('.img-select').classList.add('hide');
    });

    document
      .querySelector('.general-additional-params-block')
      .classList.add('hide');
    document.querySelector('.general-params-block').classList.remove('hide');
    document.getElementById('imgLoadPlusButton').classList.remove('hide');
    document.getElementById('clearAllImagesButton').classList.add('hide');
    document
      .querySelector('.to-order-block')
      .classList.remove('half-opacity');
    document.querySelector('.info').classList.remove('half-opacity');
    // document.getElementById('clearAllImagesButton').classList.remove ('half-opacity')
  } else {
    // режим выделения ВКЛЮЧЕН
    button.value = 'on';
    button.classList.add('hide');

    clearGeneralCount(); //очистим массив с выбранным количеством

    imageBoxes.forEach(elem => {
      elem.removeEventListener('click', imageBoxOpenModalListener, false);
      elem.addEventListener('click', imageSelectListener, false);
      elem.querySelector('.img-count').classList.add('hide');
    });

    document
      .querySelector('.general-additional-params-block')
      .classList.remove('hide');
    document.querySelector('.general-params-block').classList.add('hide');
    document.getElementById('imgLoadPlusButton').classList.add('hide');
    document.getElementById('clearAllImagesButton').classList.remove('hide');
    document.querySelector('.to-order-block').classList.add('half-opacity');
    document.querySelector('.info').classList.add('half-opacity');
    // document.getElementById('clearAllImagesButton').classList.add ('half-opacity')
    document.getElementById('general-image-modal-count').innerHTML = 1;
  }
}

function clearAll() {
  // настроем моадальное окно
  turnONSuperModal('clearAll');

  // повесим onclick на компку OK модального окна
  document
    .getElementById('ok-modal-button')
    .addEventListener(
      'click',
      function () {
        // Удалим все блоки с изображениями
        document.querySelectorAll('.image-box').forEach(elem => {
          elem.parentNode.removeChild(elem);
        });

        ajax('/eraseall', {});

        updatePrice();
        turnSelectMode();
        turnOFFSuperModal();
        addEmptyElems();
      },
      { once: true }
    );
}

function clearSelected() {
  let arrList = [];
  window.selectElemsArr.list.forEach(data => {
    arrList.push({
      id: data,
      count: 0,
    });
    // изменим количество в DIV элементах
    let elem = document.getElementById(data);
    elem.parentNode.removeChild(elem);
  });
  // Передадим данные в контроллер для изменения данных сессии
  ajax('/updatecount', {
    data: arrList,
  });
  updatePrice();
  clearGeneralCount();
  turnSelectMode();
  // добавим пустые эелементы
  addEmptyElems();
  switchClearAllButton('all');
}

function filesUpload() {
  if (!this.files) return

  let token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

  let nowTime = new Date().getTime();
  let lastProgressUpload = 0;
  let lastProgressResize = 0;
  let progressUpload = 0;
  let progressResize = 0;
  let lastUploadPeriod = 0
  let lastResizePeriod = 0
  let lastTimeUpload = nowTime;
  let lastTimeResize = nowTime;
  let nowTimeUpload = nowTime;
  let nowTimeResize = nowTime;

  function changeProgress(progressAll) {

    let spanAllProgress = document.querySelector('.super-modal-message').querySelector('span')

    if (spanAllProgress) {
      if (progressAll > spanAllProgress.innerHTML) {
        spanAllProgress.innerHTML = progressAll
      }
    }
  }

  function progressUpdate() {
    // расчитывает общий процент загрузки и ресайза + обновляет текст


    var progressAll = Math.round(progressUpload + progressResize)
    changeProgress(progressAll)

    if (progressResize > 0 && progressResize < 50) {
      lastResizePeriod = progressResize - lastProgressResize
      speedResize = (nowTimeResize - lastTimeResize) / lastResizePeriod;

    } else {
      speedResize = 0
      lastResizePeriod = 0
    }

    if (progressUpload > 0 && progressUpload < 50) {
      lastUploadPeriod = progressUpload - lastProgressUpload
      speedUpdate = (nowTimeUpload - lastTimeUpload) / lastUploadPeriod;
    } else {
      speedUpdate = 0
      lastUploadPeriod = 0
    }
    let allSpeed = speedUpdate + speedResize
    let lastAllPeriods = lastResizePeriod + lastUploadPeriod
    clearInterval(shiftProgress)

    if (allSpeed > 0) {
      let shiftPeriod = 0
      var shiftProgress = setInterval(function () {
        shiftPeriod ++
        if (shiftPeriod > lastAllPeriods) { clearInterval(shiftProgress) } else { changeProgress(progressAll + shiftPeriod) }

      }, allSpeed);
    }
  }

  function getResize() {
    fetch('/progress').then(response => response.text()).then(data => {
      if (data && data != lastProgressResize * 2) {
        lastProgressResize = progressResize;
        progressResize = data / 2;
        lastTimeResize = nowTimeResize;
        nowTimeResize = new Date().getTime();
        progressUpdate();
      }
    });
  }

  turnONSuperModal('uploadProgress');

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/imageupload', true);

  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      lastProgressUpload = progressUpload;
      progressUpload = event.loaded / event.total * 100 / 2;
      lastTimeUpload = nowTimeUpload;
      nowTimeUpload = new Date().getTime();
      progressUpdate();
    }
  };
  let progressListener = setInterval(getResize, 250); // каждый период опрашиваются данные прогресса в АПИ
  xhr.onload = event => {
    let gallery = document.querySelector('.gallery');
    let elementBefore = gallery.querySelector('form');

    JSON.parse(event.target.response).forEach(result => {
      // Добавим загруженную миниатюру в элемент

      let elem = document.createElement('div');
      elem.id = result.id;
      elem.classList.add('image-box');
      elem.setAttribute('count', 1);
      elem.setAttribute('url', result.url);
      elem.style = 'background-image: url(' + result.thumbnail + ')';
      elem.innerHTML =
        '<div class="img-count hide"></div><div class="img-select hide"></div>';
      elem.addEventListener('click', imageBoxOpenModalListener, false);
      gallery.insertBefore(elem, elementBefore);

      // удалим пустые EMPTY блоки, если необходимо
      let fakeEmptyBlock = document.querySelector('.fake-empty-block');
      if (fakeEmptyBlock) {
        document.querySelector('.gallery').removeChild(fakeEmptyBlock);
      }
    });
    getResize() //последний запрос, что бы сбросить в 0
    clearInterval(progressListener);
    turnOFFSuperModal();
    updatePrice();
    addEmptyElems();

    // timeRecalc();
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
  turnONSuperModal('info');

  // повесим onclick на компку OK модального окна
  document
    .getElementById('ok-modal-button')
    .addEventListener(
      'click',
      function () {
        turnOFFSuperModal();
      },
      { once: true }
    );
}

function createDropListener() {
  // обработчик события перетаскивания фотографий в gallery
  let droptarget = document.querySelector('.gallery');

  // уберем собития стандартного открытия файла в соседнем окне
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    droptarget.addEventListener(
      eventName,
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      },
      false
    );
  });

  var dropPlus = document.querySelector('.dropPlus');
  ['dragenter', 'dragover'].forEach(eventName => {
    droptarget.addEventListener(
      eventName,
      function (event) {
        dropPlus.classList.add('drop-visibility');
        dropPlus.classList.remove('drop-no-visibility');
      },
      false
    );
  });
  droptarget.addEventListener(
    'dragleave',
    function (event) {
      dropPlus.classList.remove('drop-visibility');
      dropPlus.classList.add('drop-no-visibility');
    },
    false
  );
  droptarget.addEventListener(
    'drop',
    function (event) {
      dropPlus.classList.remove('drop-visibility');
      dropPlus.classList.add('drop-no-visibility');
      var files = event.dataTransfer.files;
      var dropFilesUpload = filesUpload.bind(event.dataTransfer);
      dropFilesUpload();

      // for (var i = 0; i < files.length; i++) {
      //   var file = files[i];
      //   console.log ('file: ' + file.name);
      // }

      return false;
    },
    false
  );
}

document.addEventListener('DOMContentLoaded', function () {
  // обработчик нопки info
  document.querySelector('.info').onclick = turnInfo;

  turnOFFSuperModal();
  updatePrice();

  // добавим пустые эелементы
  addEmptyElems();

  // обработчик нажатия на кнопку группового изменения
  document.getElementById('changeGroupButton').onclick = turnSelectMode;

  // обработчик на кнопку удалить все
  switchClearAllButton('all');

  // обработчик переключателя
  document.querySelectorAll('.switcher').forEach(elem => {
    elem.addEventListener('click', function () {
      switchRefresh(this);
    });
  });

  // обработчик пересчета цены с коробкой
  document.getElementById('box').addEventListener('click', function () {
    let textForBox = document.querySelector('.text-for-box');
    if (this.checked) {
      textForBox.classList.remove('hide');
    } else {
      textForBox.classList.add('hide');
      document.querySelector('textarea[name="text-for-box"]').value = '';
    }
    updatePrice();
  });

  document.querySelectorAll('.image-box').forEach(elem => {
    // пропишем стартовые колличества
    let count = elem.getAttribute('count');
    let imageCountElement = elem.querySelector('div.img-count');

    // покажем количество, если более 1шт
    if (count > 1) {
      imageCountElement.innerHTML = count + 'x';
      imageCountElement.classList.remove('hide');
    }

    // обработчик нажатия на фотогарфию
    elem.addEventListener('click', imageBoxOpenModalListener, false);
  });

  //Обработчик кнопок группового изменения Сохранить, Отмена и изменения количества
  document
    .getElementById('general-additional-button-save')
    .addEventListener('click', generalButtonsListnerSave, false);
  document
    .getElementById('general-additional-button-cancel')
    .addEventListener('click', generalButtonsListnerCancel, false);
  document.querySelectorAll('.general-inc-modal-button').forEach(elem => {
    elem.addEventListener('click', generalChangeCountListner, false);
  });

  // обработчик загрузки фотографий
  document.getElementById('imgLoad').onchange = filesUpload;

  // запустим обработчик события перетаскивания фотографий в gallery
  createDropListener();
});

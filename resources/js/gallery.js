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

function addEmptyElems() {
  // функция проверяет заполнена ли гарелеия фотографиями или есть пустые места.
  // добавляет в DOM пустые EMPTY элементы необходимого количества на всю возможную высоту window
// console.log ('ff')
  function isElemIsRight(elem) {
    // вспомогательная функция проверяет элемент находится в конце (справа) своего родителя (gallert)
    let margin = 1
    let gallery = document.querySelector('.gallery')
    let galleryRightSide = window.innerWidth - (gallery.offsetLeft + gallery.offsetWidth) //правый край блока родителя - gallery
    let elemRightSide = window.innerWidth - (elem.offsetLeft + elem.offsetWidth + 2 * margin)  //правый край эелемента
    return (galleryRightSide == elemRightSide)
  }

  function isControlsBlockMaxBottom() {
    let lineHeight = document.querySelector('.imgLoadPlusButton').offsetHeight // расстояние на которую смещается блок Controls, если добавляется ряд image-box, она равна высоте блока, к примеру Plus
    let controlsBlock = document.querySelector('.controls')
    let controlsBlockBottom = controlsBlock.offsetTop + controlsBlock.offsetHeight
    return ((lineHeight + controlsBlockBottom) > window.innerHeight)
  }

  function fillEmptyElems() {

    do {
      var emptyElem = document.createElement('div')
      emptyElem.classList.add('fake-empty-block')
      document.querySelector('.gallery').insertBefore(emptyElem, document.getElementById('fake-end-elem')) // 'fake-end-elem полседний блок, перед которым вставляются элементы EMPTY
      if (isElemIsRight(emptyElem)) {
        if (isControlsBlockMaxBottom()) {
          break
        }
      }
    } while (true)

  }

  let imageBoxes = document.querySelectorAll('.image-box')
  if (imageBoxes.length == 0) {
    // галерея пустая - возможно нужно добавить emty блоки
    fillEmptyElems()
  } else {
    // проерим последняя фотография в галерее справа или блок Controls еще не до конца в низу, значит есть пустые места
    if (!isElemIsRight(imageBoxes[imageBoxes.length - 1]) || !isControlsBlockMaxBottom()) {

      fillEmptyElems()

    }
  }


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
        addEmptyElems()

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
  addEmptyElems()
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
        addEmptyElems()
      },
      { once: true }
    );
}

function filesUpload() {
  function timeRecalc(start = false) {
    // Вспомогательная функция для плавного пересчета процента загрузки в промежутке между ответами сервера.
    if (start) {
      timepoints = {
        totalProgress: 0,
        progressShift: 0,
        time: parseInt(new Date().getTime()),
        lasttime: 0,
        onePointPerSecond: 1,
      };
    } else {
      timepoints.totalProgress += onePointProgress;
      timepoints.progressShift = 0;
      timepoints.lasttime = timepoints.time;
      timepoints.time = parseInt(new Date().getTime());
      timepoints.onePointPerSecond =
        (timepoints.time - timepoints.lasttime) / onePointProgress; // расчетное время прохождения одного процента
    }

    // запустим фукнцию с интервалом, разным расчтеному времени 1 процента
    let shiftProgress = setInterval(function () {
      if (timepoints.progressShift < onePointProgress) {
        document.querySelector('.super-modal-message').innerHTML =
          'Загрузка ' +
          Math.round(timepoints.totalProgress + timepoints.progressShift) +
          '%';
      } else {
        clearInterval(shiftProgress);
      }
      timepoints.progressShift++;
    }, timepoints.onePointPerSecond);
    if (Math.round(timepoints.totalProgress) == 100) {

      document.getElementById('imgLoad').value = null
      clearInterval(shiftProgress);
      updatePrice();
      turnOFFSuperModal();
    }
  }

  turnONSuperModal('uploadProgress');

  // одна фотография - это onePointProgress процентов загрузки
  let onePointProgress = 100 / this.files.length;

  // Запустим функцию плавного пересчета progress бара, пока нет ответа от сервера
  timeRecalc(true);

  // пройдемся по всему циклу выбранных файлов
  for (i = 0; i < this.files.length; i++) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/imageupload', true);

    xhr.onload = event => {

      let result = JSON.parse(event.target.response).result;

      // Добавим загруженную миниатюру в элемент
      let gallery = document.querySelector('.gallery');
      let elementBefore = gallery.querySelector('form');
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

      timeRecalc();

      // удалим пустые EMPTY блоки, если необходимо
      let fakeEmptyBlock = document.querySelector('.fake-empty-block')
      if (fakeEmptyBlock) gallery.removeChild(fakeEmptyBlock);

    };

    xhr.setRequestHeader('enctype', 'multipart/form-data');
    xhr.setRequestHeader(
      'X-CSRF-TOKEN',
      document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute('content')
    );
    var formData = new FormData();
    formData.append('image', this.files[i]);
    xhr.send(formData);
  }
}

function turnInfo() {
  // настроем моадальное окно
  turnONSuperModal('info')

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

document.addEventListener('DOMContentLoaded', function () {
  // обработчик нопки info
  document.querySelector('.info').onclick = turnInfo;

  updatePrice();


  // добавим пустые эелементы
  addEmptyElems()

  // на всякий случай запустим пресчет количества пустых EMPTY элементов при изменении окна браузера
  // window.onresize = addEmptyElems

  // обработчик нажатия на кнопку группового изменения
  document.getElementById('changeGroupButton').onclick = turnSelectMode;

  // обработчик на кнопку удалить все
  document.getElementById('clearAllImagesButton').onclick = clearAll;

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
});

const priceArr = new Object ({
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

function getPhotoCount () {
  let allPhotos = document.querySelectorAll ('.image-box');
  let count = 0;
  allPhotos.forEach (el => {
    count += Number (el.getAttribute ('count'));
  });
  return count;
}

function updatePrice () {
  let paramSelected = {
    product: document.querySelector ('.param.active[name="product"]').attributes
      .value.value,
    size: document.querySelector ('.param.active[name="size"]').attributes.value
      .value,
    'white-border': document.getElementById ('white-border').checked,
    box: document.getElementById ('box').checked,
  };

  let pricePerOne = priceArr[paramSelected.product].size[paramSelected.size];
  let count = getPhotoCount ();

  if (paramSelected.box) {
    priceAdditionally = 0;
    priceArr[paramSelected.product].box[paramSelected.size].forEach (ee => {
      if (count <= ee.maxCount && count >= ee.minCount)
        priceAdditionally = ee.price;
    });
  } else {
    priceAdditionally = 0;
  }

  let priceToBasket = pricePerOne * count + priceAdditionally;

  document.querySelector ('input[name="summ"]').value = priceToBasket;
  document.getElementById (
    'price-to-basket'
  ).innerHTML = priceToBasket.toLocaleString ('rus-IN');

  let productName = document.querySelector ('.param.active[name="product"]')
    .innerHTML;
  document.getElementById ('description-1').innerHTML =
    productName + ': <b>' + count + ' шт.</b> x <b>' + pricePerOne + '₽</b>';
  document.getElementById ('description-2').innerHTML = paramSelected.box
    ? '+ коробка: <b>' + priceAdditionally + '₽</b>'
    : '';
}

function switchRefresh (element) {
  // обновление переключателя
  let switchStatus = element.checked.toString ();
  let params = element.parentNode.parentNode.querySelectorAll ('.param');
  params.forEach (el => {
    if (el.getAttribute ('switchdata') === switchStatus) {
      el.classList.add ('active');
      el.classList.remove ('inactive');
    } else {
      el.classList.add ('inactive');
      el.classList.remove ('active');
    }
  });

  updatePrice ();
}

function changeModalCount () {
  let currentImage = document.getElementById (this.id);
  let modalTempData = document.getElementById ('modal-temporary-data'); //буфер модального окна

  let currentCount = modalTempData.value
    ? modalTempData.value
    : currentImage.getAttribute ('count');
  currentCount = Number (currentCount) + Number (this.increase);
  if (currentCount < 0) currentCount = 0;
  document.getElementById ('image-modal-count').innerHTML = currentCount;
  modalTempData.value = currentCount;
}

function ajax (url, data) {
  fetch (url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text-plain, */*',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document
        .querySelector ('meta[name="csrf-token"]')
        .getAttribute ('content'),
    },
    method: 'post',
    credentials: 'same-origin',
    body: JSON.stringify (data),
  })
    .then (response => response.json ())
    .then (response => {
      console.log (response);
    })
    .catch (function (error) {
      console.log (error);
    });
}

const imageBoxOpenModalListener = function () {
  // функция нажатия на фотографию - открытие модального окна
  // настраиваем модальное окно
  let imageUrl = this.getAttribute ('url');
  document.querySelector ('.super-modal').classList.remove ('hide');
  document.querySelector ('.modal-img-block').classList.remove ('hide');
  document.querySelector ('.count-block').classList.remove ('hide');
  document.querySelector ('.modal-img-block').style =
    'background-image: url(' + imageUrl + ')';
  document.getElementById ('image-modal-count').innerHTML = this.getAttribute (
    'count'
  );
  document.querySelector ('.modal-block').style = 'margin-top: -205px';

  // повесим onclick на компку OK модального окна
  document
    .getElementById ('ok-modal-button')
    .addEventListener (
      'click',
      function () {
        let count = document.getElementById ('modal-temporary-data').value;
        this.setAttribute ('count', count);
        let imageCountElement = this.querySelector ('div.img-count');

        //Передадим данные в контроллер для изменения данных сессии
        ajax ('/updatecount', {
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
          imageCountElement.classList.remove ('hide');
        } else {
          imageCountElement.classList.add ('hide');
        }

        // удалим фотогарфию
        if (count == 0) {
          this.remove ();
        }
        turnOFFSuperModal ();
        // document.querySelector ('.super-modal').classList.add ('hide');
      }.bind (this),
      {once: true}
    );

  document
    .querySelectorAll ('.inc-modal-button')
    .forEach (changeModalButton => {
      changeModalButton.onclick = changeModalCount.bind ({
        id: this.id,
        increase: changeModalButton.getAttribute ('direction'),
      });
    });
};

const generalChangeCountListner = function () {
  // изменяет количество выбранных фотографий
  let newGeneralCount =
    window.selectElemsArr.count + Number (this.getAttribute ('direction'));

  if (newGeneralCount >= 0) {
    window.selectElemsArr.count = newGeneralCount;
    document.getElementById (
      'general-image-modal-count'
    ).innerHTML = newGeneralCount;
  }
};

const generalButtonsListnerSave = function () {
  // конпка группового выбора СОХРАНИТЬ
  let arrList = [];
  window.selectElemsArr.list.forEach (data => {
    arrList.push ({
      id: data,
      count: window.selectElemsArr.count,
    });
    // изменим количество в DIV элементах
    let elem = document.getElementById (data);
    if (window.selectElemsArr.count > 0) {
      elem.setAttribute ('count', window.selectElemsArr.count);
      elem.querySelector ('.img-count').innerHTML =
        window.selectElemsArr.count + 'x';
    } else {
      elem.parentNode.removeChild (elem);
    }
  });
  // Передадим данные в контроллер для изменения данных сессии
  ajax ('/updatecount', {
    data: arrList,
  });
  clearGeneralCount ();
  turnSelectMode ();
};

const generalButtonsListnerCancel = function () {
  // конпка группового выбора ОТМЕНА
  clearGeneralCount ();
  turnSelectMode ();
};

function clearGeneralCount () {
  window.selectElemsArr = {
    list: [],
    count: 1,
  };
  document.getElementById ('general-image-modal-count').innerHTML = 1;
}

function turnAdditionalConfigButtons () {
  let status = window.selectElemsArr.list.length !== 0;
  let countBlock = document.querySelector ('.general-count-block');
  let buttonsBlock = document.querySelector ('.buttons');

  if (status) {
    document
      .querySelector ('.general-count-block')
      .classList.remove ('half-opacity');
    document
      .getElementById ('general-additional-button-save')
      .classList.remove ('half-opacity');

    document
      .querySelector ('.general-additional-params-block')
      .querySelector ('p')
      .classList.add ('hide');
  } else {
    document
      .querySelector ('.general-count-block')
      .classList.add ('half-opacity');
    document
      .getElementById ('general-additional-button-save')
      .classList.add ('half-opacity');

    document
      .querySelector ('.general-additional-params-block')
      .querySelector ('p')
      .classList.remove ('hide');
    clearGeneralCount ();
  }
}

const imageSelectListener = function () {
  let selectElem = this.querySelector ('.img-select');
  if (selectElem.classList.contains ('hide')) {
    // элемент выбран
    selectElem.classList.remove ('hide');
    window.selectElemsArr.list.push (this.id);
  } else {
    // элемент Не выбран
    selectElem.classList.add ('hide');
    let idTodelete = this.id;
    window.selectElemsArr.list = window.selectElemsArr.list.filter (function (
      item
    ) {
      return item !== idTodelete;
    });
    // delete window.selectElemsArr.list[this.id]
  }
  turnAdditionalConfigButtons ();
};

function turnSelectMode () {
  let button = document.getElementById ('changeGroupButton');
  let status = button.value == 'on' ? true : false;
  let imageBoxes = document.querySelectorAll ('.image-box');

  if (status) {
    // режим выделения ВЫКЛЮЧЕН
    button.value = 'off';
    button.classList.remove ('hide');
    imageBoxes.forEach (elem => {
      elem.removeEventListener ('click', imageSelectListener, false);
      elem.addEventListener ('click', imageBoxOpenModalListener, false);
      if (elem.getAttribute ('count') > 1) {
        elem.querySelector ('.img-count').classList.remove ('hide');
      }
      elem.querySelector ('.img-select').classList.add ('hide');
    });

    document
      .querySelector ('.general-additional-params-block')
      .classList.add ('hide');
    document.querySelector ('.general-params-block').classList.remove ('hide');
    document.getElementById ('imgLoadPlusButton').classList.remove ('hide');
    document.getElementById ('clearAllImagesButton').classList.add ('hide');
    document
      .querySelector ('.to-order-block')
      .classList.remove ('half-opacity');
    document.querySelector ('.info').classList.remove ('half-opacity');
  } else {
    // режим выделения ВКЛЮЧЕН
    button.value = 'on';
    button.classList.add ('hide');

    clearGeneralCount (); //очистим массив с выбранным количеством

    imageBoxes.forEach (elem => {
      elem.removeEventListener ('click', imageBoxOpenModalListener, false);
      elem.addEventListener ('click', imageSelectListener, false);
      elem.querySelector ('.img-count').classList.add ('hide');
    });

    document
      .querySelector ('.general-additional-params-block')
      .classList.remove ('hide');
    document.querySelector ('.general-params-block').classList.add ('hide');
    document.getElementById ('imgLoadPlusButton').classList.add ('hide');
    document.getElementById ('clearAllImagesButton').classList.remove ('hide');
    document.querySelector ('.to-order-block').classList.add ('half-opacity');
    document.querySelector ('.info').classList.add ('half-opacity');
  }
}

function clearAll () {
  // удаляет все фотографии
  // настроем моадальное окно
  document.querySelector ('.super-modal').classList.remove ('hide');
  document.querySelector ('.super-modal-message').innerHTML =
    'Удалить все загруженные фотографии?';
  document.querySelector ('.super-modal-message').classList.remove ('hide');
  document.getElementById ('cancel-modal-button').classList.remove ('hide');
  document.querySelector ('.modal-block').style = 'margin-top: -78px';

  // повесим onclick на компку OK модального окна
  document
    .getElementById ('ok-modal-button')
    .addEventListener (
      'click',
      function () {
        // Удалим все блоки с изображениями
        document.querySelectorAll ('.image-box').forEach (elem => {
          elem.parentNode.removeChild (elem);
        });

        ajax ('/eraseall', {});

        turnSelectMode ();
        turnOFFSuperModal ();
      },
      {once: true}
    );
}

function uploadToController (file) {
  if (file) {
    var xhr = new XMLHttpRequest ();

    upload = xhr.upload;

    // Создаем прослушиватель события progress, который будет "двигать" прогресс-бар.
    upload.addEventListener (
      'progress',
      function (event) {
        if (event.lengthComputable) {
          // var pbar = $('tr.' + trnum + ' td.size div.pbar');
          console.log (Math.round (event.loaded / event.total * 100));
          // pbar.css('width', Math.round((event.loaded / event.total) * 100) + 'px');
        }
      },
      false
    );
    // // Создаем прослушиватель события load, который по окончанию загрузки подсветит прогресс-бар зеленым.
    // upload.addEventListener('load', function(event) {
    // 	var pbar = $('tr.' + trnum + ' td.size div.pbar');
    // 	pbar.css('width', '100px');
    // 	pbar.css('background', 'green');
    // }, false);
    // // Создаем прослушиватель события error, который при ошибке подсветит прогресс-бар красным.
    // upload.addEventListener('error', function(event) {
    // 	var pbar = $('tr.' + trnum + ' td.size div.pbar');
    // 	pbar.css('width', '100px');
    // 	pbar.css('background', 'red');
    // }, false);

    // Откроем соединение.
    xhr.open ('POST', '/imageupload');

    // Устанавливаем заголовки.
    xhr.setRequestHeader ('Cache-Control', 'no-cache');
    xhr.setRequestHeader ('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader ('X-File-Name', file.name);
    // Отправляем файл.
    xhr.send (file);
  }
}

function filesUpload (data) {
  let files = data.target.files;
  console.log (files);

  for (var i = 0, file; (file = data.target.files[i]); i++) {
    if (!file.type.match ('image.*')) {
      console.log ('noJPEG', file);
    }
    uploadToController (file);

    // var reader = new FileReader();

    // reader.onload = function (result) {
    //   console.log('result', result)
    //   // ajax ('/imageupload', result)
    // // uploadToController ()
    // };

    // reader.onprogress = function (progress) {
    //   console.log('progress', progress)
    // }

    // reader.readAsDataURL(file);
  }
}

function turnInfo () {
  // настроем моадальное окно
  document.querySelector ('.super-modal').classList.remove ('hide');
  document.querySelector ('.super-modal-message').innerHTML = document.getElementById('info-page').innerHTML
  document.querySelector ('.super-modal-message').classList.remove ('hide');
  // document.querySelector ('.modal-block').style = 'margin-top: -78px';

  // повесим onclick на компку OK модального окна
  document
    .getElementById ('ok-modal-button')
    .addEventListener (
      'click',
      function () {
        turnOFFSuperModal ();
      },
      {once: true}
    );
}

document.addEventListener ('DOMContentLoaded', function () {
  // обработчик нопки info
  document.querySelector ('.info').onclick = turnInfo;

  updatePrice ();

  // обработчик нажатия на кнопку группового изменения
  document.getElementById ('changeGroupButton').onclick = turnSelectMode;

  // обработчик на кнопку удалить все
  document.getElementById ('clearAllImagesButton').onclick = clearAll;

  // обработчик переключателя
  document.querySelectorAll ('.switcher').forEach (elem => {
    elem.addEventListener ('click', function () {
      switchRefresh (this);
    });
  });

  // обработчик пересчета цены с коробкой
  document.getElementById ('box').addEventListener ('click', function () {
    let textForBox = document.querySelector ('.text-for-box');
    if (this.checked) {
      textForBox.classList.remove ('hide');
    } else {
      textForBox.classList.add ('hide');
      document.querySelector ('textarea[name="text-for-box"]').value = '';
    }
    updatePrice ();
  });

  document.querySelectorAll ('.image-box').forEach (elem => {
    // пропишем стартовые колличества
    let count = elem.getAttribute ('count');
    let imageCountElement = elem.querySelector ('div.img-count');

    // покажем количество, если более 1шт
    if (count > 1) {
      imageCountElement.innerHTML = count + 'x';
      imageCountElement.classList.remove ('hide');
    }

    // обработчик нажатия на фотогарфию
    elem.addEventListener ('click', imageBoxOpenModalListener, false);
  });

  //Обработчик кнопок группового изменения Сохранить, Отмена и изменения количества
  document
    .getElementById ('general-additional-button-save')
    .addEventListener ('click', generalButtonsListnerSave, false);
  document
    .getElementById ('general-additional-button-cancel')
    .addEventListener ('click', generalButtonsListnerCancel, false);
  document.querySelectorAll ('.general-inc-modal-button').forEach (elem => {
    elem.addEventListener ('click', generalChangeCountListner, false);
  });

  // обработчик загрузки фотографий
  document.getElementById ('imgLoad').onchange = filesUpload;
});

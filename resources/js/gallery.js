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
  // let currentImage = document.getElementById (this.id); //div самого изображения
  let currentImage = document.querySelector('div[name="' + this.id + '"]');
  let modalTempData = document.getElementById('modal-temporary-data'); //буфер модального окна

  let currentCount = modalTempData.value
    ? modalTempData.value
    : currentImage.getAttribute('count');
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
      callBack(response)
      // console.log (response)
      // console.log (JSON.parse(response));
      // form.reset ();
      // window.location.href = redirect;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function turnOffSuperModal() {
  document.querySelector('.super-modal').classList.add('hide');
  document.querySelector('.modal-img-block').style = '';
  document.getElementById('image-modal-count').innerHTML = '';
}

var imageBoxListener = function ImageBoxClick() {
  // функция нажатия на фотографию

  // настраиваем модальное окно
  let imageUrl = this.getAttribute('name')
  document.querySelector('.super-modal').classList.remove('hide');
  document.querySelector('.modal-img-block').style =
    'background-image: url(' + imageUrl + ')';
  document.getElementById(
    'image-modal-count'
  ).innerHTML = this.getAttribute('count');

  // повесим onclick на компку OK модального окна
  document.getElementById('ok-modal-button').onclick = () => {
    let count = document.getElementById('modal-temporary-data').value;
    this.setAttribute('count', count);
    let imageCountElement = this.querySelector('div');

    //Передадим данные в контроллер для изменения данных сессии
    ajax('/updatecount', {
      url: imageUrl,
      count: count
    }, () => { console.log(this) });

    // 

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
    } else {
    }

    document.querySelector('.super-modal').classList.add('hide');
  };

  document
    .querySelectorAll('.inc-modal-button')
    .forEach(changeModalButton => {
      changeModalButton.onclick = changeModalCount.bind({
        id: this.getAttribute('name'),
        increase: changeModalButton.getAttribute('direction'),
      });
    });

  document.addEventListener('keyup', key => {
    if (key.key === 'Escape') turnOffSuperModal()
  }, { once: true })

  document.querySelector('.close-modal-button').querySelector('button').onclick = turnOffSuperModal
  document.querySelector('.super-modal').classList.remove('hide');
}

var imageSelectListener = function () {
  console.log (this)
}

function turnCheckBoxes() {
  let button = document.getElementById('changeGroupButton')
  let status = button.value == 'on' ? true : false

  if (status) {
    // выключен режим выделения
    button.value = 'off'
    button.classList.remove('active-button')
    let imageBoxes = document.querySelectorAll('.image-box')
    imageBoxes.forEach(elem => {
      elem.addEventListener('click', imageBoxListener, false)
      if (elem.getAttribute('count') > 1) elem.querySelector('.img-count').classList.remove('hide')
      elem.querySelector('.img-select').classList.add('hide')
      
    })
  } else {
    // включен режим выделения
    button.value = 'on'
    button.classList.add('active-button')

    let imageBoxes = document.querySelectorAll('.image-box')
    imageBoxes.forEach(elem => {
      elem.removeEventListener('click', imageBoxListener, false)
      elem.querySelector('.img-select').addEventListener('click', imageSelectListener.bind(elem), false)

      elem.querySelector('.img-count').classList.add('hide')
      elem.querySelector('.img-select').classList.remove('hide')
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {

  updatePrice();

  // обработчик нажатия на кнопку группового изменения
  console.log(document.getElementById('changeGroupButton'))
  document.getElementById('changeGroupButton').onclick = turnCheckBoxes
  console.log(document.getElementById('changeGroupButton'))

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

  document
    .getElementById('white-border')
    .addEventListener('click', function () {
      updatePrice();
    });

  // обработчик нажатия на фотогарфию
  document.querySelectorAll('.image-box').forEach(elem => {

    // пропишем стартовые колличества
    let count = elem.getAttribute('count')
    let imageCountElement = elem.querySelector('div');

    // покажем количество, если более 1шт
    if (count > 1) {
      imageCountElement.innerHTML = count + 'x';
      imageCountElement.classList.remove('hide');
    }

    elem.addEventListener('click', imageBoxListener, false);
  });
});

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
          'maxCount': 100,
          'minCount': 1,
        },
        {
          price: 3500,
          'maxCount': 1000,
          'minCount': 101,
        },
      ],
      '15x21': [
        {
          price: 700,
          'maxCount': 150,
          'minCount': 1,
        },
        {
          price: 5000,
          'maxCount': 1000,
          'minCount': 151,
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
          'maxCount': 100,
          'minCount': 1,
        },
        {
          price: 3500,
          'maxCount': 1000,
          'minCount': 101,
        },
      ],
      '15x21': [
        {
          price: 700,
          'maxCount': 150,
          'minCount': 1,
        },
        {
          price: 5000,
          'maxCount': 1000,
          'minCount': 151,
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
  let currentImage = document.getElementById(this.id) //div самого изображения
  let modalTempData = document.getElementById('modal-temporary-data') //буфер модального окна

  let currentCount = modalTempData.value ? modalTempData.value : currentImage.getAttribute('count')
  console.log(this)
  currentCount = Number(currentCount) + Number(this.increase)
  if (currentCount < 0) currentCount = 0
  document.getElementById('image-modal-count').innerHTML = currentCount
  modalTempData.value = currentCount
}

document.addEventListener('DOMContentLoaded', function () {
  updatePrice();

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
  let allImageBlocks = document.querySelectorAll('.image-box')
  allImageBlocks.forEach(elem => {
    elem.addEventListener('click', function () {

      document.querySelector('.modal-img-block').style = 'background-image: url(' + this.id + ')'
      document.getElementById('image-modal-count').innerHTML = this.getAttribute('count')

      document.querySelectorAll(".inc-modal-button").forEach(changeModalButton => {
        changeModalButton.onclick = changeModalCount.bind({
          id: this.id,
          increase: changeModalButton.getAttribute('direction')
        })
      })

      document.querySelector('.super-modal').classList.remove('hide')
    })
  })
});

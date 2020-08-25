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
      '10x15': {
        price: 500,
        maxcount: 100,
      },
      '15x21': {
        price: 700,
        maxcount: 150,
      },
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
      '10x15': {
        price: 500,
        maxcount: 15,
      },
      '15x21': {
        price: 700,
        maxcount: 30,
      },
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
  let priceAdditionally = paramSelected.box
    ? priceArr[paramSelected.product].box[paramSelected.size].price
    : 0;
  let count = getPhotoCount ();
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

document.addEventListener ('DOMContentLoaded', function () {
  updatePrice ();

  document.querySelectorAll ('.switcher').forEach (elem => {
    elem.addEventListener ('click', function () {
      switchRefresh (this);
    });
  });

  document.getElementById ('box').addEventListener ('click', function () {
    let textForBox = document.querySelector ('.text-for-box');
    if (this.checked) {
      textForBox.classList.remove ('hide');
    } else {
      textForBox.classList.add ('hide');
      document.querySelector ('input[name="text-for-box"]').value = '';
    }

    updatePrice ();
  });

  document
    .getElementById ('white-border')
    .addEventListener ('click', function () {
      updatePrice ();
    });
});

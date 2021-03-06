function setCursorPosition (pos, elem) {
  elem.focus ();
  if (elem.setSelectionRange) elem.setSelectionRange (pos, pos);
  else if (elem.createTextRange) {
    var range = elem.createTextRange ();
    range.collapse (true);
    range.moveEnd ('character', pos);
    range.moveStart ('character', pos);
    range.select ();
  }
}

function mask (event) {
  var matrix = '+7 (___) ___-____',
    i = 0,
    def = matrix.replace (/\D/g, ''),
    val = this.value.replace (/\D/g, '');
  if (def.length >= val.length) val = def;
  this.value = matrix.replace (/./g, function (a) {
    return /[_\d]/.test (a) && i < val.length
      ? val.charAt (i++)
      : i >= val.length ? '' : a;
  });
  if (event.type == 'blur') {
    if (this.value.length == 2) this.value = '';
  } else setCursorPosition (this.value.length, this);
}

function recalcAllPrice () {
  let orderSumm = 0;
  let deliverySumm = document
    .querySelector ('input[name="delivery"]:checked')
    .getAttribute ('price');

  document.querySelectorAll ('.price').forEach (elem => {
    orderSumm += Number (elem.getAttribute ('price'));
  });

  let allSumm = Number (orderSumm) + Number (deliverySumm);
  let allSummElem = document.getElementById ('all-price');
  allSummElem.innerHTML = allSumm;
  allSummElem.setAttribute ('allsumm', allSumm);

  document.querySelector('input[name="price"]').value = orderSumm
  document.querySelector('input[name="deliveryprice"]').value = deliverySumm
}

document.addEventListener ('DOMContentLoaded', function () {
  recalcAllPrice ();
  const elems = document.getElementById ('tel');
  elems.addEventListener ('input', mask);
  elems.addEventListener ('focus', mask);
  elems.addEventListener ('blur', mask);

  let adress = document.querySelector ('.adress-block');

  document.querySelectorAll ('input[name="delivery"]').forEach (elem => {
    elem.onchange = function (event) {
      if (event.target.value == 'vrn_delivery') {
        adress.classList.remove ('hide');
      } else {
        adress.classList.add ('hide');
      }
      recalcAllPrice ();
    };
  });

  // если есть ошибка - на всякий случай сделаем скрол к ней (вниз)
  if (document.querySelector('.alert')) {
    var scrollingElement = (document.querySelector('.container'));
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }
});

window.ajax = function (
  url,
  data,
  callBack = response => {
    // console.log ('ajax', response);
    // return true
  }
) {
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
      callBack (response);
      // console.log (callBack);
    })
    .catch (function (error) {
      console.log (error);
    });
};

window.updateBasketIconCount = function () {
  ajax ('/getBasketCount', {}, result => {
    // console.log (result)
    if (result != false) {
      document.querySelector ('.basket').classList.remove ('half-opacity');
      let basketPrice = result.summ;
      document.getElementById ('basket-icon-summ').innerHTML =
        basketPrice.toLocaleString ('rus-IN') + ' ₽';
      document.getElementById ('basket-icon-summ').classList.remove ('hide');
    } else {
      document.querySelector ('.basket').classList.add ('half-opacity');
      document.getElementById ('basket-icon-summ').innerHTML = '0 ₽';
      // document.getElementById ('basket-icon-summ').classList.add ('hide')
    }
  });
};

function SetBoxLenght () {
  document.querySelector ('body').style.height = document.body.clientHeight;
  //   console.log (screen.height)
  //   // console.log (document.body.clientHeight)/

  //   let imageBoxses = document.querySelectorAll ('.image-box');
  //   let gallery = document.querySelector ('.gallery');
  //   let galleyWidth = gallery.offsetWidth;

  //   let margin = 1;
  //   let countInline = Math.floor (galleyWidth / 120); //минимальный размер элемента
  //   if (countInline < 4) countInline = 4;
  //   let boxLenght = Math.floor (galleyWidth / countInline) - margin * 2;
  //   gallery.style.width = countInline * (boxLenght + margin * 2);

  //   imageBoxses.forEach (oneBox => {
  //     oneBox.style.width = boxLenght;
  //     oneBox.style.height = boxLenght;
  //     oneBox.style.margin = margin;
  //   });
}

function setBodyHeight () {
    document.querySelector ('body').style =
      'max-height: ' + document.body.clientHeight + 'px;';
  };


document.addEventListener ('DOMContentLoaded', function () {
//   setBodyHeight ()
//   window.onresize = setBodyHeight
});

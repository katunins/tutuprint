<link rel="stylesheet" href="{{ asset('css/supermodal.css') }}">
<input type="hidden" id="modal-temporary-data" value="">

<div class="super-modal hide">
    <div class="modal-block">
        <div class="close-modal-button hide">
            <button onclick="turnOFFSuperModal()">×</button>
        </div>
        <div class="modal-img-block hide"></div>
        <div id="file-data-text"></div>
        <div class="modal-cssload-wrap hide">
            <div class="cssload-cssload-spinner"></div>
        </div>
        <div class="count-block hide">
            <div class="image-change-count">
                <button class="inc-modal-button" direction=1>+</button>
            </div>
            <div class="count"><span id="image-modal-count">1</span> шт.</div>
            <div class="image-change-count">
                <button class="inc-modal-button" direction=-1>-</button>
            </div>
        </div>
        <div class="super-modal-message hide">Удалить все фотографии?</div>
        <div class="super-model-buttons">
            <button class="hide" id="ok-modal-button">ok</button>
            <button class="hide" id="cancel-modal-button">Отменить</button>
        </div>

    </div>
</div>
<script>
    let okButton = document.getElementById('ok-modal-button')
    let cancelButton = document.getElementById('cancel-modal-button')

    function changeModalCount() {
  let modalTempData = document.getElementById('modal-temporary-data'); //буфер модального окна
  let currentImage = document.getElementById(this.id);

  if (modalTempData.value == '') {
    currentCount = currentImage.getAttribute('count');
    modalTempData.value = currentCount;
  } else {
    currentCount = modalTempData.value;
  }
  currentCount = Number(currentCount) + Number(this.increase);
  if (currentCount < 0) currentCount = 0;
  document.getElementById('image-modal-count').innerHTML = currentCount;
  modalTempData.value = currentCount;
}

    function setOkModalButton (okButtonCallback = turnOFFSuperModal, name = 'ok') {
        
        okButton.innerHTML = name
        // okButton.addEventListener('click', okButtonCallback)
        okButton.onclick = okButtonCallback
        okButton.classList.remove ('hide')

    }

    
    function setCancelModalButton (cancelButtonCallback = turnOFFSuperModal, name = 'Отмена') {

        cancelButton.innerHTML = name
        // cancelButton.addEventListener('click', cancelButtonCallback)
        cancelButton.onclick = cancelButtonCallback
        cancelButton.classList.remove ('hide')

    }

    function turnOFFSuperModal() {

        document.querySelector('.super-modal').classList.add('hide')
        document.querySelector('.modal-img-block').style=''
        document.querySelector('.modal-img-block').classList.add('hide')
        document.querySelector('.count-block').classList.add('hide')
        document.querySelector('.super-modal-message').innerHTML = ''
        document.querySelector('.super-modal-message').classList.add('hide')
        document.removeEventListener('keyup',escKey);
        document.getElementById('file-data-text').classList.add('hide')
        document.querySelector('.modal-block').style = ''
        document.querySelector('.modal-cssload-wrap').classList.add('hide');
        document.getElementById('modal-temporary-data').value='';
        document.querySelector('.close-modal-button').classList.add('hide');
        
        okButton.classList.add('hide')
        cancelButton.classList.add('hide')
        
    }

    function escKey (key) {
        if (key.key === 'Escape') turnOFFSuperModal();
    }

    function turnONmodalLoader () {
        document.querySelector('.modal-cssload-wrap').classList.remove('hide');
    }

    function turnONmodalMessage (message) {
        document.querySelector('.super-modal-message').classList.remove('hide');
        document.querySelector('.super-modal-message').innerHTML = message
    }

    function turnONmodalImage (url, width = '500px', height = '400px') {
        document.querySelector('.modal-img-block').classList.remove('hide');
        document.querySelector('.modal-img-block').style.backgroundImage = url//'url(' + url + ')'
        document.querySelector('.modal-img-block').style.width = width
        document.querySelector('.modal-img-block').style.height = height
    }

    function turnONmodalCount (count) {
        document.getElementById ('image-modal-count').innerHTML = count
        document.getElementById ('modal-temporary-data').value = count
        document.querySelector('.count-block').classList.remove('hide');
    }

    function turnONmodalFilename (filename) {
        document.getElementById ('file-data-text').innerHTML = filename
        document.getElementById('file-data-text').classList.remove('hide')
    }

    function turnONmodal (margin, closeButton = true) {
        document.querySelector('.super-modal').classList.remove('hide');
        document.querySelector('.modal-block').style.marginTop = margin;
        
        if (closeButton) {
            document.querySelector('.close-modal-button').classList.remove('hide');
            document.addEventListener('keyup',escKey, {once: true});
        }
    }

</script>
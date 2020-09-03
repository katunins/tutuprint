<link rel="stylesheet" href="{{ asset('css/supermodal.css') }}">
<input type="hidden" id="modal-temporary-data">

<div class="super-modal hide">
    <div class="modal-block">
        <div class="close-modal-button hide">
            <button onclick="turnOFFSuperModal()">×</button>
        </div>
        <div class="modal-img-block hide"></div>
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
            <button class="hide" id="cancel-modal-button" onclick="turnOFFSuperModal()">Отменить</button>
        </div>

    </div>
</div>
<script>
    function turnOFFSuperModal() {
        document.querySelector('.super-modal').classList.add('hide')
        document.querySelector('.modal-img-block').classList.add('hide')
        document.querySelector('.count-block').classList.add('hide')
        document.querySelector('.super-modal-message').innerHTML = ''
        document.querySelector('.super-modal-message').classList.add('hide')
        document.getElementById('cancel-modal-button').classList.add('hide')
        document.querySelector('.modal-block').style = ''
        document.querySelector('.modal-cssload-wrap').classList.add('hide');
        document.getElementById('ok-modal-button').classList.add('hide');
        document.querySelector('.close-modal-button').classList.add('hide');
    }

    function turnONSuperModal(status) {
        switch (status) {

            case 'uploadProgress':
                document.querySelector('.super-modal').classList.remove('hide');
                document.querySelector('.modal-cssload-wrap').classList.remove('hide');
                document.querySelector('.super-modal-message').classList.remove('hide');
                document.querySelector('.modal-block').style = 'margin-top: -135px';
                break

            case 'clickToImage':
                document.getElementById('ok-modal-button').classList.remove('hide');
                document.querySelector('.close-modal-button').classList.remove('hide');
                document.querySelector('.super-modal').classList.remove('hide');
                document.querySelector('.modal-img-block').classList.remove('hide');
                document.querySelector('.count-block').classList.remove('hide');
                document.querySelector('.modal-block').style = 'margin-top: -283px';
                document.addEventListener(
                    'keyup',
                    key => {
                        if (key.key === 'Escape') turnOFFSuperModal();
                    }, {
                        once: true
                    }
                );
                break

            case 'clearAll':
                document.getElementById('ok-modal-button').classList.remove('hide');
                document.querySelector('.close-modal-button').classList.remove('hide');
                document.querySelector('.super-modal').classList.remove('hide');
                document.querySelector('.super-modal-message').innerHTML =
                    'Удалить все загруженные фотографии?';
                document.querySelector('.super-modal-message').classList.remove('hide');
                document.getElementById('cancel-modal-button').classList.remove('hide');
                document.querySelector('.modal-block').style = 'margin-top: -78px';
                document.addEventListener(
                    'keyup',
                    key => {
                        if (key.key === 'Escape') turnOFFSuperModal();
                    }, {
                        once: true
                    }
                );
                break

            case 'info':
                document.querySelector ('.super-modal').classList.remove ('hide');
                document.querySelector ('.super-modal-message').innerHTML = document.getElementById ('info-page').innerHTML;
                document.querySelector ('.super-modal-message').classList.remove ('hide');
                document.getElementById('ok-modal-button').classList.remove('hide');
                document.querySelector('.close-modal-button').classList.remove('hide');
                // document.querySelector ('.modal-block').style = 'margin-top: -78px';
                document.addEventListener(
                    'keyup',
                    key => {
                        if (key.key === 'Escape') turnOFFSuperModal();
                    }, {
                        once: true
                    }
                );
                break
        }
    }

</script>
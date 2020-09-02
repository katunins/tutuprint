<link rel="stylesheet" href="{{ asset('css/supermodal.css') }}">
<input type="hidden" id="modal-temporary-data">

<div class="super-modal hide">
    <div class="modal-block">
        <div class="close-modal-button">
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
            <button id="ok-modal-button">ok</button>
            <button class="hide" id="cancel-modal-button" onclick="turnOFFSuperModal()">Отменить</button>
        </div>

    </div>
</div>
<script>
    function turnOFFSuperModal () {
        document.querySelector('.super-modal').classList.add('hide')
        document.querySelector('.modal-img-block').classList.add('hide')
        document.querySelector('.count-block').classList.add('hide')
        document.querySelector ('.super-modal-message').innerHTML = '' 
        document.querySelector ('.super-modal-message').classList.add('hide')
        document.getElementById('cancel-modal-button').classList.add('hide')
        document.querySelector('.modal-block').style=''
        document.querySelector('.modal-cssload-wrap').classList.add ('hide');
        }

        document.addEventListener(
            'keyup',
            key => {
            if (key.key === 'Escape') turnOFFSuperModal();
            },
            { once: true }
        );
</script>
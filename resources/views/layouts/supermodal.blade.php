<link rel="stylesheet" href="{{ asset('css/supermodal.css') }}">

<div class="super-modal hide">
    <div class="modal-block">
        <div class="close-modal-button"><button
                onclick="document.querySelector('.super-modal').classList.add('hide')">x</button></div>
        <div class="modal-img-block"></div>
        <div class="count-block">
            <div class="image-change-count">
                <button id="inc-modal-button" direction=1>+</button>
            </div>
            <div class="count"><span id="image-modal-count">1</span> шт.</div>
            <div class="image-change-count">
                <button id="dec-modal-button" direction=-1>-</button>
            </div>
        </div>
        <div class="remove-button">
            <button>ok</button>
        </div>
    </div>
</div>

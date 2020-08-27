<link rel="stylesheet" href="{{ asset('css/supermodal.css') }}">
<input type="hidden" id="modal-temporary-data">

<div class="super-modal hide">
    <div class="modal-block">
        <div class="close-modal-button">
            {{-- <button onclick="document.querySelector('.super-modal').classList.add('hide');
            document.getElementById('modal-temporary-data').value = null">×</button> --}}
            <button>×</button>
        </div>
        <div class="modal-img-block"></div>
        <div class="count-block">
            <div class="image-change-count">
                <button class="inc-modal-button" direction=1>+</button>
            </div>
            <div class="count"><span id="image-modal-count">1</span> шт.</div>
            <div class="image-change-count">
                <button class="inc-modal-button" direction=-1>-</button>
            </div>
        </div>
        <button id="ok-modal-button">ok</button>
    </div>
</div>

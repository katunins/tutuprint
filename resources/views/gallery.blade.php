<?php
use App\Http\Controllers\ImageController; ?>

@extends('layouts.app')
<link rel="stylesheet" href="{{ asset('css/gallery.css') }}">

@section('content')
{{-- {{dd (Session::get('images'))}} --}}
@include('layouts.supermodal')
<div class="gallery-block">






    <div class="gallery">

        @if (Session::has('images'))

        @foreach (Session::get('images') as $item)
        @if ($item['count'] > 0)


        <div class="image-box" id={{ $item['id'] }} url={{ $item['url'] }} width={{$item['width']}}
            heigh={{$item['heigh']}} size={{$item['size']}}
            style="background-image: url( {{ asset($item['thumbnail']) }})" count={{ $item['count'] }}>
            <div class="img-count hide"></div>
            <div class="img-select hide"></div>
            <div class="img-alert hide"></div>
        </div>
        @endif
        @endforeach
        @endif

        <form class="hide" action="" method="post">
            <input type="file" id="imgLoad" multiple name="image[]">
        </form>
        <label class="imgLoadPlusButton" drop="true" for="imgLoad" id="imgLoadPlusButton"
            style="background-image: url({{ asset('images/plus.svg') }})">
        </label>
        {{-- <div id="fake-end-elem"></div> --}}


    </div>
    <div class="dropPlus drop-no-visibility">
        <img drop="true" src="images/drop.png" alt="">
    </div>

    <div class="controls">

        <form action="">
            @csrf

            <div class="params">
                <div class="info">
                    <img src="images/info.svg" alt="">
                </div>
                <div class="param-block group-change-button">
                    <button type="button" id="changeGroupButton" value="off">Режим выделения</button>

                </div>

                <div class="general-additional-params-block hide">
                    <p>Выберете фотографии для изменения</p>
                    <div class="reset-all-button">

                    </div>

                    <div class="general-count-block half-opacity">
                        <div class="image-change-count">
                            <button type="button" class="general-inc-modal-button" direction=1>+</button>
                        </div>
                        <div class="count"><span id="general-image-modal-count">1</span> шт.</div>
                        <div class="image-change-count">
                            <button type="button" class="general-inc-modal-button" direction=-1>-</button>
                        </div>
                    </div>
                    <div class="reset-all-button">
                        <button type="button" class="hide" id="clearAllImagesButton">Удалить все фотографиии</button>
                    </div>
                    <div class="buttons">

                        <button id="general-additional-button-cancel" type="button">
                            <img src={{ asset('images/back-button.svg')}} alt="Назад">Назад
                        </button>
                        <button class="half-opacity" id="general-additional-button-save" type="button"
                            style="background-color: ffcc00;">Сохранить</button>
                    </div>

                </div>

                <div class="general-params-block">
                    <div class="param-block">
                        <div class="param active" switchdata='false' name='product' value='photoprint'>фотографии</div>
                        <div class="button">
                            <input type="checkbox" class="checkbox switcher">
                            <div class="knobs"></div>
                            <div class="layer"></div>
                        </div>
                        <div class="param inactive" switchdata='true' name='product' value='photocards'>фотокарточки
                        </div>
                    </div>

                    <div class="param-block">
                        <div class="param active" switchdata='false' name='size' value='10x15' minWidth=1795
                            minHeigh=1205>10 x 15 cm</div>
                        <div class="button">
                            <input type="checkbox" class="checkbox switcher">
                            <div class="knobs"></div>
                            <div class="layer"></div>
                        </div>
                        <div class="param inactive" switchdata='true' name='size' value='15x21' minWidth=2551
                            minHeigh=1795>15 x 21 cm</div>
                    </div>

                    <div class="param-check-block">
                        <div class="param-check">
                            <input type="checkbox" id="white-border" checked>
                            <label for="white-border"><span>Белая рамка</span></label>
                        </div>
                        <div class="param-check">
                            <input type="checkbox" id="box">
                            <label for="box"><span>Коробка</span></label>
                        </div>
                    </div>

                    <div class="text-for-box param-block hide">
                        <textarea name="text-for-box" cols="30" rows="2" placeholder="Надпись на коробке"></textarea>
                    </div>
                </div>

            </div>

            <input type="hidden" name='summ'>

            <div class="to-order-block">


                <button type="submit">
                    <div class="price-block"><span id="price-to-basket"></span>₽</div>
                    <img src="{{ asset('images/basket.svg') }}" alt=""> Добавить
                </button>
                <div class="price-description-block">
                    <p id="description-1"></p>
                    <p id="description-2"></p>
                </div>
            </div>
        </form>
    </div>

</div>
<div class="hide" id="info-page">

    @include('layouts.info')
</div>
@endsection

@section('back')
{{ url('/') }}
@endsection

<script src="{{ asset('js/gallery.js') }}"></script>
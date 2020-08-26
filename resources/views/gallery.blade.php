@extends('layouts.app')

<link rel="stylesheet" href="{{ asset('css/gallery.css') }}">

@section('content')
@include('layouts.supermodal')

<div class="gallery-block">
    <div class="gallery">


        @foreach (Storage::files('public/images/mini') as $item)
        <div class="image-box" id={{ Storage::url($item) }} style="background-image: url({{ Storage::url($item) }})"
            count=1>
            <div class="img-count hide"></div>
        </div>
        @endforeach

        <a href="">
            <div class="image-box" style="background-image: url({{ asset('images/plus.svg') }}">
            </div>
        </a>
    </div>

    <div class="controls">

        <form action="">
            @csrf

            <div class="params">
                <div class="param-block">
                    <div class="param active" switchdata='false' name='product' value='photoprint'>фотографии</div>
                    <div class="button">
                        <input type="checkbox" class="checkbox switcher">
                        <div class="knobs"></div>
                        <div class="layer"></div>
                    </div>
                    <div class="param inactive" switchdata='true' name='product' value='photocards'>фотокарточки</div>
                </div>

                <div class="param-block">
                    <div class="param active" switchdata='false' name='size' value='10x15'>10 x 15 cm</div>
                    <div class="button">
                        <input type="checkbox" class="checkbox switcher">
                        <div class="knobs"></div>
                        <div class="layer"></div>
                    </div>
                    <div class="param inactive" switchdata='true' name='size' value='15x21'>15 x 21 cm</div>
                </div>

                <div class="param-check-block">
                    <div class="param-check">
                        <input type="checkbox" id="white-border" checked>
                        <label for="white-border"><span>белая рамка</span></label>
                    </div>
                    <div class="param-check">
                        <input type="checkbox" id="box">
                        <label for="box"><span>коробка</span></label>
                    </div>
                </div>

                <div class="text-for-box param-block hide">
                    <textarea name="text-for-box" cols="30" rows="2" placeholder="Надпись на коробке"></textarea>
                    {{-- <input type="text" name="text-for-box"
                            placeholder="Надпись на коробке"> --}}
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

@endsection

@section('back')
{{ url('/') }}
@endsection

<script src="{{ asset('js/gallery.js') }}"></script>
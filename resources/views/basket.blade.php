<link rel="stylesheet" href="{{ asset('css/supermodal.css') }}">

@extends('layouts.app')

@section('title', 'Корзина')
@include('layouts.supermodal')
<link rel="stylesheet" href={{ asset('css/basket.css') }}>

@section('content')
<?php 
    $user = App\Http\Controllers\ToolsController::getUser();
    if ($user) $basket = DB::table('basket')->where('userId', (string)$user['id'])->get(); else $basket=[];
?>
@if(count($basket)>0)
    <?php if(!Auth::check() && !Session::has('noAuthOk')):?>

    <?php Session::put('noAuthOk', true); //пометка о том, что клиенту предлагали авторизоваться?>
    <script>
        turnONmodalMessage(
            'Для начисления бонусных баллов необходимо войти в личный кабинет.'
        );

        setOkModalButton(function () {
            location.href = "/auth"
        }, 'Войти');

        setCancelModalButton(function () {
            turnOFFSuperModal();
            location.href = "/basket"
        }, 'Продолжить');
        turnONmodal('-78px', false);

    </script>

    <?php else: ?>
    @foreach($basket as $item)
        <?php
                    $summ = 0;
                    $param = json_decode($item->data);
                    $summ += $param->price->data; 
                    $size = str_replace(' ', '', $param->size->data); 
                    $basketFolder = 'public/basket/' .$item->userId .'/'.'N_'.$item->basketId.'/'.$size;
                    $thumbnailUrl = Storage::files($basketFolder);
                    if (count($thumbnailUrl) > 0) $thumbnailUrl = Storage::disk('local')->url($thumbnailUrl[0]) ; else $thumbnailUrl = asset ('/images/empty.png');
                ?>
        <div class="basket-block">
            <div class="preview"
                style="background-image: url({{ $thumbnailUrl }})">
            </div>
            <div class="params">
                <h3>{{ $param->product->data }}</h3>
                <ul>
                    <li>Формат: <span>{{ $param->size->data }}</span></li>
                    <li>Количество: <span>{{ $param->count->data }} шт.</span></li>
                    @if($param->whiteborder->data)
                        <li>Белая рамка по краям</li>
                    @endif
                    @if($param->box->data)
                        <li>Коробка c надписью: "{{ $param->box->text }}"</li>
                    @endif
                </ul>
            </div>
            <div class="price" price={{ $param->price->data }}>
                <span>{{ number_format($param->price->data, 0, '', ' ' ) }}₽</span>
                <div>
                    <button id="basket-remove" data-id={{ $item->id }}
                        onclick='removeBasketItem({{ $item->id }}, {{ $item->basketId }}, "{{ $param->product->data }}")'>Удалить</button>
                </div>
            </div>
        </div>
    @endforeach
    <form action="{{ action('BasketController@makeorder') }}" role="form" method="post">
        @csrf

        <input type="hidden" name="userid" value={{ $user['id'] }}>
        <input type="hidden" name="price">
        <input type="hidden" name="deliveryprice">

        <h3>Способ доставки</h3>

        <div class="delivery-block">
            <div class="form-block">
                <input type="radio" name="delivery" id="vrn_delivery" value="vrn_delivery" checked price=250>
                <label for="vrn_delivery">Курьером в Воронеже (250 руб)</label>
            </div>

            <div class="form-block">
                <input type="radio" name="delivery" id="vrn_pickup" value="vrn_pickup" price=0>
                <label for="vrn_pickup">Самостоятельно на ул. Театральная, 11</label>
            </div>

            {{-- <div class="form-block">
                    <input type="radio" name="delivery" id="cdek" value="cdek">
                    <label for="cdek">Доставка CDEK в другие регионы</label>
                    </div> --}}
        </div>

        <div class="form-center-block">
            @if(!$errors->get('name'))
                <label for="name">Фамилия Имя получателя</label>
            @endif
            @error('name')
                <label class="alert">{{ $message }}</label>
            @enderror
            <input type="text" name="name" placeholder="Антонов Сергей"
                value="{{ old('name', $user['name']) }}">

            <div class="adress-block">
                <label for="vrn_adress">Адрес в Воронеже</label>
                <input type="text" name="adress" placeholder="Московский проспект, 10 / кв"
                    value="{{ old('adress', $user['adress']) }}">
            </div>

            @if(!$errors->get('tel'))
                <label for="tel">Телефон</label>
            @endif
            @error('tel')
                <label class="alert">{{ $message }}</label>
            @enderror
            <input type="tel" name="tel" placeholder="+7 (___) ___-____" id="tel"
                value="{{ old('tel', $user['tel']) }}">
        </div>

        <div class="form-center-block">
            <button class="all-price">
                <p>Оплатить</p>
                <span id="all-price"></span><span>₽</span>
            </button>
        </div>

    </form>
    {{-- тут скрипт потому, что он нужен только при загрузки корзины --}}
    <script src="{{ asset('js/basket.js') }}"></script>

    <?php endif?>
@else
    <div class="empty">Корзина пуста</div>
    @include('layouts.bigbuttons')
@endif
@endsection

<script>
    function removeBasketItem(id, basketId, name) {
        setOkModalButton(function () {
            // Передадим данные в контроллер для изменения данных сессии
            ajax('/removeBasketTtem', {
                id: id,
                basketId: basketId
            }, function (data) {
                // console.log (data)
                window.location.reload()
            })
        }, 'Удалить');

        setCancelModalButton(function () {
            turnOFFSuperModal();
        }, 'Отменить');
        turnONmodalMessage(
            'Вы действительно хотите удалить ' + name + '?'
        );
        turnONmodal('-78px', false);
    }

</script>

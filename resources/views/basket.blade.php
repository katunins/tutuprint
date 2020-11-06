<link rel="stylesheet" href="{{ asset('css/supermodal.css') }}">
<?php 


// получим корзину - вернем сумму ее и количество позиций
    $userId='';
    if (Auth::user()) {
        $userId = Auth::user()->id;
        
        //Если сюда вернулись из авторизации, то перенесем корзину temp юзера в его аккаунт
        if (Session::has('newAuth') && Session::has('temporaryUser')) {
            $tempId =  Session::get('temporaryUser');
            DB::update('update basket set userID = ? where userID = ?', [$userId, $tempId]);
            Storage::move('public/basket/'.$tempId, 'public/basket/'.$userId);
            Session::flash('temporaryUser');
            Session::flash('newAuth');
        }
    } elseif (Session::has('temporaryUser')) {
        $userId = Session::get('temporaryUser');
    } 

    if ($userId !='') $basket = DB::table('basket')->where('userId', $userId)->get(); else $basket = [];
    $summ = 0;
?>

@extends('layouts.app')

@section('title', 'Корзина')
@include('layouts.supermodal')
<link rel="stylesheet" href={{ asset('css/basket.css') }}>

@section('content')

@if(count($basket)>0)
    @if(!Auth::user() && !Session::has('noAuthOk') && $basket)
        <div class="super-modal">
            <div class="modal-block">
                <div id="file-data-text">
                    Для начисления бонусных баллов необходимо авторизоваться.<br>Продолжить без авторизации?

                </div>
                <div class="super-model-buttons">
                    <button id="ok-modal-button" onclick="location.href = '/basket/noAuth'">Продолжить</button>
                    <button id="cancel-modal-button"
                        onclick="location.href = '/basket/needAuth'">Авторизоваться</button>
                </div>

            </div>
        </div>
    @else
        @foreach($basket as $item)
            <?php 
                $param = json_decode($item->data);
                $summ += $param->price->data; 
                $size = str_replace(' ', '', $param->size->data); 
                $basketFolder = 'public/basket/' .$item->userId .'/'.'N_'.$item->basketId.'/'.$size;
                $thumbnailUrl = Storage::files($basketFolder);
                if (count($thumbnailUrl) > 0) $thumbnailUrl = $thumbnailUrl[0]; else $thumbnailUrl = asset ('images/empty.jpg')
                ?>
            <div class="basket-block">

                <div class="preview"
                    style="background-image: url({{ Storage::disk('local')->url($thumbnailUrl) }})">
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
        <form action="{{ route('payorder') }}" role="form" method="post">
            @csrf

            <input type="hidden" name="userid" value={{ $userId }}>
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
                    value="{{ old('name', Auth::user() ? Auth::user()->name : '') }}">


                <div class="adress-block">
                    <label for="vrn_adress">Адрес в Воронеже</label>
                    <input type="text" name="adress" placeholder="Московский проспект, 10 / кв"
                        value="{{ old('adress', Auth::user() ? Auth::user()->adress : '') }}">
                </div>

                @if(!$errors->get('tel'))
                    <label for="tel">Телефон</label>
                @endif
                @error('tel')
                    <label class="alert">{{ $message }}</label>
                @enderror
                <input type="tel" name="tel" placeholder="+7 (___) ___-____" id="tel"
                    value="{{ old('tel', Auth::user() ? Auth::user()->tel : '') }}">

            </div>

            <div class="form-center-block">
                <button class="all-price">
                    <p>Оплатить</p>
                    <span id="all-price"></span><span>₽</span>
                </button>
            </div>

            {{-- <div class="form-block">
                <div class="message">
                </div>
                <div class="time">

                </div>
            </div> --}}


        </form>

        {{-- тут скрипт потому, что он нужен только при загрузки корзины --}}
        <script src="{{ asset('js/basket.js') }}"></script>
    @endif

@else
    <div class="empty">
        Корзина пуста
    </div>
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

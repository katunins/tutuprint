@extends('layouts.app')
<link rel="stylesheet" href={{ asset('css/personal.css') }}>
@section('title')
Кабинет пользователя    
@endsection
@section('content')

<div class="personal">

    <?php $user = App\Http\Controllers\ToolsController::getUser(); ?>

    @if($user)
        <?php $userId = $user['id']; ?>
        <div class="contact">
            <div class="personal-block">
                <div class="personal-info">
                    @if ($user['name'])
                        <h3>{{ $user['name'] }}</h3>
                    @endif
                    @if($user['email'])
                        <p>{{ $user['email'] }}</p>
                    @endif
                    @if($user['tel'])
                        <p>{{ $user['tel'] }}
                    @endif
                </div>
                
                    @if(Auth::check())
                        <div class="links">
                            <a href="">Изменить - тест</a>
                            <a class="logout" href="/logout">Выйти из аккаунта</a>
                        </div>
                    @else
                        <a href="{{ asset('auth') }}">Авторизация</a>
                    @endif

                
            </div>
            <div>
                <svg viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.5634 10L10.5666 10.0801L10.5666 10.08L11.5634 10ZM29.4377 10L30.4346 10.0785L30.4346 10.0786L29.4377 10ZM39.9632 37.9938L38.9818 38.1856L38.9818 38.1855L39.9632 37.9938ZM1.03681 37.9938L0.0553721 37.8019L0.0553842 37.8019L1.03681 37.9938ZM12.5601 9.91994C12.9227 14.4336 16.6267 18 20.5005 18V20C15.4372 20 11.0003 15.4796 10.5666 10.0801L12.5601 9.91994ZM20.5005 18C24.3755 18 28.0849 14.4334 28.4408 9.92137L30.4346 10.0786C30.0084 15.4816 25.5626 20 20.5005 20V18ZM28.4408 9.92146C28.7949 5.42618 25.3828 2 20.5005 2V0C26.3835 0 30.8929 4.26132 30.4346 10.0785L28.4408 9.92146ZM20.5005 2C15.6247 2 12.2066 5.51356 12.5602 9.92001L10.5666 10.08C10.1077 4.36144 14.6111 0 20.5005 0V2ZM20.5005 24C29.5583 24 39.1519 28.6261 40.9446 37.802L38.9818 38.1855C37.4556 30.3739 29.1139 26 20.5005 26V24ZM40.9446 37.8019C41.0933 38.5627 40.9427 39.3558 40.4826 39.9764C40.0101 40.6136 39.2602 41 38.3748 41V39C38.6502 39 38.7945 38.8951 38.8761 38.7852C38.97 38.6585 39.0332 38.4486 38.9818 38.1856L40.9446 37.8019ZM38.3748 41H2.6262V39H38.3748V41ZM2.6262 41C1.74058 41 0.99038 40.6139 0.517635 39.9766C0.0572652 39.3559 -0.0932962 38.5627 0.0553721 37.8019L2.01824 38.1856C1.96684 38.4486 2.03006 38.6584 2.12394 38.785C2.20545 38.8949 2.34998 39 2.6262 39V41ZM0.0553842 37.8019C1.8492 28.6261 11.4427 24 20.5005 24V26C11.8871 26 3.54538 30.3739 2.01823 38.1856L0.0553842 37.8019Z"
                        fill="#FFCC00" />
                </svg>
            </div>
        </div>
        <?php $orders = DB::table('orders')->where('userId', (string)$userId)->get() ?>
        @foreach($orders as $item)
            <div class="order">
                <div class="num">
                    <div class="id">#{{ $item->id }}</div>
                    <div class="date">
                        {{ \Carbon\Carbon::parse($item->created_at)->format('d/m/Y') }}
                    </div>
                </div>
                <div class="goods">
                    @foreach(json_decode($item->properties) as $prop)

                        <li class="head">{{ $prop->product->data }}, {{ $prop->size->data }}</li>
                        <li>Количество: {{ $prop->count->data }} шт.</li>
                        @if($prop->whiteborder->data)
                            <li>С белой рамкой по краям</li>
                        @endif
                        @if($prop->box->data)

                            <li>Коробка с надписью: "{{ $prop->box  ->text }}"</li>
                        @endif
                        <li>Стоимость: {{ $prop->price->data }}₽</li>

                    @endforeach

                    <div class="status {{ $item->status }}"></div>
                </div>
                <div class="cost">
                    <div>{{ $item->allPrice }}<span>₽</span></div>
                    <div>
                        @if(!$item->payStatus)
                            <a href="payorder/{{ $item->id }}">Оплатить</a>
                        @endif
                    </div>
                </div>
            </div>
        @endforeach
    @else
        <div class="contact">
            <a href="{{ asset('auth') }}">Авторизация</a>
        </div>
    @endif






    {{-- "id": 1
        +"userId": "1"
        +"allPrice": "260.00"
        +"deliveryPrice": "250.00"
        +"deliveryType": "vrn_delivery"
        +"name": "Павел"
        +"adress": "jtjtjt"
        +"tel": "+5 (475) 555-5555"
        +"status": "wait"
        +"payId": null
        +"properties": "[{"box": {"data": false, "name": "Коробка", "text": null}, "size": {"data": "10 x 15 cm", "name":
        "Формат"}, "count": {"data": 1, "name": "Количество"}, "price": {"data": "10", "name": "Стоимость"}, "product":
        {"data": "фотографии", "name": "Продукт"}, "whiteborder": {"data": true, "name": "Белая рамка по краям"}}]
    ◀"
    +"created_at": "2020-11-05 17:33:07" --}}


</div>
@endsection

{{-- @section('back') @endsection --}}

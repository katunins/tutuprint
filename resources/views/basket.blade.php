<?php 
// получим корзину - вернем сумму ее и количество позиций
$userId='';
if (Auth::user()) {
    $userId = Auth::user()->id;
        

    } elseif (Session::has('temporaryUser')) {
            $userId = Session::get('temporaryUser');

    } 
    if ($userId !='') $basket = DB::table('basket')->where('userId', $userId)->get(); else $basket = false;
    $summ = 0;
?>

@extends('layouts.app')

@section('title', 'Корзина')
<link rel="stylesheet" href={{ asset('css/basket.css') }}>

@section('content')

@if ($basket)
@foreach ($basket as $item)
<?php 
        $param = json_decode($item->data);
        $summ += $param->price->data; 
        $size = str_replace(' ', '', $param->size->data); 
        $basketFolder = 'public/basket/' .$item->userId .'/'.'N_'.$item->basketId.'/'.$size;
        $thumbnailUrl = Storage::files($basketFolder);
        if (count($thumbnailUrl) > 0) $thumbnailUrl = $thumbnailUrl[0]; else $thumbnailUrl = asset ('images/empty.jpg')
        // dd ($basketFolder);
        // dd ($preview);
        ?>
<div class="basket-block">

    <div class="preview" style="background-image: url({{ Storage::disk('local')->url($thumbnailUrl) }})">
    </div>
    <div class="params">
        <h3>{{ $param->product->data }}</h3>
        <ul>
            <li>Формат: <span>{{ $param->size->data }}</span></li>
            <li>Количество: <span>{{ $param->count->data }} шт.</span></li>

            @if ($param->whiteborder->data)
            <li>Белая рамка по краям</li>
            @endif

            @if ($param->box->data)
            <li>Коробка c надписью: "{{ $param->box->text }}"</li>
            @endif
        </ul>
    </div>
    <div class="price">
        <span>{{ number_format($param->price->data, 0, '', ' ' ) }}₽</span>
        <div>
            <button>Удалить</button>
        </div>
    </div>
</div>
@endforeach
@else
<div class="empty">
    Корзина пуста
</div>
@endif

<form action="">
    @csrf
    <h3>Способ доставки</h3>

    <div class="form-block">

        <input type="radio" name="delivery" id="vrn__delivery" value="vrn__delivery">
        <label for="vrn__delivery">Курьером в Воронеже (250 руб)</label>
    </div>
    <div class="form-block">
        <input type="radio" name="delivery" id="vrn__pickup" value="vrn__pickup">
        <label for="vrn__pickup">Самостоятельно на Театральная, 11</label>
    </div>
    <div class="form-block">
        <input type="radio" name="delivery" id="cdek" value="cdek">
        <label for="cdek">Доставка CDEK в другие регионы</label>
    </div>

    <div class="form-block">
        <div class="cdek"></div>

        <input type="text" name="vrn_adress" id="vrn_adress">
        <label for="vrn_adress">Адрес в Воронеже</label>
    </div>

    <div class="form-block">
        <div class="message">

        </div>
        <div class="time">

        </div>
    </div>


</form>

@endsection

@section('back')
{{ url('/') }}
@endsection

<script src="{{ asset('js/basket.js') }}"></script>
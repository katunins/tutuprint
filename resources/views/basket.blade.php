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


@endsection

@section('back')
{{ url('/') }}
@endsection

<script src="{{ asset('js/basket.js') }}"></script>
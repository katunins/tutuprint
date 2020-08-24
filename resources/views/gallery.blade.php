@php
use Illuminate\Support\Facades\Config;
$productArr = config('tutuproducts.data');
$productArr = $productArr;
@endphp

@extends('layouts.app')

<link rel="stylesheet" href="{{ asset('css/gallery.css') }}">

@section('content')

<div class="gallery-block">
    <div class="gallery">
        <a href="">
            <div class="image-box" style="background-image: url({{ asset('images/plus.svg') }}">
            </div>
        </a>

        @foreach (Storage::files('public/images/mini') as $item)
        <div class="image-box" style="background-image: url({{ Storage::url($item) }})">

        </div>
        @endforeach
    </div>
    <div class="controls">
        <form action="">
            <div class="params">

                <div class="param-block">
                    @foreach ($productArr as $product)
                    <input type="radio" id={{ $product['code'] }} value={{ $product['name'] }} name="product"
                        <?=isset ($product['checked']) ? 'checked':''?>>
                    <label for={{ $product['code'] }}>{{ $product['name'] }}</label>
                    @endforeach
                </div>


                @foreach ($productArr as $product)
                @foreach ($product['params'] as $param)
                <div class="param-block" parent={{ $product['code'] }}>
                    @foreach ($param['secondparams'] as $secondparam)

                    <input type={{ $secondparam['type'] }} id={{ $secondparam['code'] }}
                        value="{{ $secondparam['name'] }}" name={{ $param['code'] }} @isset($secondparam['checked'])
                        checked @endisset>

                    <label for={{ $secondparam['code']}}>{{ $secondparam['name']}}</label>
                    @endforeach
                </div>
                @endforeach
                @endforeach




                {{-- @foreach ($productArr as $product)
                <div class="param-block">
                    @foreach ($product->params->sizes->data as $item)
                    <input type={{ $product->params->sizes->type}} id={{ 'sizes'.$item->id}} value={{ $item->type}}
                name="size" {{ $product->id == 1 ?: 'checked'}}>>
                <label for="10x15">10 x 15 cm</label>

                @endforeach
            </div>
            @endforeach




            <div class="param-block">
                <input type="checkbox" id="whiteborder" value="whiteborder" name="whiteborder" checked>
                <label for="whiteborder">Белая рамка по краям</label>
            </div>

            <div class="param-block">
                <input type="checkbox" id="whithbox" value="whithbox" name="whithbox">
                <label for="whithbox">В коробке</label>
            </div> --}}
    </div>
    <div class="button-order"></div>
    </form>
</div>

</div>

@endsection

@section('back')
{{ url('/') }}
@endsection
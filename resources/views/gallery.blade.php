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

            @foreach (Storage::files('public/images/mini') as $item)
                <div class="image-box" style="background-image: url({{ Storage::url($item) }})">

                </div>
            @endforeach

            <a href="">
                <div class="image-box" style="background-image: url({{ asset('images/plus.svg') }}">
                </div>
            </a>
        </div>

        <div class="controls">
            <form action="">
                <div class="params">

                    <div class="param-block main">
                        @foreach ($productArr as $product)
                            <input type="radio" id={{ $product['code'] }} value={{ $product['name'] }} name="product" <?= isset($product['checked']) ? 'checked' : '' ?>>
                        <label for={{ $product['code'] }}>{{ $product['name'] }}</label>
                        @endforeach
                    </div>


                    @foreach ($productArr as $product)
                    @foreach ($product['params'] as $param)
                    <div class="param-block" parent={{ $product['code'] }}>
                        @foreach ($param['secondparams'] as $secondparam)
                        <div>
                            <input type={{ $secondparam['type'] }} id={{ $secondparam['code'] }}
                            value="{{ $secondparam['name'] }}" name={{ $param['code'] }} @isset($secondparam['checked'])
                            checked @endisset>

                            <label for={{ $secondparam['code'] }}>{{ $secondparam['name'] }}</label>
                        </div>
                        @endforeach
                    </div>
                    @endforeach
                    @endforeach

        </div>
            <button>
                <div class="button-order">
                </div>
            </button>
        </form>
    </div>

    </div>

@endsection

@section('back')
    {{ url('/') }}
@endsection

<script src={{ asset('js/gallery.js') }}></script>

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
    </div>

</div>

@endsection

@section('back')
{{ url('/') }}
@endsection
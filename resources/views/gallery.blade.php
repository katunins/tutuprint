@extends('layouts.app')
<link rel="stylesheet" href="{{ asset('css/gallery.css') }}">

@section('content')
<div class="gallery">
    @foreach (Storage::files('public/images/mini') as $item)
    <div class="image-box" style="background-image: url({{ Storage::url($item) }})">

    </div>
    @endforeach
</div>
<div class="controls">
</div>
@endsection

{{-- <script src="{{ asset('js/gallery.js') }}"></script> --}}
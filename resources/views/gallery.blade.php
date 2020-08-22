@extends('layouts.app')
<link rel="stylesheet" href="{{ asset('css/gallery.css') }}">

@section('content')
<div class="gallery">
    @for ($i = 0; $i < 20; $i++) <div class="image-square">

</div>
@endfor
</div>
<div class="controls">
</div>
@endsection
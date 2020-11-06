<?php //phpinfo(); die();?>
<link rel="stylesheet" href="{{ asset ('css/welcome.css') }}">

@extends('layouts.app')

@section('content')


<div class="promo-video-block">
    <video autoplay playsinline muted loop src="{{ asset ('video/promo.mp4') }}"></video>
</div>

@include('layouts.bigbuttons')
@endsection

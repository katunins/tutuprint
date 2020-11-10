<?php //phpinfo(); die();?>
<link rel="stylesheet" href="{{ asset ('css/welcome.css') }}">
@section('title')
Онлайн печать фотографий с доставкой tutuprint.ru
@endsection
@extends('layouts.app')

@section('content')


<div class="promo-video-block">
    <video  preload="yes" type='video/mov' autoplay playsinline muted loop preload="yes" autoplay loop width="100%" height="auto" playsinline>
        <source src="video/promo.mp4" type="video/mp4">
        <source src="video/promo.mov" type="video/mov">
        <source src="video/promo.webm" type="video/webm">
        <source src="video/promo.orv" type="video/ogv">
    </video>
</div>



@include('layouts.bigbuttons')
@endsection

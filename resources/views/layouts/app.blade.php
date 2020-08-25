<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

</head>

<body>
    <div class="container">
        <div class="header" style="background-image: url({{ asset ('logo.svg') }})">


            <a class="top-back" href=@yield('back')>
                <img src="{{ asset('back-button.svg') }}" alt="Назад">
            </a>

            <div class="basket">
                <img src="{{ asset('images/basket.svg') }}" alt="">
            </div>
        </div>

        @include('layouts.modal')

        @yield('content')

        @if(View::hasSection('back'))
        <a class="back" href=@yield('back')>
            <img src="{{ asset('back-button.svg') }}" alt="Назад">
        </a>
        @endif

    </div>
</body>

</html>
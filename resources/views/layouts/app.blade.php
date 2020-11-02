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

        <div class="header">
            <div class="top-back-button" <?php if (URL::current() == url ('/') || View::hasSection('back')) {?>
                style="visibility: hidden" <?php } ?>>
                <?php $urlBack = (URL::previous() == URL::current()) ? '/' : URL::previous(); ?>
                <a href={{ $urlBack }}>
                    <img src="{{ asset('back-button.svg') }}" alt="Назад">
                </a>
            </div>

            <div class="logo">
                <a href="{{ url ('/') }}">
                    <img src="{{ asset ('logo.svg') }}" alt="tutuprint.ru">
                </a>
            </div>

            <div class="personal-block">

                @if(Auth::user())
                    <div class="user">
                        <a href="{{ url ('auth') }}">
                            <img src="{{ asset('images/user.svg') }}" alt="">
                        </a>
                    </div>
                @elseif(Session::has('temporaryUser'))
                    <div class="user temp-user">
                        <a href="{{ url ('personal') }}">
                            <img src="{{ asset('images/user.svg') }}" alt="">
                        </a>
                    </div>
                @else
                    <div class="user half-opacity">
                        <a href="">
                            <img src="{{ asset('images/user.svg') }}" alt="">
                        </a>
                    </div>
                @endif

                <div class="basket half-opacity">
                    <a href="{{ url ('basket') }}">
                        <img src="{{ asset('images/basket.svg') }}" alt="">
                    </a>
                    <span id="basket-icon-summ"></span>
                </div>

                {{-- <div class="basket">
                    <a href="{{ url ('basket') }}">
                <img src="{{ asset('images/basket.svg') }}" alt="">

                <span id="basket-icon-summ"></span>
                </a>
            </div> --}}
        </div>

    </div>

    @include('layouts.modal')

    @yield('content')

    @if(View::hasSection('back'))
        <a class="back" href={{ $urlBack }}>
            <img src="{{ asset('back-button.svg') }}" alt="Назад">
        </a>
    @endif

    </div>
</body>

{{-- @if(Auth::user())
    {{ dd (Auth::id()) }}
@endif--}}

</html>
<script type="text/javascript" src="{{ asset('/js/app.js') }}"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        updateBasketIconCount()
    });

</script>
{{-- {{ print_r(Session::all()) }}
{{ var_dump(Auth::check()) }} --}}

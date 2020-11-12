<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '4707336305974096');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=4707336305974096&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Facebook Pixel Code -->
  
  

</head>

<body>
    @include('layouts.supermodal')
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
            @if(Auth::check())
                <div class="user">
                    <a href="{{ url ('auth') }}">
                        <img src="{{ asset('images/user.svg') }}" alt="">
                    </a>
                </div>
            @else
                <div class="user temp-user">
                    <a href="{{ url ('personal') }}">
                        <img src="{{ asset('images/user.svg') }}" alt="">
                    </a>
                </div>
            @endif

            <div class="basket half-opacity">
                <a href="{{ url ('basket') }}">
                    <img src="{{ asset('images/basket.svg') }}" alt="">
                </a><br>
                <div id="basket-icon-summ"></div>
            </div>
        </div>

    </div>
    
    <div class="container">
        @include('layouts.modal')
        {{-- @dump ((Session::all()), 'Auth -'.Auth::check()) --}}
        @yield('content')

        @if(View::hasSection('back'))
            <a class="back" href={{ $urlBack }}>
                <img src="{{ asset('back-button.svg') }}" alt="Назад">
            </a>
        @endif

    </div>
</body>


</html>
<script type="text/javascript" src="{{ asset('/js/app.js') }}"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        updateBasketIconCount()
    });

</script>
{{-- {{ print_r(Session::all()) }}
{{ var_dump(Auth::check()) }} --}}

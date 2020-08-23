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
                <svg viewBox="0 0 39 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.81453 13C2.33624 12.9995 1.87714 13.187 1.53728 13.5215C1.19741 13.8561 1.00433 14.3106 1.00011 14.7861C0.998169 14.9509 1.02218 15.115 1.07126 15.2724L5.66957 31.3916C5.88269 32.1445 6.33816 32.8073 6.96625 33.2784C7.59433 33.7494 8.36041 34.0029 9.1472 34H29.8529C30.6412 34.0007 31.4084 33.7466 32.0389 33.2762C32.6693 32.8057 33.1289 32.1443 33.3483 31.3916L37.9466 15.2724L38 14.7861C37.9958 14.3106 37.8027 13.8561 37.4628 13.5215C37.123 13.187 36.6639 12.9995 36.1856 13H2.81453ZM20.0088 27.1535C19.2696 27.1499 18.548 26.9286 17.9351 26.5176C17.3222 26.1067 16.8455 25.5244 16.5652 24.8444C16.2848 24.1644 16.2134 23.417 16.3599 22.6966C16.5064 21.9763 16.8642 21.3152 17.3882 20.7968C17.9123 20.2785 18.579 19.926 19.3043 19.784C20.0297 19.6419 20.781 19.7167 21.4637 19.9988C22.1463 20.2809 22.7296 20.7576 23.1399 21.369C23.5503 21.9803 23.7693 22.6987 23.7693 23.4337C23.7646 24.422 23.3663 25.3683 22.6615 26.0654C21.9568 26.7625 21.003 27.1538 20.0088 27.1535V27.1535Z"
                        stroke="#CCCCCC" stroke-width="2" stroke-linejoin="round" />
                    <path d="M11 13L19.5 1L28 13" stroke="#CCCCCC" stroke-width="2" stroke-linejoin="round" />
                </svg>
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
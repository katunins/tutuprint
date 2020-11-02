@extends('layouts.app')

<link rel="stylesheet" href={{ asset('css/login.css') }}>
@section('content')

<div class="auth-form">
    <form action="{{ route('login') }}" role="form" method="post">
        @csrf

        <div class="form-group">
            <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email"
                value="{{ old('email') }}" required autocomplete="email" placeholder="E-mail">
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="form-group">
            <input id="password" type="password" class="@error('password') is-invalid @enderror" name="password"
                required autocomplete="current-password" placeholder="Введите пароль">

            @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="checkbox">
            <input type="checkbox" name="remember" id="remember"
                {{ old('remember') ? 'checked' : '' }}>
            <label for="remebmer">Запомнить меня</label>
        </div>

        <button class="button" type="submit">Войти</button>
        @if(Route::has('register'))
            <a class="register" href="{{ route('register') }}">Зарегистрироваться</a>
        @endif
    </form>

    <div style="text-align: center">
        {{-- <button onclick="location.href = '{{Route('registration') }}'"
        class="button">Зарегистрироваться</button>
        --}}
    </div>



    @if(Route::has('password.request'))
        <div class="restore-pass">
            <a href="{{ route('password.request') }}">Восстановить пароль</a>
        </div>
    @endif

</div>
@endsection

@section('back') @endsection

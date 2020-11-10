@extends('layouts.app')

@section('title')
Регистрация
@endsection
<link rel="stylesheet" href={{ asset('css/login.css') }}>
@section('content')

<div class="auth-form">
    <form action="{{ route('register') }}" role="form" method="post">
        @csrf

        {{-- <input type="hidden" name="basketAuth" value={{ Session::has('basketAuth') }}>
        --}}

        <div class="form-group">
            <input id="name" type="text" class="@error('name') is-invalid @enderror" name="name"
                value="{{ old('name') }}" required autocomplete="name" placeholder="Имя">

            @error('name')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

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
                required autocomplete="new-password" placeholder="Введите пароль">

            @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="form-group">
            <input id="password-confirm" type="password" name="password_confirmation" required
                autocomplete="new-password" placeholder="Подтвердите пароль">
        </div>
        <div class="agree">
            Нажимая кнопку <b>зарегистрироваться</b> я даю <a href="{{ Route('agree') }}">согласие</a>
            на обработку
            персональных
            данных
        </div>
        <button class="button yellow-background" type="submit">Зарегистрироваться</button>
    </form>
    <div class="restore-pass">
        <a href="{{ url('auth') }}">Вход в личный кабинет</a>
    </div>

</div>
@endsection

{{-- @section('back') @endsection --}}

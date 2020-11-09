@extends('layouts.app')

@section('title', 'Изменение пароля')
<link rel="stylesheet" href={{ asset('css/login.css') }}>

@section('content')

<div class="auth-form">
    <form action="{{ route('password.update') }}" role="form" method="post">
        @csrf
        <input type="hidden" name="token" value="{{ $token }}">

        <div class="form-group">
            <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email"
                value="{{ $email ?? old('email') }}" required autocomplete="email" placeholder="Email">

            @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div class="form-group">
            <div class="col-md-6">
                <input id="password" type="password" class="@error('password') is-invalid @enderror" name="password"
                    required autocomplete="new-password" placeholder="Введите новый пароль">

                @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
        </div>

        <div class="form-group">
            <input id="password-confirm" type="password" name="password_confirmation" required
                autocomplete="new-password" placeholder="Подтвердите пароль">
        </div>

        <button class="button" type="submit">Обновить пароль</button>
    </form>

</div>

@endsection

{{-- @section('back')
"/auth"
@endsection --}}
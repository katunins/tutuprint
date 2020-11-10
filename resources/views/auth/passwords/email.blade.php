@extends('layouts.app')

@section('title', 'Изменение пароля')
<link rel="stylesheet" href={{ asset('css/login.css') }}>

@section('content')


<div class="auth-form">
    <form method="POST" action="{{ route('password.email') }}">
        @csrf


        @if (session('status'))
        <p style="color: red" role="alert">
            {{ session('status') }}
        </p>
        @else
        <p>Укажите email от аккаунта, в котором необходимо изменить пароль</p>
        @endif


        <div class="form-group">
            <input id="email" type="email" class="@error('email') is-invalid @enderror" name="email"
                value="{{ $email ?? old('email') }}" required autocomplete="email" placeholder="Email">

            @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <button class="button yellow-background" type="submit">Отправить</button>

    </form>
    <div>

        @endsection

        {{-- @section('back')
        "/auth"
        @endsection --}}
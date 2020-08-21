@if (Route::has('login'))
@auth
@include('personal')
@else
@include('auth.login')
@endauth
@endif
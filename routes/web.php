<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Session;


Route::get('/', function () {
    return view('welcome');
})->name('welcome');
 
Route::get('/auth', function () {
    return view('auth');
});

Route::get('/agree', function () {
    return view('auth.agree');
})->name ('agree');

Route::get('/logout', function (){
    Auth::logout();
    return View('auth');
})->name('LogOut');

Auth::routes();

Route::get('/gallery', function (){
    return View ('gallery');
});

Route::get('/home', 'HomeController@index')->name('home');

Route::post('updatecount', 'ImageController@updateSessionImageCount');
Route::post('eraseall', 'ImageController@eraseAllImages');
Route::post('imageupload', 'ImageController@imageUpload');
Route::get('removeolduploads', 'ImageController@removeOldUploads');

Route::get ('progress', 'ImageController@getProgressUpload');
Route::post ('setlowqualityargee', 'ImageController@setLowQualityArgee');
Route::post('addtobasket', 'ImageController@addToBasket');

Route::post('getBasketCount', 'ImageController@getBasketCount');
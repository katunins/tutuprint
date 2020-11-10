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

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

Route::get('/auth', function () {
    return view('auth');
});

Route::get('/agree', function () {
    return view('auth.agree');
})->name('agree');

Route::get('/logout', 'ToolsController@logout');

Auth::routes();

Route::get('/gallery', function () {
    return View('gallery');
});

Route::get('basket', function () {
    return View('basket');
});

Route::get('about', function () {
    return View('about');
});

Route::get('/home', 'HomeController@index')->name('home');

Route::post('updatecount', 'ImageController@updateSessionImageCount');
Route::post('eraseall', 'ImageController@eraseAllImages');
Route::post('imageupload', 'ImageController@imageUpload');
Route::post('removeBasketTtem', 'BasketController@removeBasketTtem');

Route::get('afterAuth', 'ToolsController@afterAuth');

Route::get('removeolduploads', 'ImageController@removeOldUploads');

Route::get('progress', 'ImageController@getProgressUpload');
Route::post('setlowqualityargee', 'ImageController@setLowQualityArgee');
Route::post('addtobasket', 'BasketController@addToBasket');

Route::post('getBasketCount', 'BasketController@getBasketCount');

Route::get('payorder/{id}', 'BasketController@payorder');

Route::post('makeorder', 'BasketController@makeorder');

Route::get('payok/{id}', function ($id) {
    $request = App\Http\Controllers\ToolsController::getPayStatus ($id);
    if ($request['result'])
    return redirect('personal')->with('modal-info', 'Заказ №' . $id . ' оплачен! В ближайшее время с вами свяжется менеджер!');
    else
    return redirect('personal')->with('modal-info', 'В процессе оплаты заказа №' . $id . ' возникла ошибка. '.$request['errorMessage'].'.Попробуйте еще раз');
});//->name('payok');

Route::get('payerror/{id}', function ($id) {
    return redirect('personal')->with('modal-info', 'В процессе оплаты заказа №' . $id . ' возникла ошибка.');
});//->name('payerror');

Route::get('personal', function () {
    if (Session::has('temporaryUser') || Auth::check()) return View('personal');
    else return redirect('auth');
});

// Route::get('session/{$id}', function ($id) {
//     Session::put('temporaryUser', $id);
//     return redirect('auth');
// });
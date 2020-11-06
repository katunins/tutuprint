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

Route::get('/logout', function () {
    Auth::logout();
    return redirect()->to('auth');
})->name('LogOut');

Auth::routes();

Route::get('/gallery', function () {
    return View('gallery');
});

Route::get('basket/{auth?}', function ($auth = null) {
    if ($auth) {
        if ($auth == 'noAuth') {
            Session::put('noAuthOk', true);
        }
        if ($auth == 'needAuth') {
            if (Session::has('noAuthOk')) Session::forget('noAuthOk');
            Session::put('basketAuth', true);
            return View('auth');
        }
    }
    return View('basket');
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
Route::post('addtobasket', 'ImageController@addToBasket');

Route::post('getBasketCount', 'ImageController@getBasketCount');

Route::post('payorder', 'BasketController@payorder')->name('payorder');


Route::get('payok/{id}', function ($id) {
    if (App\Http\Controllers\BasketController::getPayStatus ($id))
    return redirect('personal')->with('modal-info', 'Заказ №' . $id . ' оплачен! В ближайшее время с вами свяжется менеджер!');
    else
    return redirect('personal')->with('modal-info', 'В процессе оплаты заказа №' . $id . ' возникла ошибка. Попробуйте еще раз');
});//->name('payok');

Route::get('payerror/{id}', function ($id) {
    Session::forget('payCount');
    return redirect('personal')->with('modal-info', 'В процессе оплаты заказа №' . $id . ' возникла ошибка. Попробуйте еще раз');
});//->name('payerror');

Route::get('personal', function () {
    if (Session::has('temporaryUser') || Auth::check()) return View('personal');
    else return redirect('auth');
});//->name('personal');

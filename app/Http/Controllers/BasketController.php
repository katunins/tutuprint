<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;

class BasketController extends Controller
{
    //
    public function payorder (Request $request) {
        

        $validatedData = $request->validate([
            'name' => 'required',
            'tel' => 'required|min:16',
        ], [
            'name.required' => 'Введите Имя получателя заказа',
            'tel.required' => 'Заполните контактный номер телефона',
            'tel.min' => 'Введен не верный номер телефона'

        ]);

        if (!Auth::user()) {
            return redirect()->route('orderauth');//->with('modal-info', 'Добро пожаловать, '.Auth::user()->name.'!');
        }
        
    }
}

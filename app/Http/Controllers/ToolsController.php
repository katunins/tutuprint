<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ToolsController extends Controller
{
    public function afterAuth()
    // функция запускается после авторизации
    {
        session()->forget("noAuthOk");

        if (session()->has('temporaryUser')) {
            // перенесем данные временного пользователя: коризну / заказы
            DB::table('orders')->where('userId', session()->get('temporaryUser.id'))->update(['userId' => Auth::user()->id]);
            DB::table('basket')->where('userId', session()->get('temporaryUser.id'))->update(['userId' => Auth::user()->id]);

            session()->forget('temporaryUser');
        }

        return redirect()->route('welcome')->with('modal-info', session()->get('modal-info'));

        // if (session()->has('basketAuth')) {
        //     session()->forget('basketAuth');
        //     return redirect('basket')->with('modal-info', session()->get('modal-info'))->with('newAuth', true);
        // } else {
        //     return redirect()->route('welcome')->with('modal-info', session()->get('modal-info'));
        // }
    }

    static function getPayStatus ($orderId, $fullResult = false) {
        // проверка статуса оплаты заказа

        $order = DB::table('orders')->where('id', $orderId)->first();
        if (!$order) return false;
        if (!$order->payId) return false;

        $vars = array();
        $vars['userName'] = 'T366401444667-api';
        $vars['password'] = 'T366401444667';
        $vars['orderId'] = $order->payId;
        
        $ch = curl_init('https://3dsec.sberbank.ru/payment/rest/getOrderStatusExtended.do?' . http_build_query($vars));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);
        $res = curl_exec($ch);
        curl_close($ch);
        
        $res = json_decode($res, JSON_OBJECT_AS_ARRAY);
        // return $res;
        if ($res['orderStatus'] == 1 || $res['orderStatus'] == 2) {
            DB::table('orders')->where('id', $orderId)->update(['payStatus'=>true]);
            return true;
        } else return false;

    }

    static function getUser () {
        if (Auth::check()) {
            return [
                'id'=>Auth::user()->id,
                'name'=>Auth::user()->name,
                'email'=>Auth::user()->email,
                'adress'=>Auth::user()->adress,
                'tel'=>Auth::user()->tel,
            ];
        } elseif (session()->has('temporaryUser')) {
            return [
                'id'=>session()->get('temporaryUser.id'),
                'email'=>session()->get('temporaryUser.email'),
                'name'=>session()->get('temporaryUser.name'),
                'adress'=>session()->get('temporaryUser.adress'),
                'tel'=>session()->get('temporaryUser.tel'),
            ];       
        } else return false;
    }
}

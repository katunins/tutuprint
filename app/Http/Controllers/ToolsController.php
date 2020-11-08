<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ToolsController extends Controller
{
    public function afterAuth()
    // функция запускается после авторизации
    {
        session()->forget("noAuthOk");

        if (session()->has('temporaryUser')) {

            $temporaryUser = (string)session()->get('temporaryUser.id');
            $authUser = Auth::user()->id;
            // перенесем заказы временного пользователя
            DB::table('orders')->where('userId', $temporaryUser)->update(['userId' => $authUser]);
            
            $authBasketFolder = 'public/basket/'.$authUser;
            $authUserBasket = DB::table('basket')->where('userId', $authUser)->get();
            $temporaryBasketFolder = 'public/basket/'.$temporaryUser;
            $temporaryUserBasket = DB::table('basket')->where('userId', $temporaryUser)->get();

            // Если у временного пользователя была корзина, то перенесем ее
            if (count ($temporaryUserBasket)>0) {
                // Если у авторизованого пользователя уже есть товары в корзине, то перенесем с переименованием basketId
                if(count($authUserBasket)>0) {
                    
                    // получим последний порядковый номер корзины авторизованого пользователя
                    $lastAuthBasketId = DB::table('basket')->where(['userId'=> $authUser])->orderBy('basketId', 'asc')->get()->last()->basketId;
                    
                    foreach ($temporaryUserBasket as $item) {
                        $lastAuthBasketId ++;
                        Storage::move($temporaryBasketFolder.'/N_'.$item->basketId, $authBasketFolder.'/N_'.$lastAuthBasketId);
                        DB::table('basket')->where(['userId'=> $temporaryUser, 'basketId'=>$item->basketId])->update(['userId' => $authUser, 'basketId'=>$lastAuthBasketId]);
                    }

                } else {
                    DB::table('basket')->where('userId', $temporaryUser)->update(['userId' => $authUser]);
                }
            }
            session()->forget('temporaryUser');
        }

        return redirect()->route('welcome')->with('modal-info', session()->get('modal-info'));

    }

    static function getPayStatus ($orderId, $fullResult = false) {
        // проверка статуса оплаты заказа

        $order = DB::table('orders')->where('id', (string)$orderId)->first();
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
            DB::table('orders')->where('id', (string)$orderId)->update(['payStatus'=>true]);
            return ['result'=>true, 'message'=>''];
        } else return ['result'=>false, 'message'=>$res['errorMessage']];

    }

    public function logout() {
        // Storage::delete('public/basket/');
        
        Auth::logout();
        session()->forget('noAuthOk');
        session()->forget('temporaryUser');
        return redirect()->to('auth');
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

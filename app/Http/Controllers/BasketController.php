<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;

class BasketController extends Controller
{

    static function getPayStatus ($orderId) {

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
        
        if ($res['orderStatus'] == 1 || $res['orderStatus'] == 2) {
            DB::table('orders')->where('id', $orderId)->update(['payStatus'=>true]);
            return true;
        } else return false;
    }

    static function SberToPay ($id, $ticketProperties, $allPrice, $request) {

        // Оплата с Сбер
        $vars = array();
        $vars['userName'] = 'T366401444667-api';
        $vars['password'] = 'T366401444667';

        $payCount = $request->payCount;
        $payCount ++;
        DB::table('orders')->where('id', $request->id)->update(['payCount'=>$payCount]);
        
        /* ID заказа в магазине */
        $vars['orderNumber'] = $id.'_'.$payCount;

        $vars['orderBundle'] = json_encode(
            array(
                'cartItems' => array(
                    'items' => $ticketProperties
                )
            ),
            JSON_UNESCAPED_UNICODE
        );

        /* Сумма заказа в копейках */
        $vars['amount'] = $allPrice * 100;

        /* URL куда клиент вернется в случае успешной оплаты */
        $vars['returnUrl'] = url('payok/' . $id); //'http://example.com/success/';

        /* URL куда клиент вернется в случае ошибки */
        $vars['failUrl'] = url('payerror/' . $id); // 'http://example.com/error/';

        /* Описание заказа, не более 24 символов, запрещены % + \r \n */
        $vars['description'] = 'Заказ №' . $id . ' на tutuprint.ru';

        $ch = curl_init('https://3dsec.sberbank.ru/payment/rest/register.do?' . http_build_query($vars));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);
        $res = curl_exec($ch);
        curl_close($ch);
        $res = json_decode($res, JSON_OBJECT_AS_ARRAY);
        
        if (empty($res['orderId'])) {
            /* Возникла ошибка: */
            return redirect()->to('payerror/' . $id);
        } else {
            /* Успех: */
            /* Тут нужно сохранить ID платежа в своей БД - $res['orderId'] */
            DB::table('orders')->where('id', $id)->update(array('payId' => $res['orderId']));
            
            /* Перенаправление клиента на страницу оплаты */
            return redirect()->to($res['formUrl']);
        }
    }

    public function payorder(Request $request)
    {
        //         "_token" => "omIlYwqw3pwDt7ZO8fnQPnqdPVYkZd6knr6QMhLm"
        //   "userid" => "1"
        //   "price" => "10"
        //   "deliveryprice" => "250"
        //   "delivery" => "vrn_delivery"
        //   "name" => "Павел"
        //   "adress" => "12"
        //   "tel" => "+1 (711) 111-1111"

        $validatedData = $request->validate([
            'name' => 'required',
            'tel' => 'required|min:16',
        ], [
            'name.required' => 'Введите Имя получателя заказа',
            'tel.required' => 'Заполните контактный номер телефона',
            'tel.min' => 'Введен не верный номер телефона'

        ]);

        // получим все корзины юзера
        $basket = DB::table('basket')->where('userId', $request->userid)->get();
        // Проверим коризну. Если она пустая, то сюда вернулись назад из оплаты
        if (count($basket) > 0) {
            $properties = [];
            $ticketProperties = [];
            $positionId = 0;
            $allPrice = $request->price + $request->deliveryprice;

            foreach ($basket as $item) {
                $positionId++;
                $goodsData = json_decode($item->data);
                $properties[$item->basketId] = $goodsData;

                $ticketProperties[] = array(
                    'positionId' => $positionId,
                    'name' => $goodsData->product->data,
                    'quantity' => array(
                        'value' => 1,
                        'measure' => 'шт'
                    ),
                    'itemAmount' => $goodsData->price->data * 100,
                    'itemCode' => 'print',
                    'tax' => array(
                        'taxType' => 0,
                        'taxSum' => 0
                    ),
                    'itemPrice' => $goodsData->price->data * 100,
                );
            }

            if ($request->deliveryprice > 0) {
                $ticketProperties[] = array(
                    'positionId' => $positionId + 1,
                    'name' => 'Доставка',
                    'quantity' => array(
                        'value' => 1,
                        'measure' => 'шт'
                    ),
                    'itemAmount' => $request->deliveryprice * 100,
                    'itemCode' => 'delivery',
                    'tax' => array(
                        'taxType' => 0,
                        'taxSum' => 0
                    ),
                    'itemPrice' => $request->deliveryprice * 100,
                );
            }

            // запишем новый заказ
            $id = DB::table('orders')->insertGetId(
                [
                    'userId' => $request->userid,
                    'allPrice' => $allPrice,
                    'deliveryPrice' => $request->deliveryprice,
                    'deliveryType' => $request->delivery,
                    'name' => $request->name,
                    'adress' => $request->adress,
                    'status' => 'wait',
                    'tel' => $request->tel,
                    'properties' => json_encode($properties),
                    'created_at' => Carbon::now(),
                ]
            );

            // удалим продукты из корзины
            DB::table('basket')->where('userId', $request->userid)->delete();

            // Перенесем папку с продуктами в папку заказов
            Storage::move('public/basket/' . $request->userid, 'public/orders/' . $id);

            return $this->SberToPay($id, $ticketProperties, $allPrice, $request);

        } else {

            $order = DB::table('orders')->where('userId', $request->userId)->get()->last();
            $id = $order->id;
            $allPrice = intval($order->allPrice);
            $ticketProperties [] = array(
                'positionId' => 1,
                'name' => 'Заказ tutuprint.ru',
                'quantity' => array(
                    'value' => 1,
                    'measure' => 'шт'
                ),
                'itemAmount' => $allPrice * 100,
                'itemCode' => 'photoprint',
                'tax' => array(
                    'taxType' => 0,
                    'taxSum' => 0
                ),
                'itemPrice' => $allPrice * 100,
            );

            return $this->SberToPay($id, $ticketProperties, $allPrice, $request);
        } 
    }

    public function removeBasketTtem (Request $request) {
        if (Auth::user()) {
            $userId = Auth::user()->id;
        } else {
                $userId =  session()->get('temporaryUser');
        }
        $folder = 'public/basket/'.$userId.'/N_'.$request->basketId;
        Storage::deleteDirectory($folder);
        $result = DB::table('basket')->where('id', $request->id)->delete();
        return Response::json($result);
    }
}

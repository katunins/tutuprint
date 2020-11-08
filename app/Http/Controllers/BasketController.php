<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BasketController extends Controller
{

    static function getTicketProperties($order, $deliveryPrice)
    {
        // Создает список товаров для чека
        $positionId = 1;
        foreach ($order as $goodsData) {

            $ticketProperties[] = array(
                'positionId' => $positionId,
                'name' => $goodsData->product->data . ' ' . str_replace(' ', '', $goodsData->size->data) . ', ' . $goodsData->count->data . ' шт. ' . ($goodsData->box->data ? 'С коробкой' : ''),
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
            $positionId++;
        }
        if ($deliveryPrice > 0) {
            $ticketProperties[] = array(
                'positionId' => $positionId,
                'name' => 'Доставка',
                'quantity' => array(
                    'value' => 1,
                    'measure' => 'шт'
                ),
                'itemAmount' => $deliveryPrice * 100,
                'itemCode' => 'print',
                'tax' => array(
                    'taxType' => 0,
                    'taxSum' => 0
                ),
                'itemPrice' => $deliveryPrice * 100,
            );
        }
        return $ticketProperties;
    }

    public function addToBasket(Request $request)
    {
        // получим корзину, если она есть
        $user = ToolsController::getUser();
        if ($user) {
            $userId = $user['id'];
        } else {
            $userId = Str::random(10);
            session()->put('temporaryUser.id', $userId);
        }
        
        // if (Auth::user()) {
        //     $userId = Auth::user()->id;
        // } else {
        //     // проверим или создадим временный ID для пользователя в этой сессии
        //     if (session()->has('temporaryUser')) {
        //         $userId =  session()->get('temporaryUser');
        //     } else {
        //         $userId = Str::random(10);
        //         session()->put('temporaryUser.id', $userId);
        //     }
        // }

        $basket = DB::table('basket')->where('userId', (string)$userId)->get();

        // получим последний внтренний ID корзины и увеличим его
        $id = 0;
        if (count($basket) > 0) $id = $basket[count($basket) - 1]->basketId + 1;


        // Перенесем фотографии из UPLOAD в BASKET и распределим их по папкам с количеством
        $size = str_replace(' ', '', $request->size['data']);
        $basketFolder = 'public/basket/' . $userId . '/' . 'N_' . $id . '/' . $size; // + добавим продукт, формат , поля

        if (!Storage::disk('local')->exists($basketFolder)) Storage::makeDirectory($basketFolder, 0775, true);

        $basketPreview = false;
        foreach (session()->get('images') as $image) {
            $copies = $image['count'] . 'x';
            if (!Storage::disk('local')->exists($basketFolder . '/' . $copies)) Storage::makeDirectory($basketFolder . '/' . $copies, 0775, true);
            Storage::move($image['url'], $basketFolder . '/' . $copies . '/' . $image['filename']);

            // перенесем preview
            if (!$basketPreview) {
                $previewUrl = '';
                foreach (explode('/', $image['url']) as $elem) {
                    if ($elem == 'HD') $elem = 'Thumbnail';
                    $previewUrl .= $elem . '/';
                }
                $previewUrl = substr($previewUrl, 0, -1);
                Storage::move($previewUrl, $basketFolder . '/' . 'preview.' . explode('.', $previewUrl)[1]);
                $basketPreview = true;
            }
        }

        // удалим пустую папку с upload и сессию
        $path = explode('/HD', $image['url'])[0];
        Storage::deleteDirectory(($path));
        session()->forget('images');

        // Создадим в базе корзину
        DB::table('basket')->insert([
            [
                'basketId' => $id,
                'userId' => $userId,
                'data' => json_encode($request->input())
            ],
        ]);

        return Response::json();
    }

    public function makeOrder(Request $request)
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

        // Запишем адрес и телефон в базу пользователя или запомним в сессии
        if (Auth::check()) {
            // $userData = DB::table('users')->where('id', $request->userid)->get()->first();
            if (Auth::user()->tel != $request->tel) 
            {
                DB::table('users')->where('id', (string)$request->userid)->update(['tel' => $request->tel]);
            }
        } else {
            if ($request->tel) session()->put('temporaryUser.tel', $request->tel);
            if ($request->adress) session()->put('temporaryUser.adress', $request->adress);
            if ($request->name) session()->put('temporaryUser.name', $request->name);
        }
        

        // получим все корзины юзера
        $basket = DB::table('basket')->where('userId', (string)$request->userid)->get();
        $properties = [];
        // $ticketProperties = [];
        $positionId = 1;
        $allPrice = $request->price + $request->deliveryprice;

        if (count($basket) == 0) return redirect('basket')->with('modal-info', 'Ошибка! Не найдены товары в корзине');

        foreach ($basket as $item) {

            $goodsData = json_decode($item->data);
            $properties[$item->basketId] = $goodsData;
            // $ticketProperties [] = $this->getTicketProperties($item);
            $positionId++;
        }
        // if ($request->deliveryprice > 0) {
        //     $ticketProperties[] = $this->getTicketProperties([], $request->deliveryprice);
        // }

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
        if ($id) {
            // удалим продукты из корзины
            DB::table('basket')->where('userId', (string)$request->userid)->delete();
            // Перенесем папку с продуктами в папку заказов
            Storage::move('public/basket/' . $request->userid, 'public/orders/' . $id);
            return redirect('payorder/' . $id);
        } else return redirect('basket')->with('modal-info', 'Ошибка создания заказа!');
    }

    public function payorder(Request $request)
    {
        $id = $request->id;
        if (!$id) return redirect('personal')->with('modal-info', 'Ошибка создания оплаты заказа! Попробуйте еще раз');

        $order = DB::table('orders')->where('id', (string)$id)->get()->first();
        if (!$order) return redirect('personal')->with('modal-info', 'Ошибка создания оплаты заказа! Попробуйте еще раз');

        // Составим списк товаров
        $ticketProperties = $this->getTicketProperties(json_decode($order->properties), $order->deliveryPrice);
        // return $this->SberToPay($id, $ticketProperties, $order->allPrice, $request);
        // Оплата с Сбер
        $vars = array();
        $vars['userName'] = 'T366401444667-api';
        $vars['password'] = 'T366401444667';

        $payCount = $order->payCount;
        $payCount++;
        DB::table('orders')->where('id', (string)$request->id)->update(['payCount' => $payCount]);

        /* ID заказа в магазине */
        $vars['orderNumber'] = $id . '_' . $payCount;

        $vars['orderBundle'] = json_encode(
            array(
                'cartItems' => array(
                    'items' => $ticketProperties
                )
            ),
            JSON_UNESCAPED_UNICODE
        );

        /* Сумма заказа в копейках */
        $vars['amount'] = $order->allPrice * 100;

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
            return redirect('personal')->with('modal-info', 'Ошибка оплаты заказа #' . $id . '! '.$res ['errorMessage']);
        } else {
            /* Успех: */
            /* Тут нужно сохранить ID платежа в своей БД - $res['orderId'] */
            DB::table('orders')->where('id', (string)$id)->update(array('payId' => $res['orderId']));

            /* Перенаправление клиента на страницу оплаты */
            return redirect($res['formUrl']);
        }
    }

    public function removeBasketTtem(Request $request)
    {
        if (Auth::user()) {
            $userId = Auth::user()->id;
        } else {
            $userId =  session()->get('temporaryUser');
        }
        $folder = 'public/basket/' . $userId . '/N_' . $request->basketId;
        Storage::deleteDirectory($folder);
        $result = DB::table('basket')->where('id', (string)$request->id)->delete();
        return Response::json($result);
    }

    public function getBasketCount()
    {
        // получим корзину - вернем сумму ее и количество позиций
        if (Auth::user()) {
            $userId = Auth::user()->id;
            $basket = DB::table('basket')->where('userId', (string)$userId)->get();
        } elseif (session()->has('temporaryUser')) {
            $userId =  session()->get('temporaryUser.id');
            $basket = DB::table('basket')->where('userId', (string)$userId)->get();
        } else $basket = [];

        $count = 0;
        $summ = 0;

        foreach ($basket as $item) {
            $summ += json_decode($item->data)->price->data;
            $count++;
        }
        if ($count > 0) {
            $result = ['summ' => $summ, 'count' => $count];
        } else {
            $result = false;
        }
        return Response::json($result);
    }
}

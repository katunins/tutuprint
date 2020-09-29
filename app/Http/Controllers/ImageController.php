<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Image;


class ImageController extends Controller
{

    public function updateSessionImageCount(Request $request)
    {


        $sessionArr = Session::get('images');

        $folder = 'public/upload/' . Carbon::now()->format('d-m-Y') . '/' . $request->session()->get('_token');
        foreach ($request->data as $data) {
            if ($data['count'] > 0) {
                // $request->session()->put('images.'.$data['id'].'.count', $data['count']);
                $sessionArr = array_map(function ($arr) use ($data) {
                    if ($arr['id'] == $data['id']) $arr['count'] = $data['count'];
                    return $arr;
                }, $sessionArr);
                $request->session()->put('images', $sessionArr);
            } else {
                $newArr = [];
                foreach ($sessionArr as $arr) {
                    if ($arr['id'] == $data['id']) $fileTodelete = $arr['filename'];
                    else $newArr[] = $arr;
                }
                // $fileTodelete = Session::get('images.'.$data['id'])['filename'];
                Storage::delete($folder . '/HD/' . $fileTodelete);
                Storage::delete($folder . '/Thumbnail/' . $fileTodelete);
                // $request->session()->forget('images.'.$data['id']);
                $sessionArr = $newArr;
                $request->session()->put('images', $sessionArr);
            }
        }
        echo json_encode(['result' => true]);
    }

    public function eraseAllImages(Request $request)
    {
        $request->session()->forget('images');
        echo (json_encode(['result' => true]));

        // грохнем сразу всю папку сессии
        Storage::deleteDirectory('public/upload/' . Carbon::now()->format('d-m-Y') . '/' . $request->session()->get('_token'));
    }

    public function imageUpload(Request $request)
    {

        $test = $request->session()->all();
        // загружает одно изображение, ресайзит и прописывает в сессию

        //найдем последний ID из сессии, если она есть
        if (Session::has('images')) {
            $sessionArr = Session::get('images');
            $id = end($sessionArr)['id'] + 1;
        } else $id = 0;

        // определим папки для загрузки

        $folder = 'public/upload/' . Carbon::now()->format('d-m-Y') . '/' . $request->session()->get('_token');
        $thumbnailFolder = 'storage/upload/' . Carbon::now()->format('d-m-Y') . '/' . $request->session()->get('_token') . '/Thumbnail/'; // кривое решение из за Image Intervention - он не может доступ получить к Storage
        $files = $request->file('images');

        for ($i = 0; $i < count($files); $i++) {


            $original_name = Str::slug(explode('.', $files[$i]->getClientOriginalName())[0]);
            $original_ext = pathinfo($files[$i]->getClientOriginalName())['extension'];

            // преобразуем русские название файлов и проверим нет ли копии
            if (Storage::disk('local')->exists($folder . '/HD/' . $original_name . '.' . $original_ext)) $original_name .= '_copy' . Str::random(5); // Вдруг одинаковые названия у файлов

            $current_file_name = $original_name . '.' . $original_ext;
            $path = $files[$i]->storeAs($folder . '/HD', $current_file_name); //основная директория для hiRes фотографий

            // $path = Storage::disk('local')->putFileAs(
            //     $folder . '/HD', $files[$i], $current_file_name
            // );

            // $path = Storage::putFileAs(
            //     $folder . '/HD', $files[$i], $current_file_name
            // );

            if (!Storage::disk('local')->exists($folder . '/Thumbnail')) Storage::makeDirectory($folder . '/Thumbnail', 0775, true); //Сделаем директорию для preview

            $image = Image::make($files[$i]->getRealPath())->orientate();

            $width = $image->width();
            $heigh = $image->height();
            $size = $image->filesize();

            $image->resize(500, 500, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->sharpen(5)->save($thumbnailFolder . $current_file_name);
            $pathThumbnail = $folder . '/Thumbnail/' . $current_file_name;

            Cache::put('progress', ($i + 1) * 100 / count($files));

            Session::push('images', [
                'id' => $id + $i,
                'url' => $path, //Storage::url($path),
                'count' => 1,
                'thumbnail' => Storage::url($pathThumbnail),
                'filename' => $current_file_name,
                'width' => $width,
                'heigh' => $heigh,
                'size' => $size,
            ]);

            $result[] = [
                'url' => Storage::url($path),
                'id' => $id + $i,
                'thumbnail' => Storage::url($pathThumbnail),
                'filename' => $current_file_name,
                'width' => $width,
                'heigh' => $heigh,
                'size' => $size,
                'test' => $test
            ];
        }
        return Response::json($result);
    }

    public function RemoveOldUploads()
    {
        // запускается из Cron
        $directories = Storage::directories('public/upload');
        foreach ($directories as $directoryPath) {
            // Возьмем имя директории из пути
            $directoryPathArray = explode('/', $directoryPath);
            $directoryTime = Carbon::parse(end($directoryPathArray));
            // удалим все папки, которые старше одного дня
            if (Carbon::today()->diffInDays($directoryTime) > 1) {
                Storage::deleteDirectory($directoryPath);
            }
        }
    }

    public function getProgressUpload(Request $request)
    // возвращает статус resize картинок
    {
        return response(Cache::pull('progress'));
    }

    public function setLowQualityArgee(Request $request)
    // записывает в сессию данные о согласии клиента использовать картинку с низким разрешением
    {
        $currentArr = Session::get('images');
        $newArr = [];
        foreach ($currentArr as $elem) {

            if (array_search($elem['id'], $request->data) !== false) $elem['lowqualityagree'] = true;
            $newArr[] = $elem;
        }

        Session::put('images', $newArr);
        return Response::json(true);
    }

    public function addToBasket(Request $request)
    {
        // return Response::json ($size);
        // получим корзину, если она есть
        $userEmail= '';
        $tempUserId = '';

        if (Auth::user()) {
            
            $userEmail = Auth::user()->email;
            $basket = DB::table('basket')->where('userEmail', $userEmail)->get();
        
            // return Response::json(count($basket));
        } else {

            // проверим или создадим временный ID для пользователя в этой сессии
            if (Session::has('temporaryUser')) {
                $tempUserId =  Session::get('temporaryUser');
            } else {
                $tempUserId = Str::random(5);
                Session::put('temporaryUser', $tempUserId);
            }
            $basket = DB::table('basket')->where('temporaryUserId', $tempUserId)->get();
        }
        $id = 0;
        
        if (count($basket) > 0) {
            // получим последний внтренний ID корзины и увеличим его
            $id = $basket[count($basket)-1]->basketId+1;
        }
        

        // Перенесем фотографии из UPLOAD в BASKET и распределим их по папкам с количеством
        
        $size = str_replace(' ', '', $request->size['data']); 
        $basketFolder = 'public/basket/' . $request->session()->get('_token').'/'.'N_'.$id.'/'.$size; // + добавим продукт, формат , поля
        
        if (!Storage::disk('local')->exists($basketFolder)) Storage::makeDirectory($basketFolder, 0775, true);

        foreach (Session::get('images') as $image) {
            $copies = $image['count'].'_copies';
            if (!Storage::disk('local')->exists($basketFolder . '/' . $copies)) Storage::makeDirectory($basketFolder . '/' . $copies, 0775, true);

            Storage::move($image['url'], $basketFolder . '/' . $copies . '/' . $image['filename']);
            // Storage::delete($image['thumbnail']);
        }

        // удалим пустую папку с upload и сессию
        $path = explode('/HD', $image['url'])[0];
        Storage::deleteDirectory(($path));
        Session::forget('images');

        // Создадим в базе корзину
        DB::table('basket')->insert([
            ['basketId' => $id, 
            'userEmail' => $userEmail, 
            'temporaryUserId' => $tempUserId, 
            'data'=>json_encode($request->input())],
        ]);

    return Response::json ();
    }

    public function getBasketCount () {
        // получим корзину - вернем сумму ее и количество позиций
        if (Auth::user()) {
            
            $userEmail = Auth::user()->email;
            $basket = DB::table('basket')->where('userEmail', $userEmail)->get();
        
            // return Response::json(count($basket));
        } elseif (Session::has('temporaryUser')) {
                $tempUserId =  Session::get('temporaryUser');
                $basket = DB::table('basket')->where('temporaryUserId', $tempUserId)->get();
             
            
        } else $basket = [];
        $count = 0;
        $summ = 0;
        foreach ($basket as $item) {
            $summ += json_decode($item->data)->price->data;
            $count ++;
        }
        if ($count > 0) {
            $result = ['summ'=>$summ, 'count'=>$count];
        } else {$result = false;}
        return Response::json ($result);
    }
}

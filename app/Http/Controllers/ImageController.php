<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Image;

use function PHPSTORM_META\map;

class ImageController extends Controller
{
    public function updateSessionImageCount (Request $request) {


    $sessionArr = Session::get('images');
        
        $folder = 'public/upload/'.Carbon::now()->format('d-m-Y').'/'.$request->session()->get('_token');
        foreach ($request->data as $data) {
            if ($data['count'] > 0) {
                // $request->session()->put('images.'.$data['id'].'.count', $data['count']);
                $sessionArr = array_map(function($arr) use ($data) {
                    if ($arr['id'] == $data['id']) $arr['count'] = $data['count'];
                    return $arr;
                }, $sessionArr);
                $request->session()->put('images', $sessionArr);
            } else {
                $newArr = [];
                foreach ($sessionArr as $arr) {
                    if ($arr['id']==$data['id']) $fileTodelete = $arr['filename']; else $newArr[] = $arr;
                }
                // $fileTodelete = Session::get('images.'.$data['id'])['filename'];
                Storage::delete($folder.'/HD/'.$fileTodelete);
                Storage::delete($folder.'/Thumbnail/'.$fileTodelete);
                // $request->session()->forget('images.'.$data['id']);
                $sessionArr = $newArr;
                $request->session()->put('images', $sessionArr);
            }
        }
        echo json_encode(['result'=>true]);
    }

    public function eraseAllImages (Request $request) {
        $request->session()->forget('images');
        echo (json_encode(['result'=>true]));

        // грохнем сразу всю папку сессии
        Storage::deleteDirectory('public/upload/'.Carbon::now()->format('d-m-Y').'/'.$request->session()->get('_token'));

    }

    public function imageUpload (Request $request) {

        // загружает одно изображение, ресайзит и прописывает в сессию
        // $id = Session::has('images') ? intval(array_key_last(Session::get('images'))) : 0; //найдем последний ID из сессии, если она есть
        // $id++;
        $id = Str::random(10);

        // определим папки для загрузки
        
        $folder = 'public/upload/'.Carbon::now()->format('d-m-Y').'/'.$request->session()->get('_token'); 
        $thumbnailFolder = 'storage/upload/'.Carbon::now()->format('d-m-Y').'/'.$request->session()->get('_token').'/Thumbnail/'; // кривое решение из за Image Intervention - он не может доступ получить к Storage
        
        // преобразуем русские название файлов и проверим нет ли копии
        $original_name = Str::slug (explode('.', $request->file('image')->getClientOriginalName())[0]);
        $original_ext = pathinfo($request->file('image')->getClientOriginalName())['extension'];
        
        if (Storage::disk('local')->exists($folder.'/HD/'.$original_name.'.'.$original_ext)) $original_name .= '_copy'.Str::random(5); // Вдруг одинаковые названия у файлов
        
        $current_file_name = $original_name.'.'.$original_ext;
        $path = $request->file('image')->storeAs($folder.'/HD', $current_file_name); //основная директория для hiRes фотографий
        
        if(!Storage::disk('local')->exists($folder.'/Thumbnail')) Storage::makeDirectory($folder.'/Thumbnail', 0775, true); //Сделаем директорию для preview
        
        $thumbnail = Image::make($request->file('image')->getRealPath())->orientate()->resize(600, 600, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        })->sharpen(5);
        $thumbnail->save($thumbnailFolder.$current_file_name);
        $pathThumbnail = $folder.'/Thumbnail/'.$current_file_name;

        Session::push ('images', [
            'id' => $id, 
            'url' => Storage::url($path),
            'count' => 1,
            'thumbnail' => Storage::url($pathThumbnail),
            'filename' => $current_file_name
        ]);

        // Session::put ('images.'.$id, [
        //     'url' => Storage::url($path),
        //     'count' => 1,
        //     'thumbnail' => Storage::url($pathThumbnail),
        //     'filename' => $current_file_name
        // ]);
        
        $result  = [       
            'url' => Storage::url($path),
            'id' => $id,
            'thumbnail' => Storage::url($pathThumbnail),
            'filename' => $current_file_name,
        ];

        // echo json_encode([ 'result'=> $result]);
        return Response::json($result);
    }

    public function RemoveOldUploads () {
        // запускается из Cron
        $directories = Storage::directories('public/upload');
        foreach ($directories as $directoryPath) {
            // Возьмем имя директории из пути
            $directoryPathArray = explode('/', $directoryPath);
            $directoryTime = Carbon::parse(end($directoryPathArray));
            // удалим все папки, которые старше одного дня
            if (Carbon::today()->diffInDays($directoryTime) > 1) {
                Storage::deleteDirectory( $directoryPath );
            }            
        }
    }
    
}

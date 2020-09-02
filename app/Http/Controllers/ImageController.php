<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Image;

class ImageController extends Controller
{
    public function updateSessionImageCount (Request $request) {
        
        $folder = 'public/upload/'.Carbon::now()->format('d-m-Y').'/'.$request->session()->get('_token');
        foreach ($request->data as $data) {
            if ($data['count'] > 0) {
                $request->session()->put('images.'.$data['id'].'.count', $data['count']);
            } else {
                $fileTodelete = Session::get('images.'.$data['id'])['filename'];
                Storage::delete($folder.'/HD/'.$fileTodelete);
                Storage::delete($folder.'/Thumbnail/'.$fileTodelete);
                $request->session()->forget('images.'.$data['id']);
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
        // добавляет фотографии к сессии и возвращает массив загруженных фотографий

        $id = Session::has('images') ? intval(array_key_last(Session::get('images'))) : 0; //последний ID из сессии, если она есть
        $id++;
        $folder = 'public/upload/'.Carbon::now()->format('d-m-Y').'/'.$request->session()->get('_token');
        
        // кривое решение из за Image Intervention - он не может доступ получить к Storage
        $thumbnailFolder = 'storage/upload/'.Carbon::now()->format('d-m-Y').'/'.$request->session()->get('_token').'/Thumbnail/';

            $file = $request->file('image');
            // преобразуем русские название файлов
            $original_name = Str::slug (pathinfo($file->getClientOriginalName())['basename']);
            $original_ext = pathinfo($file->getClientOriginalName())['extension'];
            
            // Вдруг одинаковые названия у файлов
            if (Storage::exists($folder.'/'.$original_name.'.'.$original_ext)) $original_name .= '_copy_'.Str::random(2);
            $current_file_name = $original_name.'.'.$original_ext;

            $path = $file->storeAs($folder.'/HD', $current_file_name);
            
            $thumbnail = Image::make($file->getRealPath());
            $thumbnail->resize(300, 300 , function ($constraint) {
                $constraint->aspectRatio();
                // $constraint->upsize();
            });

            if(!Storage::exists($folder.'/Thumbnail')) Storage::makeDirectory($folder.'/Thumbnail', 0775, true); //creates directory
            
            
            $thumbnail->save($thumbnailFolder.$current_file_name);
            $pathThumbnail = $folder.'/Thumbnail/'.$current_file_name;

            Session::put ('images.'.$id, [
                'url' => Storage::url($path),
                'count' => 1,
                'thumbnail' => Storage::url($pathThumbnail),
                'filename' => $current_file_name
            ]);

            $result  = [       
                'url' => Storage::url($path),
                'id' => $id,
                'thumbnail' => Storage::url($pathThumbnail),
                'filename' => $current_file_name
            ];
        echo json_encode([ 'result'=> $result]);
    }
    
}

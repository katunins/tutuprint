<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function updateSessionImageCount (Request $request) {
        
        foreach ($request->data as $data) {
            if ($data['count'] > 0) {
                $request->session()->put('images.'.$data['id'].'.count', $data['count']);
            } else {
                $request->session()->forget('images.'.$data['id']);
            }
        }
        echo json_encode(['result'=>true]);
    }

    public function eraseAllImages (Request $request) {
        $request->session()->forget('images');
        echo (json_encode(['result'=>true]));
        // удаление папки
    }

    static function ImagesToSession ($newImageArr) {

        if (Session::has('images') && isset ($newImageArr)) {
            $id = intval(array_key_last(Session::get('images')));
            $imageArr = clone $newImageArr;
        } else {
            $id = 0;
            $folder = 'public/upload/'.Carbon::now()->format('d-m-Y').'/'.Session::get('_token');
            $imageArr = Storage::files($folder);
        }

        return Session::all();
        foreach ($imageArr as $item) {
            $id ++;
            $imageArr[$id] = [
                'url' => Storage::url($item),
                'count' => 1,
            ];
            Session::put('images.'.$id, $imageArr[$id]);
        }

        // if (isset ($newImageArr)) {
        //     // $id = intval(array_key_last(Session::get('images')));
        //     // $imageArr = Session::get('images');
        //     foreach ($newImageArr as $item) {
        //         $id ++;
        //         $imageArr[$id] = [
        //             'url' => Storage::url($item),
        //             'count' => 1,
        //         ];
        //         Session::put('images.'.$id, $imageArr[$id]);
        //     }

        // } else {
        //     // $imageArr = [];
        //     // $folder = 'public/upload/'.Carbon::now()->format('d-m-Y').'/'.Session::get('_token');
        //     // $id = 0;
        //     foreach (Storage::files($folder) as $item) {
        //         $id ++;
        //         $imageArr[$id] = [
        //             'url' => Storage::url($item),
        //             'count' => 1,
        //         ];
        //         Session::put('images.'.$id, $imageArr[$id]);
        //     }
        //     // Session::put('images', $imageArr);
        // }
            return Session::get('images');
    }

    public function imageUpload (Request $request) {
        $imageArr = [];
        $folder = 'public/upload/'.Carbon::now()->format('d-m-Y').'/'.$request->session()->get('_token');
        foreach ($request->file('image') as $file) {
            
            // преобразуем русские название файлов
            $original_name = Str::slug (pathinfo($file->getClientOriginalName())['basename']);
            $original_ext = pathinfo($file->getClientOriginalName())['extension'];

            $imageArr [] = $file->storeAs($folder, $original_name.'.'.$original_ext);
        }
        echo (json_encode([ 'result'=> $this->ImagesToSession($imageArr) ]));
    }
    
}

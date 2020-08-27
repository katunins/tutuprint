<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function updateSessionImageCount (Request $request) {
        $imageArr = array_map(function ($item) use ($request) {
            if ($request->url == $item['url']) $item['count'] = $request->count;
            return $item;
        }, $request->session()->get('images'));
        
        // echo json_encode($request->all());
        // echo json_encode($imageArr);
        $request->session()->put('images', $imageArr);
        echo json_encode($imageArr);
    }
}

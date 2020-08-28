<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;

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
}

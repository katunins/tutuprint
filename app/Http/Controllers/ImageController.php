<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function updateSessionImageCount (Request $request) {

        if ($request->count > 0) {
            $request->session()->put('images.'.$request->id.'.count', $request->count);
        } else {
            $request->session()->forget($request->id);
        }
        echo json_encode(['result'=>true]);
    }
}

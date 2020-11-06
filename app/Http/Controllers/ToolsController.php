<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ToolsController extends Controller
{
    public function afterAuth()
    {session()->put("noAuthOk", false);

        if (session()->has('temporaryUser')) {
            DB::table('orders')->where('userId', session()->get('temporaryUser'))->update(['userId' => Auth::user()->id]);
            session()->forget('temporaryUser');
        }

        if (session()->has('basketAuth')) {
            session()->forget('basketAuth');
            return redirect('basket')->with('modal-info', session()->get('modal-info'))->with('newAuth', true);
        } else {
            return redirect()->route('welcome')->with('modal-info', session()->get('modal-info'));
        }
    }

    
}

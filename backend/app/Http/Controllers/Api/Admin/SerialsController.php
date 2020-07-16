<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Serials;

class SerialsController extends Controller
{
    public function index(){
        return [
            "page"=> "index"
        ];
    }

    //get All Serials List
    public function getAllSerials(){
        $serials = Serials::paginate(10);
        return $serials;
    }
}

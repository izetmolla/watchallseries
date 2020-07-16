<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Serials;

class ImportController extends Controller
{
    //
    public function importList(Request $request){

        $serials = [];
        foreach($request->serials as $serial){
            $serials[]=[
                'serialId'=> time(),
                'title'=> $serial['title'],
                'thumbnail'=> $serial['thumbnail'],
                'release_date'=> $serial['year'],
                'description'=> $serial['description'],
                'slug'=> strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $serial['title']))),
                'importURL'=> $serial['url']
            ];
        }



        $imported = Serials::insertOrIgnore($serials);
        return $imported;
    }
}

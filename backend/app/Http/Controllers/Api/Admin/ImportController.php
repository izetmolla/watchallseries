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
                'released_date'=> $serial['year'],
                'description'=> $serial['description'],
                'slug'=> strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $serial['title']))),
                'import_slug'=> $serial['import_slug'],
                'import_website'=> $serial['import_website']
            ];
        }

        $imported = Serials::insertOrIgnore($serials);
        return $imported;
    }


    public function importEpisodes(Request $request){
        return 123;
        $serials = [];
        foreach($request->serials as $serial){
            $serials[]=[
                'serialId'=> time(),
                'title'=> $serial['title'],
                'thumbnail'=> $serial['thumbnail'],
                'released_date'=> $serial['year'],
                'description'=> $serial['description'],
                'slug'=> strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $serial['title']))),
                'import_slug'=> $serial['import_slug'],
                'import_website'=> $serial['import_website']
            ];
        }

        $imported = Serials::insertOrIgnore($serials);
        return $imported;
    }
}

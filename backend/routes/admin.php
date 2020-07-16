<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




Route::post('/','Api\Admin\DashboardController@index');

Route::post('/dashboard','Api\Admin\DashboardController@index');



// Serials Routing
Route::prefix('serials')->group(function () {
    Route::post('/','Api\Admin\SerialsController@index');
    Route::post('/getAllSerials','Api\Admin\SerialsController@getAllSerials');

    Route::post('/import','Api\Admin\ImportController@importList');
    

});

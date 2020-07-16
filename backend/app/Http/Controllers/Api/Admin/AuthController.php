<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\User;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){

		$request->validate([
			'email'=>'required',
			'name'=>'required',
			'password'=>'required'
		]);

		$user=new User();
		$user->email=$request->email;
		$user->name=$request->name;
		$user->email=$request->email;
		$user->password=bcrypt($request->password);
		$user->save();


		$http = new Client;

		$response = $http->post(url('oauth/token'), [
		    'form_params' => [
		        'grant_type' => 'password',
		        'client_id' => '2',
		        'client_secret' => 'rZWw1zEPOcW7qBTM522lTdMqxkcKftUh9tGkE6du',
		        'username' => $request->email,
		        'password' => $request->password,
		        'scope' => '',
		    ],
		]);


		return response(['auth'=>json_decode((string) $response->getBody(), true),'user'=>$user]);
		
	}

	public function login(Request $request){
		
		$request->validate([
			'email'=>'required',
			'password'=>'required'
		]);

		$user= User::where('email',$request->email)->first();

		if(!$user){
			return response(['isLogged'=> false, 'message'=>'User Not Found','status'=>'error']);
		}

		if(Hash::check($request->password, $user->password)){

				$http = new Client;

			$response = $http->post(url('oauth/token'), [
				'form_params' => [
					'grant_type' => 'password',
					'client_id' => '2',
					'client_secret' => 'rZWw1zEPOcW7qBTM522lTdMqxkcKftUh9tGkE6du',
					'username' => $request->email,
					'password' => $request->password,
					'scope' => '',
				],
			]);
			return response([
				'isLogged'=> true,
				'message'=>'Successful Logged in...',
				'status'=>'success',
				'tokens' => json_decode((string)$response->getBody(), true),
				'user' => $user]);

		
		}else{
			return response(['isLogged'=> false, 'message'=>'Password not match','status'=>'error']);
		}


	}

	public function refreshToken() {

		$http = new Client;

		$response = $http->post(url('oauth/token'), [
		    'form_params' => [
		        'grant_type' => 'refresh_token',
		        'refresh_token' => request('refresh_token'),
		        'client_id' => '2',
		        'client_secret' => 'rZWw1zEPOcW7qBTM522lTdMqxkcKftUh9tGkE6du',
		        'scope' => '',
		    ],
		]);

		return json_decode((string) $response->getBody(), true);

	}
}

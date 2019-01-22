<?php
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

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'AuthController@login');

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::get('logout', 'AuthController@logout');

    Route::apiResource('message', 'MessageController');
});

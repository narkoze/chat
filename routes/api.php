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

Route::post('signup', 'Auth\RegisterController@register');
Route::post('signin', 'AuthController@signin');

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::get('signout', 'AuthController@signout');
});

<?php

use Illuminate\Http\Request;

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

// User Login API
Route::post('/login', 'AuthAPIController@login');

/** Get library logo and name */
Route::get('library-details', 'AuthAPIController@getLibraryDetails');

// member login API
Route::post('member-login', 'AuthAPIController@memberLogin');

include 'api/v1.php';
include 'api/b1.php';

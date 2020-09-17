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
include 'api/m1.php';

/*
|--------------------------------------------------------------------------
| Swagger
|--------------------------------------------------------------------------
*/
Route::get('docs', function () {
    return view('redoc.index');
});

Route::get('mobile-apis', function () {
    return view('mobile.index');
});


/** Search books */
Route::get('books', 'BookAPIController@index')->name('books.index');
Route::get('total-books', 'BookAPIController@totalBooks')->name('books.count');

/** homepage settings */
Route::get('homepage-settings', 'HomepageSettingAPIController@index');

/** Get all testimonials */
Route::get('testimonials', 'TestimonialAPIController@index');

//get All Genres
Route::get('genres', 'GenreAPIController@getAllGenres');

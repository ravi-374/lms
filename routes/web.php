<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::group(['middleware' => ['eBook']], function () {
// download e-book
    Route::get('m1/book-items/{book_item}/download',
        'API\M1\BookItemAPIController@downloadEBook')->name('member.download-e-book');

// download e-book
    Route::get(
        'b1/book-items/{book_item}/download',
        'API\B1\BookItemAPIController@downloadEBook')
        ->name('admin.download-e-book');
});

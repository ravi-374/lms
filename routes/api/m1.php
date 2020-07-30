<?php

/**
 * Member Auth Middleware
 */
Route::group(['middleware' => ['auth:sanctum', 'member.auth']], function () {
    // Book search
    Route::get('search-books', 'BookItemAPIController@searchBooks')->name('search-books.index');
    // get logged in member details
    Route::get('member-details', 'MemberAPIController@getLoggedInMemberDetails')->name('member-details');
    // update logged in member profile
    Route::post('update-member-profile', 'MemberAPIController@updateMemberProfile')
        ->name('update-member-profile');
    // books history
    Route::get('books-history', 'IssuedBookAPIController@booksHistory')->name('books-history.index');
    // Book history Details
    Route::get('books/{book_item}/book-history', 'IssuedBookAPIController@booksHistoryDetail')
        ->name('book-history');
    // Reserve Book
    Route::post('books/{book_item}/reserve-book', 'IssuedBookAPIController@reserveBook')
        ->name('reserve-book');
    // Un-Reserve Book
    Route::post('books/{book_item}/un-reserve-book', 'IssuedBookAPIController@unReserveBook')
        ->name('un-reserve-book');
    // Book Requests

    Route::resource('book-requests', 'BookRequestAPIController');

    Route::get('countries', 'CountryAPIController@index')->name('countries.index');
    // Change Password
    Route::put('change-password', 'MemberAPIController@changePassword');
});
Route::post('logout', 'MemberAuthController@logout');

Route::post('member-login', 'AuthAPIController@memberLogin');
Route::post('register-member', 'MemberAuthController@register')->name('register-member');

/** Password Reset API's For Member */
Route::post('send-reset-member-password-link', 'MemberAuthController@sendResetPasswordLink');
Route::post('reset-member-password', 'MemberAuthController@resetPassword')
    ->name('reset-member-password.index');

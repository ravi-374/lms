<?php
/**
 * Member Auth Middleware
 */
Route::group(['middleware' => ['auth:sanctum', 'member.auth']], function () {
    // Reserve Book
    Route::post('books/{book_item}/reserve-book', 'IssuedBookAPIController@reserveBook')
        ->name('reserve-book');
    // Un-Reserve Book
    Route::post('books/{book_item}/un-reserve-book', 'IssuedBookAPIController@unReserveBook')
        ->name('un-reserve-book');
    // books history
    Route::get('books-history', 'IssuedBookAPIController@booksHistory')->name('books-history.index');

    // get logged in member details
    Route::get('member-details', 'MemberAPIController@getLoggedInMemberDetails')->name('member-details');

    // get all books
    Route::get('books', 'BookAPIController@index')->name('books.index');

    // Book search
    Route::get('search-books', 'BookItemAPIController@searchBooks')->name('search-books.index');

    // update logged in member profile
    Route::post('update-member-profile', 'MemberAPIController@updateMemberProfile')
        ->name('update-member-profile');
    Route::get('membership-plans', 'MembershipPlanAPIController@index')->name('membership-plans.index');

    // delete login member image
    Route::post('remove-image', 'MemberAPIController@removeImage')->name('remove-image');

    Route::get('countries', 'CountryAPIController@index')->name('countries.index');

    Route::get('authors', 'AuthorAPIController@index')->name('authors.index');

    /** Book Requests */
    Route::resource('book-requests', 'BookRequestAPIController');

    Route::put('change-password', 'MemberAPIController@changePassword');

    /** My Settings */
    Route::get('my-settings', 'MemberSettingAPIController@index');
    Route::post('update-settings', 'MemberSettingAPIController@update');

    // get e-books
    Route::get('e-books', 'BookItemAPIController@getEBooks')->name('e-books');
});

Route::post('register-member', 'MemberAuthController@register')->name('register-member');
Route::get('activate-member', 'MemberAuthController@verifyAccount')->name('activate-member');

/** Password Reset API's For Member */
Route::post('send-reset-member-password-link', 'MemberAuthController@sendResetPasswordLink');
Route::post('reset-member-password', 'MemberAuthController@resetPassword')
    ->name('reset-member-password.index');

Route::get('settings', 'SettingAPIController@index')->name('settings.index');

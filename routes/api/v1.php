<?php
/**
 * Member Auth Middleware
 */
Route::group(['middleware' => 'member.auth'], function () {
    // Reserve Book
    Route::post('books/{book_item}/reserve-book', 'IssuedBookAPIController@reserveBook');
    // Un-Reserve Book
    Route::post('books/{book_item}/un-reserve-book', 'IssuedBookAPIController@unReserveBook');
    // books history
    Route::get('books-history', 'IssuedBookAPIController@booksHistory');

    // get logged in member details
    Route::get('member-details', 'MemberAPIController@getLoggedInMemberDetails');

    // get all books
    Route::get('books', 'BookAPIController@index');

    // Book search
    Route::get('search-books', 'BookItemAPIController@searchBooks');

    // update logged in member profile
    Route::post('update-member-profile', 'MemberAPIController@updateMemberProfile');
    Route::get('membership-plans', 'MembershipPlanAPIController@index');

    // delete login member image
    Route::post('remove-image', 'MemberAPIController@removeImage');

    Route::get('countries', 'CountryAPIController@index');

    Route::get('authors', 'AuthorAPIController@index');
});

Route::post('register-member', 'MemberAuthController@register');
Route::get('activate-member', 'MemberAuthController@verifyAccount');

/** Password Reset API's For Member */
Route::post('send-reset-member-password-link', 'MemberAuthController@sendResetPasswordLink');
Route::post('reset-member-password', 'MemberAuthController@resetPassword');
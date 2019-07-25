<?php
/**
 * Member Auth Middleware
 */
Route::group(['middleware' => 'member.auth'], function () {
    // Reserve Book
    Route::post('books/{book_item}/reserve-book', 'IssuedBookAPIController@reserveBook');
    // books history
    Route::get('books-history', 'IssuedBookAPIController@booksHistory');

    // get logged in member details
    Route::get('member-details', 'MemberAPIController@getLoggedInMemberDetails');
    // Book search
    Route::get('search-books', 'BookItemAPIController@searchBooks');

    // update logged in member profile
    Route::post('update-member-profile', 'MemberAPIController@updateMemberProfile');
});

Route::post('register-member', 'MemberAuthController@register');
Route::get('activate-member', 'MemberAuthController@verifyAccount');

/** Password Reset API's For Member */
Route::post('send-reset-member-password-link', 'MemberAuthController@sendResetPasswordLink');
Route::post('reset-member-password', 'MemberAuthController@resetPassword');
<?php

/**
 * Member Auth Middleware
 */
Route::group(['middleware' => 'member.auth'], function () {
    // Book search
    Route::get('search-books', 'BookItemAPIController@searchBooks')->name('search-books.index');

    // update logged in member profile
    Route::post('update-member-profile', 'MemberAPIController@updateMemberProfile')
        ->name('update-member-profile');

    Route::put('change-password', 'MemberAPIController@changePassword');
});

Route::post('member-login', 'AuthAPIController@memberLogin');
Route::post('register-member', 'MemberAuthController@register')->name('register-member');

/** Password Reset API's For Member */
Route::post('send-reset-member-password-link', 'MemberAuthController@sendResetPasswordLink');
Route::post('reset-member-password', 'MemberAuthController@resetPassword')
    ->name('reset-member-password.index');
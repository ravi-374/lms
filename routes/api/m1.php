<?php
Route::post('member-login', 'AuthAPIController@memberLogin');
Route::post('register-member', 'MemberAuthController@register')->name('register-member');

/** Password Reset API's For Member */
Route::post('send-reset-member-password-link', 'MemberAuthController@sendResetPasswordLink');
Route::post('reset-member-password', 'MemberAuthController@resetPassword')
    ->name('reset-member-password.index');
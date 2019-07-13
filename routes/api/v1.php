<?php

Route::group(['middleware' => 'jwt.auth'], function () {
    // Genre Routes
    Route::resource('genres', 'GenreAPIController');

    // Author Routes
    Route::resource('authors', 'AuthorAPIController');

    // Publishers Routes
    Route::resource('publishers', 'PublisherAPIController');

    // Tags Routes
    Route::resource('tags', 'TagAPIController');

    // Book Language Routes
    Route::resource('book-languages', 'BookLanguageAPIController');

    // Roles
    Route::resource('roles', 'RoleAPIController');
    Route::post('roles/{role}', 'RoleAPIController@update');

    // Permissions
    Route::resource('permissions', 'PermissionAPIController');

    // Book API Routes
    Route::resource('books', 'BookAPIController');
    Route::post('books/{book}', 'BookAPIController@update');
    Route::post('books/{book}/remove-image', 'BookAPIController@removeImage');

    // add book items
    Route::post('books/{book}/items', 'BookAPIController@addItems');

    // Users
    Route::resource('users', 'UserAPIController');
    Route::post('users/{user}', 'UserAPIController@update');
    Route::post('users/{user}/remove-image', 'UserAPIController@removeImage');


    // Members
    Route::resource('members', 'MemberAPIController');
    Route::post('members/{member}', 'MemberAPIController@update');

    // book series routes
    Route::resource('book-series', 'BookSeriesAPIController');
    Route::post('book-series/{book_series}', 'BookSeriesAPIController@update');

    // series book routes
    Route::resource('series-books', 'SeriesBookAPIController');
    Route::post('series-books/{series_book}', 'SeriesBookAPIController@update');

    // Membership Plans
    Route::resource('membership-plans', 'MembershipPlanAPIController');

    // Issue Book
    Route::post('books/{book_item}/issue-book', 'IssuedBookAPIController@issueBook');
    // Reserve Book
    Route::post('books/{book_item}/reserve-book', 'IssuedBookAPIController@reserveBook');
    // Return Book
    Route::post('books/{book_item}/return-book', 'IssuedBookAPIController@returnBook');
    // books history
    Route::get('members/{member}/books-history', 'IssuedBookAPIController@memberBooksHistory');
    // get books history for admin users
    Route::get('books-history', 'IssuedBookAPIController@index');
    // Get available books
    Route::get('books/{book}/available-books', 'BookItemAPIController@availableBooks');

    /** Get App Config */
    Route::get('config', 'AuthAPIController@getAppConfig');

    // Settings
    Route::resource('settings', 'SettingAPIController');
    Route::post('settings/{setting}', 'SettingAPIController@update');
});

Route::post('members/login', 'MemberAuthController@login');
Route::post('members/register', 'MemberAuthController@register');
Route::get('members/activate', 'MemberAuthController@verifyAccount');

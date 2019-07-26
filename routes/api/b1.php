<?php

/**
 * user Auth Middleware
 */
Route::group(['middleware' => 'user.auth'], function () {
    // Genre Routes
    Route::resource('genres', 'GenreAPIController');

    // Author Routes
    Route::middleware('permission:manage_authors')->group(function () {
        Route::resource('authors', 'AuthorAPIController');
    });

    // Publishers Routes
    Route::middleware('permission:manage_publishers')->group(function () {
        Route::resource('publishers', 'PublisherAPIController');
    });

    // Tags Routes
    Route::middleware('permission:manage_tags')->group(function () {
        Route::resource('tags', 'TagAPIController');
    });

    // Book Language Routes
    Route::middleware('permission:manage_book_languages')->group(function () {
        Route::resource('book-languages', 'BookLanguageAPIController');
    });

    Route::middleware('permission:manage_roles')->group(function () {
        // Roles
        Route::resource('roles', 'RoleAPIController');
        Route::post('roles/{role}', 'RoleAPIController@update');

        // Permissions
        Route::resource('permissions', 'PermissionAPIController');
    });

    // Book API Routes
    Route::middleware('permission:manage_books')->group(function () {
        Route::resource('books', 'BookAPIController');
        Route::post('books/{book}', 'BookAPIController@update');
        Route::post('books/{book}/remove-image', 'BookAPIController@removeImage');

        // add book items
        Route::post('books/{book}/items', 'BookAPIController@addItems');
        Route::delete('book-items/{book_item}', 'BookItemAPIController@destroy');
        // Get available books
        Route::get('books/{book}/available-books', 'BookItemAPIController@availableBooks');
    });

    // Book search
    Route::get('search-books', 'BookItemAPIController@searchBooks');

    // Users
    Route::middleware('permission:manage_users')->group(function () {
        Route::resource('users', 'UserAPIController');
        Route::post('users/{user}', 'UserAPIController@update');
        Route::post('users/{user}/remove-image', 'UserAPIController@removeImage');
        Route::get('users/{user}/update-status', 'UserAPIController@updateStatus');
    });

    // get logged in user details
    Route::get('user-details', 'UserAPIController@getLoggedInUserDetails');

    // update logged in user profile
    Route::post('update-user-profile', 'UserAPIController@updateUserProfile');

    // Members
    Route::middleware('permission:manage_members')->group(function () {
        Route::delete('members/{member}', 'MemberAPIController@destroy');
    });
    Route::post('members', 'MemberAPIController@store');
    Route::post('members/{member}', 'MemberAPIController@update')->where('member', '\d+');
    Route::get('members', 'MemberAPIController@index');
    Route::get('members/{member}', 'MemberAPIController@show')->where('member', '\d+');
    Route::get('members/{member}/update-status', 'MemberAPIController@updateStatus');
    Route::post('members/{member}/remove-image', 'MemberAPIController@removeImage');

    Route::middleware('permission:manage_book_series')->group(function () {
        // book series routes
        Route::resource('book-series', 'BookSeriesAPIController');
        Route::post('book-series/{book_series}', 'BookSeriesAPIController@update');

        // series book routes
        Route::resource('series-books', 'SeriesBookAPIController');
        Route::post('series-books/{series_book}', 'SeriesBookAPIController@update');
    });

    Route::middleware('permission:manage_finance')->group(function () {
        // Membership Plans
        Route::resource('membership-plans', 'MembershipPlanAPIController');
    });

    // Reserve Book
    Route::post('books/{book_item}/reserve-book', 'IssuedBookAPIController@reserveBook');
    // Un-Reserve Book
    Route::post('books/{book_item}/un-reserve-book', 'IssuedBookAPIController@unReserveBook');

    // books history
    Route::get('members/{member}/books-history', 'IssuedBookAPIController@memberBooksHistory');

    Route::middleware('permission:issue_books')->group(function () {
        // Issue Book
        Route::post('books/{book_item}/issue-book', 'IssuedBookAPIController@issueBook');
        // Return Book
        Route::post('books/{book_item}/return-book', 'IssuedBookAPIController@returnBook');

        // get books history for admin users
        Route::get('books-history', 'IssuedBookAPIController@index');
        Route::get('issued-books/{issued_book}', 'IssuedBookAPIController@show');
    });

    /** Get App Config */
    Route::get('config', 'AuthAPIController@getAppConfig');

    Route::middleware('permission:manage_settings')->group(function () {
        // Settings
        Route::resource('settings', 'SettingAPIController');
        Route::post('settings/{setting}', 'SettingAPIController@update');
    });

    // Countries
    Route::get('countries', 'CountryAPIController@index');

    // Currencies
    Route::get('currencies', 'CommonAPIController@currencies');
});

/** Password Reset API's For User */
Route::post('send-reset-password-link', 'AccountAPIController@sendResetPasswordLink');
Route::post('reset-password', 'AccountAPIController@resetPassword');
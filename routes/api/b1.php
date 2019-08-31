<?php

/**
 * user Auth Middleware
 */
Route::group(['middleware' => 'user.auth'], function () {
    // Genre Routes
    Route::middleware('permission:manage_genres')->group(function () {
        Route::resource('genres', 'GenreAPIController');
    });

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
        Route::post('books/{book}/items', 'BookAPIController@addItems')->name('books.add-items');
        //        Route::delete('book-items/{book_item}', 'BookItemAPIController@destroy');
        // Get available books
        Route::get('books/{book}/available-books', 'BookItemAPIController@availableBooks')
            ->name('books.available-books');

        // Update book status
        Route::put('books/{book_item}/update-book-status', 'BookItemAPIController@updateBookStatus')
            ->name('books.update-book-status');
    });
    // Get book details from third-party api
    Route::get('get-book-details', 'BookAPIController@getBookDetails');

    // Book search
    Route::get('search-books', 'BookItemAPIController@searchBooks')->name('books.search-books');

    // Users
    Route::middleware('permission:manage_users')->group(function () {
        Route::resource('users', 'UserAPIController');
        Route::post('users/{user}', 'UserAPIController@update');
        Route::post('users/{user}/remove-image', 'UserAPIController@removeImage');
        Route::get('users/{user}/update-status', 'UserAPIController@updateStatus')->name('users.update-status');
    });

    // get logged in user details
    Route::get('user-details', 'UserAPIController@getLoggedInUserDetails')->name('users.user-details');

    // update logged in user profile
    Route::post('update-user-profile', 'UserAPIController@updateUserProfile')->name('users.update-user-profile');

    // Members
    Route::middleware('permission:manage_members')->group(function () {
        Route::delete('members/{member}', 'MemberAPIController@destroy')->name('members.destroy');
    });
    Route::resource('members', 'MemberAPIController');
    Route::post('members/{member}', 'MemberAPIController@update');

    Route::get('members/{member}/update-status', 'MemberAPIController@updateStatus')->name('members.update-status');
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
    Route::post('books/{book_item}/reserve-book', 'IssuedBookAPIController@reserveBook')->name('reserve-book');
    // Un-Reserve Book
    Route::post('books/{book_item}/un-reserve-book', 'IssuedBookAPIController@unReserveBook')->name('un-reserve-book');

    // Update issued book status
    Route::put('books/{book_item}/update-issued-book-status', 'IssuedBookAPIController@updateIssuedBookStatus')
        ->name('update-issued-book-status');

    // books history
    Route::get('members/{member}/books-history',
        'IssuedBookAPIController@memberBooksHistory')->name('members.book-history');

    Route::middleware('permission:issue_books')->group(function () {
        // Issue Book
        Route::post('books/{book_item}/issue-book', 'IssuedBookAPIController@issueBook')->name('issue-book');
        // Return Book
        Route::post('books/{book_item}/return-book', 'IssuedBookAPIController@returnBook')->name('return-book');

        // get books history for admin users
        Route::get('books-history', 'IssuedBookAPIController@index')->name('books-history');
        Route::get('issued-books/{issued_book}', 'IssuedBookAPIController@show')->name('issued-book.show');
    });

    /** Get App Config */
    Route::get('config', 'AuthAPIController@getAppConfig')->name('config');

    Route::middleware('permission:manage_settings')->group(function () {
        // Settings
        Route::resource('settings', 'SettingAPIController');
        Route::post('settings/{setting}', 'SettingAPIController@update');
        // Upload library logo
        Route::post('upload-logo', 'SettingAPIController@uploadLogo')->name('upload-logo');
    });

    // Countries
    Route::get('countries', 'CountryAPIController@index')->name('countries.index');

    // Currencies
    Route::get('currencies', 'CommonAPIController@currencies')->name('currencies');
});

/** Password Reset API's For User */
Route::post('send-reset-password-link', 'AccountAPIController@sendResetPasswordLink');
Route::post('reset-password', 'AccountAPIController@resetPassword')->name('reset-password');
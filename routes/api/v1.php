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
    Route::post('books/{id}', 'BookAPIController@update');

    // add book items
    Route::post('books/{book_id}/items', 'BookAPIController@addItems');

    // Users
    Route::resource('users', 'UserAPIController');
    Route::post('users/{user_id}', 'UserAPIController@update');


    // Members
    Route::resource('members', 'MemberAPIController');
    Route::post('members/{member_id}', 'MemberAPIController@update');

    // book series routes
    Route::resource('book-series', 'BookSeriesAPIController');
    Route::post('book-series/{id}', 'BookSeriesAPIController@update');

    // series book routes
    Route::resource('series-books', 'SeriesBookAPIController');
    Route::post('series-books/{id}', 'SeriesBookAPIController@update');

    // Membership Plans
    Route::resource('membership-plans', 'MembershipPlanAPIController');

    // Issue Book
    Route::post('books/{book_item_id}/issue-book', 'IssuedBookAPIController@issueBook');
    // Reserve Book
    Route::post('books/{book_item_id}/reserve-book', 'IssuedBookAPIController@reserveBook');
    // Return Book
    Route::post('books/{book_item_id}/return-book', 'IssuedBookAPIController@returnBook');
    // books history
    Route::get('members/{member_id}/books-history', 'IssuedBookAPIController@memberBooksHistory');
    // get books history for admin users
    Route::get('books-history', 'IssuedBookAPIController@index');
});

Route::post('members/login', 'MemberAuthController@login');
Route::post('members/register', 'MemberAuthController@register');
Route::get('members/activate', 'MemberAuthController@verifyAccount');

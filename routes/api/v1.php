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

    // Membership Plans
    Route::resource('membership-plans', 'MembershipPlanAPIController');

    // Members
    Route::resource('members', 'MemberAPIController');
    Route::post('members/{member_id}', 'MemberAPIController@update');

    // Issue Book
    Route::post('books/{book_id}/issue-book', 'IssuedBookAPIController@issueBook');
    // Reserve Book
    Route::post('books/{book_id}/reserve-book', 'IssuedBookAPIController@reserveBook');
    // Return Book
    Route::post('books/{book_id}/return-book', 'IssuedBookAPIController@returnBook');
    // books history
    Route::get('members/{member_id}/books-history', 'IssuedBookAPIController@memberBooksHistory');
    // get books history for admin users
    Route::get('books-history', 'IssuedBookAPIController@index');
});

<?php

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

// Users
Route::resource('users', 'UserAPIController');
Route::post('users/{user_id}', 'UserAPIController@update');

// Membership Plans
Route::resource('membership-plans', 'MembershipPlanAPIController');

// Members
Route::resource('members', 'MemberAPIController');
Route::post('members/{member_id}', 'MemberAPIController@update');

// book series routes
Route::resource('book_series', 'BookSeriesAPIController');

// series book routes
Route::post('series-books', 'BookSeriesAPIController@addSeriesBook');
Route::delete('series-books/{series_book_id}','BookSeriesAPIController@deleteSeriesBook');

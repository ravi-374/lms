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

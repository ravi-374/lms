<?php

// Genre Routes
Route::resource('genres', 'GenreAPIController');

// Author Routes
Route::resource('authors', 'AuthorAPIController');

// Publishers Routes
Route::resource('publishers', 'PublisherAPIController');

// Tags Routes
Route::resource('tags', 'TagAPIController');

// Roles
Route::resource('roles', 'RoleAPIController');

// Permissions
Route::resource('permissions', 'PermissionAPIController');
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Book;
use Faker\Generator as Faker;

$factory->define(App\Models\Book::class, function (Faker $faker) {

    return [
        'name' => $faker->name,
        'description' => $faker->sentence,
        'published_on' => $faker->dateTime,
        'url' => $faker->url,
        'is_featured' => $faker->boolean,
    ];
});

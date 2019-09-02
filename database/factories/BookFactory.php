<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(App\Models\Book::class, function (Faker $faker) {

    return [
        'name'         => $faker->name,
        'description'  => $faker->sentence,
        'url'          => $faker->url,
        'isbn'         => $faker->isbn10,
        'is_featured'  => $faker->boolean,
    ];
});

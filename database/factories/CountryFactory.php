<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(\App\Models\Country::class, function (Faker $faker) {

    return [
        'code' => $faker->unique()->randomAscii,
        'name' => $faker->unique()->word,
    ];
});
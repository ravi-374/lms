<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\BookSeries;
use Faker\Generator as Faker;

$factory->define(BookSeries::class, function (Faker $faker) {

    return [
        'title' => $faker->unique()->name,
    ];
});
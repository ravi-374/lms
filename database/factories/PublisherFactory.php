<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Publisher;
use Faker\Generator as Faker;

$factory->define(Publisher::class, function (Faker $faker) {

    return [
        'name' => $faker->name,
    ];
});

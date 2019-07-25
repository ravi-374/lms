<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\BookLanguage;
use Faker\Generator as Faker;

$factory->define(BookLanguage::class, function (Faker $faker) {

    return [
        'language_name' => $faker->name,
        'language_code' => $faker->word,
    ];
});

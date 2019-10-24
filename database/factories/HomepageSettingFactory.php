<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\HomepageSetting;
use Faker\Generator as Faker;

$factory->define(HomepageSetting::class, function (Faker $faker) {
    return [
        'key'          => $faker->unique()->name,
        'value'        => $faker->word,
        'display_name' => $faker->word,
    ];
});
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
$factory->define(\App\Models\Setting::class, function (Faker $faker) {
    return [
        'key'          => $faker->unique()->name,
        'value'        => $faker->word,
        'display_name' => $faker->word,
    ];
});

<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(\App\Models\Address::class, function (Faker $faker) {

    return [
        'address_1'  => $faker->address,
        'city'       => $faker->city,
        'state'      => $faker->country,
        'country_id' => $faker->randomDigitNotNull,
    ];
});

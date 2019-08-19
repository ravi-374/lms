<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;

$factory->define(\App\Models\Address::class, function (Faker $faker) {

    return [
        'address_1'  => $faker->address,
        'owner_id'   => $faker->randomDigit,
        'owner_type' => $faker->word,
        'city'       => $faker->city,
        'state'      => $faker->country,
        'country_id' => $faker->randomDigitNotNull,
        'zip'        => $faker->postcode,
    ];
});
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\MembershipPlan;
use Faker\Generator as Faker;

$factory->define(MembershipPlan::class, function (Faker $faker) {

    return [
        'name'        => $faker->name,
        'price'       => $faker->word,
        'frequency'   => MembershipPlan::MONTHLY_FREQUENCY,
        'description' => $faker->text,
    ];
});

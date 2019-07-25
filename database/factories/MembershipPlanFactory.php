<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\MembershipPlan;
use Faker\Generator as Faker;

$factory->define(MembershipPlan::class, function (Faker $faker) {

    return [
        'name'           => $faker->name,
        'description'    => $faker->sentence,
        'slug'           => $faker->word,
        'stripe_plan_id' => $faker->uuid,
    ];
});

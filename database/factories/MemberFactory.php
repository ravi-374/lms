<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Member;
use App\Models\MembershipPlan;
use Faker\Generator as Faker;

$factory->define(Member::class, function (Faker $faker) {
    $membershipPlan = factory(MembershipPlan::class)->create();

    return [
        'member_id'          => $faker->unique()->uuid,
        'first_name'         => $faker->firstName,
        'last_name'          => $faker->lastName,
        'email'              => $faker->unique()->safeEmail,
        'password'           => $faker->password(8), // password
        'membership_plan_id' => $membershipPlan->id,
        'phone'              => $faker->phoneNumber,
    ];
});

<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Member;
use App\Models\MembershipPlan;
use Faker\Generator as Faker;

$factory->define(Member::class, function (Faker $faker) {
    $membershipPlan = factory(MembershipPlan::class)->create();

    return [
        'member_id' => $faker->unique()->uuid,
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'membership_plan_id' => $membershipPlan->id,
        'phone' => $faker->phoneNumber,
    ];
});

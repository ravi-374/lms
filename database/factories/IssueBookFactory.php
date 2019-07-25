<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\User;
use Faker\Generator as Faker;

$factory->define(IssuedBook::class, function (Faker $faker) {
    $bookItem = factory(BookItem::class)->create();
    $member = factory(Member::class)->create();
    $user = factory(User::class)->create();
    return [
        'book_item_id' => $bookItem->id,
        'member_id' => $member->id,
        'reserve_date' => $faker->dateTime,
        'issued_on' => $faker->dateTime,
        'return_due_date' => $faker->dateTime,
        'note' => $faker->sentence,
        'return_date' => $faker->dateTime,
        'status' => $faker->dateTime,
        'issuer_id' => $user->id,
        'returner_id' => $user->id,
    ];
});

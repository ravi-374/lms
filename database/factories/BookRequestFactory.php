<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\BookItem;
use App\Models\BookRequest;
use App\Models\Member;
use Faker\Generator as Faker;

$factory->define(BookRequest::class, function (Faker $faker) {
    $member = factory(Member::class)->create();

    return [
        'member_id' => $member->id,
        'book_name' => $faker->unique()->name,
        'isbn'      => $faker->unique()->isbn10,
        'edition'   => $faker->word,
        'format'    => BookItem::FORMAT_PAPERBACK,
        'status'    => BookRequest::PENDING,
    ];
});
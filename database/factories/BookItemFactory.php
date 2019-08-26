<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Book;
use App\Models\BookItem;
use App\Models\BookLanguage;
use App\Models\Publisher;
use Faker\Generator as Faker;

$factory->define(BookItem::class, function (Faker $faker) {
    $book = factory(Book::class)->create();
    $bookLanguage = factory(BookLanguage::class)->create();
    $publisher = factory(Publisher::class)->create();

    return [
        'book_id'      => $book->id,
        'book_code'    => Str::random(8),
        'price'        => $faker->randomDigitNotNull,
        'language_id'  => $bookLanguage->id,
        'publisher_id' => $publisher->id,
        'format'       => BookItem::FORMAT_PAPERBACK,
        'status'       => BookItem::STATUS_AVAILABLE,
        'edition'      => $faker->randomDigitNotNull,
    ];
});

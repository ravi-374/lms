<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\BookItem;
use App\Models\Book;
use App\Models\BookLanguage;
use App\Models\Publisher;

use Faker\Generator as Faker;

$factory->define(BookItem::class, function (Faker $faker) {
    $book = factory(Book::class)->create();
    $bookLanguage = factory(BookLanguage::class)->create();
    $publisher = factory(Publisher::class)->create();

    return [
        'book_id' => $book->id,
        'book_code' => $faker->unique()->word,
        'price' => $faker->word,
        'language_id' => $bookLanguage->id,
        'publisher_id' => $publisher->id,
    ];
});

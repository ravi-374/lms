<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\BookSeries;
use App\Models\SeriesBook;
use Faker\Generator as Faker;

$factory->define(SeriesBook::class, function (Faker $faker) {

    $book = factory(\App\Models\Book::class)->create();
    $bookSeries = factory(BookSeries::class)->create();

    return [
        'book_id'   => $book->id,
        'series_id' => $bookSeries->id,
        'sequence'  => $faker->unique()->randomDigit,
    ];
});

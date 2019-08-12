<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookSeries;
use App\Models\SeriesBook;
use App\Repositories\SeriesBookRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class SeriesBookRepositoryTest.
 */
class SeriesBookRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var SeriesBookRepository */
    protected $seriesBookRepo;

    private $defaultUserId = 1;

    public function setUp(): void
    {
        parent::setUp();

        $this->seriesBookRepo = app(SeriesBookRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_create_series_book_items()
    {
        $bookSeries = factory(BookSeries::class)->create();
        $fakeSeriesBook = factory(SeriesBook::class)->make()->toArray();

        $createSeriesBook = $this->seriesBookRepo->createOrUpdateSeriesItems($bookSeries, $fakeSeriesBook);

        $this->assertEquals($bookSeries['book_id'], $createSeriesBook['book_id']);
    }

    /** @test */
    public function test_can_not_create_series_book_when_sequence_is_duplicate()
    {
        $bookSeries = factory(BookSeries::class)->create([
            'title' => $this->faker->unique()->word,
        ]);
        $book = factory(Book::class)->create([
            'name' => $this->faker->unique()->name,
            'isbn' => $this->faker->unique()->isbn10,
        ]);
        $inputs = factory(SeriesBook::class)->make([
            'series_id' => $bookSeries->id,
            'book_id'   => $book->id,
            'sequence'  => 1,
        ])->toArray();
        $inputs = factory(SeriesBook::class)->make([
            'series_id' => $bookSeries->id,
            'book_id'   => $book->id,
            'sequence'  => 1,
        ])->toArray();

        $response = $this->seriesBookRepo->validateSeriesItems($inputs);

        $this->assertTrue($response, 'Sequence is duplicated');
    }

    /** @test */
    public function test_can_not_create_series_book_when_book_is_not_passed()
    {
        $bookSeries = factory(BookSeries::class)->make([
            'title' => $this->faker->unique()->word,
        ]);
        $inputs[] = factory(SeriesBook::class)->make([
            'series_id' => $bookSeries->id,
            'sequence'  => 1,
        ])->toArray();
        $inputs[] = factory(SeriesBook::class)->make([
            'series_id' => $bookSeries->id,
            'sequence'  => 2,
        ])->toArray();

        $response = $this->seriesBookRepo->validateSeriesItems($inputs);

        $this->assertTrue($response, 'Book is required');
    }

    /** @test */
    public function test_can_not_create_series_book_when_sequence_is_not_passed()
    {
        $bookSeries = factory(BookSeries::class)->create([
            'title' => $this->faker->unique()->word,
        ]);
        $book = factory(Book::class)->create([
            'name' => $this->faker->unique()->name,
            'isbn' => $this->faker->unique()->isbn10,
        ]);
        $inputs[] = factory(SeriesBook::class)->make([
            'series_id' => $bookSeries->id,
            'book_id'   => $book->id,
            'sequence'  => 1,
        ])->toArray();
        $input[] = factory(SeriesBook::class)->make([
            'series_id' => $bookSeries->id,
            'book_id'   => $book->id,
        ])->toArray();

        $response = $this->seriesBookRepo->validateSeriesItems($input);

        $this->assertTrue($response, 'Sequence is required');
    }
}
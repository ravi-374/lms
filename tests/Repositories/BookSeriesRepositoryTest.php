<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookSeries;
use App\Models\SeriesBook;
use App\Repositories\BookSeriesRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookSeriesRepositoryTest.
 */
class BookSeriesRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var BookSeriesRepository */
    protected $bookSeriesRepo;

    private $defaultUserId = 1;

    public function setUp(): void
    {
        parent::setUp();

        $this->bookSeriesRepo = app(BookSeriesRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_book_series()
    {
        /** @var BookSeries[] $bookSeries */
        $bookSeries = factory(BookSeries::class, 5)->create();

        $allBookSeries = $this->bookSeriesRepo->all();
        $take3 = $this->bookSeriesRepo->all([], null, 3);
        $skip2 = $this->bookSeriesRepo->all([], 4, 4);

        $this->assertCount(5, $allBookSeries);
        $this->assertCount(3, $take3);
        $this->assertCount(1, $skip2);
    }

    /** @test
     */
    public function it_can_store_book_series()
    {
        $fakeBookSeries = factory(BookSeries::class)->raw();

        $bookResult = $this->bookSeriesRepo->store($fakeBookSeries);

        $this->assertArrayHasKey('id', $bookResult);
        $this->assertEquals($fakeBookSeries['title'], $bookResult->title);
    }

    /** @test */
    public function it_can_update_book_series()
    {
        $bookSeries = factory(BookSeries::class)->create();
        $fakeBookSeries = factory(BookSeries::class)->raw();

        $bookSeries = $this->bookSeriesRepo->update($fakeBookSeries, $bookSeries->id);

        $this->assertArrayHasKey('id', $bookSeries);
        $this->assertEquals($fakeBookSeries['title'], $bookSeries->title);
    }

    /** @test */
    public function test_can_create_book_series_with_series_items()
    {
        /** @var Book $book */
        $book = factory(Book::class)->create();
        $fakeBookSeries = factory(BookSeries::class)->raw();

        $fakeBookSeries['series_items'][] = ['book_id' => $book->id, 'sequence' => 1];
        $fakeBookSeries['series_items'][] = ['book_id' => $book->id, 'sequence' => 2];

        $bookSeries = $this->bookSeriesRepo->store($fakeBookSeries);

        $this->assertArrayHasKey('id', $bookSeries);
        $this->assertCount(2, $bookSeries->seriesItems);
    }

    /** @test */
    public function test_can_update_book_series_with_series_items()
    {
        $bookSeries = factory(BookSeries::class)->create()->toArray();
        $seriesItem = factory(SeriesBook::class)->create(['series_id' => $bookSeries['id']])->toArray();
        $bookSeries['series_items'][] = array_merge($seriesItem, ['sequence' => 5]);

        $bookSeries = $this->bookSeriesRepo->update($bookSeries, $bookSeries['id']);
        $this->assertArrayHasKey('id', $bookSeries);
        $this->assertCount(1, $bookSeries->seriesItems);
        $this->assertEquals(5, $bookSeries->seriesItems[0]->sequence);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage BookSeries not found.
     */
    public function test_not_allow_to_update_non_existing_book_series()
    {
        $bookSeries = factory(BookSeries::class)->raw();

        $this->bookSeriesRepo->update($bookSeries, 999);
    }
}

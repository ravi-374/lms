<?php

namespace Tests\Controllers;

use App\Models\BookSeries;
use App\Models\SeriesBook;
use App\Repositories\BookSeriesRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class BookSeriesAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $bookSeriesRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->bookSeriesRepo = \Mockery::mock(BookSeriesRepository::class);
        app()->instance(BookSeriesRepository::class, $this->bookSeriesRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_book_series()
    {
        $this->mockRepository();

        /** @var BookSeries $bookSeries */
        $bookSeries = factory(BookSeries::class)->times(5)->create();

        $this->bookSeriesRepo->shouldReceive('all')
            ->once()
            ->andReturn($bookSeries);

        $response = $this->getJson('api/b1/book-series');

        $this->assertSuccessDataResponse(
            $response,
            $bookSeries->toArray(),
            'Book Series retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_store_book_series()
    {
        $this->mockRepository();

        /** @var BookSeries $bookSeries */
        $bookSeries = factory(BookSeries::class)->make();

        $this->bookSeriesRepo->shouldReceive('store')
            ->once()
            ->with($bookSeries->toArray())
            ->andReturn($bookSeries);

        $response = $this->postJson('api/b1/book-series', $bookSeries->toArray());

        $this->assertSuccessDataResponse($response, $bookSeries->toArray(), 'Book Series saved successfully.');
    }

    /** @test */
    public function it_can_update_book_series()
    {
        $this->mockRepository();

        /** @var BookSeries $bookSeries */
        $bookSeries = factory(BookSeries::class)->create();
        $fakeBookSeries = factory(BookSeries::class)->make(['id' => $bookSeries->id]);

        $this->bookSeriesRepo->shouldReceive('update')
            ->once()
            ->with($fakeBookSeries->toArray(), $bookSeries->id)
            ->andReturn($fakeBookSeries);

        $response = $this->putJson('api/b1/book-series/'.$bookSeries->id, $fakeBookSeries->toArray());

        $this->assertSuccessDataResponse($response, $fakeBookSeries->toArray(),
            'Book Series updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_book_series_with_series_book_items()
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = factory(BookSeries::class)->create();

        $seriesBook = factory(SeriesBook::class)->create(['series_id' => $bookSeries->id]);

        $response = $this->getJson('api/b1/book-series/'.$bookSeries->id);

        $this->assertSuccessDataResponse($response, $bookSeries->toArray(), 'Book Series retrieved successfully.');

        $this->assertEquals($seriesBook->id, $response->original['data']['series_items'][0]['id']);
    }

    /** @test */
    public function it_can_delete_book_series()
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = factory(BookSeries::class)->create();

        $response = $this->deleteJson("api/b1/book-series/$bookSeries->id");

        $this->assertSuccessDataResponse($response, $bookSeries->toArray(), 'Book Series deleted successfully.');
        $this->assertEmpty(BookSeries::find($bookSeries->id));
    }
}
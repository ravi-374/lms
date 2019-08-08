<?php

namespace Tests\Repositories;

use App\Models\BookSeries;
use App\Models\SeriesBook;
use App\Repositories\BookSeriesRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookStoreRepositoryTest.
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
        /** @var BookSeries $bookSeries */
        $bookSeries = factory(BookSeries::class)->times(2)->create();

        $seriesBook = factory(SeriesBook::class)->create();

        $bookSeries[0]->seriesItems()->save($seriesBook);
        $bookSeries[1]->seriesItems()->save($seriesBook);

        $bookSeriesList = $this->bookSeriesRepo->all([]);

        $this->assertEquals($bookSeries[0]->id, $bookSeriesList[1]->id);
        $this->assertEquals($bookSeries[1]->id, $bookSeriesList[0]->id);

        $this->assertNotEmpty($bookSeriesList[0]->sequence);
    }


    /** @test
     */
    public function it_can_store_book_series()
    {
        $input = [
            'title' => $this->faker->word,
        ];

        $bookResult = $this->bookSeriesRepo->store($input)->toArray();

        $this->assertArrayHasKey('id', $bookResult);
        $this->assertEquals($input['title'], $bookResult['title']);
    }

    /** @test */
    public function it_can_update_book_series()
    {
        $bookSeries = factory(BookSeries::class)->create();
        $inputs = [
            'title' => $this->faker->word,
        ];

        $bookSeries = $this->bookSeriesRepo->update($inputs, $bookSeries->id)->toArray();

        $this->assertArrayHasKey('id', $bookSeries);
        $this->assertEquals($inputs['title'], $bookSeries['title']);
    }
}

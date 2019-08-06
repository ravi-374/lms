<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookLanguage;
use App\Models\BookSeries;
use App\Models\Publisher;
use App\Repositories\BookRepository;
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

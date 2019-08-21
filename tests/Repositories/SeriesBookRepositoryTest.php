<?php

namespace Tests\Repositories;

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
        $fakeSeriesBook[] = factory(SeriesBook::class)->raw();
        $fakeSeriesBook[] = factory(SeriesBook::class)->raw();

        $createSeriesBook = $this->seriesBookRepo->createOrUpdateSeriesItems($bookSeries, $fakeSeriesBook);

        $this->assertArrayHasKey('id', $bookSeries);
        $this->assertCount(2, $bookSeries->fresh()->seriesItems);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Sequence is duplicated
     */
    public function test_can_not_create_series_book_item_when_sequence_is_duplicate()
    {
        $inputs[] = factory(SeriesBook::class)->raw(['sequence' => 1]);
        $inputs[] = factory(SeriesBook::class)->raw(['sequence' => 1]);

        $this->seriesBookRepo->validateSeriesItems($inputs);
    }

    /**
     * @test
     * @expectedException App\Exceptions\MissingPropertyException
     * @expectedExceptionMessage Book is required.
     */
    public function test_can_not_create_series_book_when_book_is_not_passed()
    {
        $inputs[] = factory(SeriesBook::class)->make(['book_id' => null])->toArray();

        $this->seriesBookRepo->validateSeriesItems($inputs);
    }

    /**
     * @test
     * @expectedException App\Exceptions\MissingPropertyException
     * @expectedExceptionMessage Sequence is required.
     */
    public function test_can_not_create_series_book_when_sequence_is_not_passed()
    {
        $inputs[] = factory(SeriesBook::class)->raw(['sequence' => null]);

        $this->seriesBookRepo->validateSeriesItems($inputs);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage No query results for model [App\Models\Book] 999
     */
    public function test_can_not_create_series_book_with_non_existing_book()
    {
        $inputs[] = factory(SeriesBook::class)->raw(['book_id' => 999]);

        $this->seriesBookRepo->validateSeriesItems($inputs);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage No query results for model [App\Models\SeriesBook] 999
     */
    public function test_unable_to_update_series_with_non_existing_series_book_id()
    {
        /** @var SeriesBook $seriesBook */
        $seriesBook = factory(SeriesBook::class)->raw();

        $this->seriesBookRepo->update($seriesBook, 999);
    }
}
<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\SeriesBook;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use JWTAuth;
use Tests\TestCase;

/**
 * Class SeriesBookPermissionTest
 * @package Tests\B1\APIs\Permissions
 */
class SeriesBookPermissionTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = factory(User::class)->create();
        $token = JWTAuth::fromUser($this->loggedInUserId);
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_not_allow_to_get_series_book_without_permission()
    {
        $response = $this->getJson(route('api.b1.series-books.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_series_book_without_permission()
    {
        $fakeSeriesBook = factory(SeriesBook::class)->raw();

        $response = $this->postJson(route('api.b1.series-books.store'), $fakeSeriesBook);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_series_book_without_permission()
    {
        $bookSeries = factory(SeriesBook::class)->create();
        $updateSeriesBook = factory(SeriesBook::class)->raw(['id' => $bookSeries->id]);

        $response = $this->putJson(route('api.b1.series-books.update', $bookSeries->id), $updateSeriesBook);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_series_book_without_permission()
    {
        $bookSeries = factory(SeriesBook::class)->create();

        $response = $this->deleteJson(route('api.b1.series-books.destroy', $bookSeries->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_series_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $response = $this->getJson(route('api.b1.series-books.index'));

        $this->assertSuccessMessageResponse($response, 'Series Book retrieved successfully.');
    }

    /** @test */
    public function test_can_create_series_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $fakeSeriesBook = factory(SeriesBook::class)->raw();

        $response = $this->postJson(route('api.b1.series-books.store'), $fakeSeriesBook);

        $this->assertSuccessMessageResponse($response, 'Series Book saved successfully.');
    }

    /** @test */
    public function test_can_update_series_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $bookSeries = factory(SeriesBook::class)->create();
        $updateSeriesBook = factory(SeriesBook::class)->raw(['id' => $bookSeries->id]);

        $response = $this->putJson(route('api.b1.series-books.update', $bookSeries->id), $updateSeriesBook);

        $this->assertSuccessMessageResponse($response, 'Series Book updated successfully.');
    }

    /** @test */
    public function test_can_delete_series_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $bookSeries = factory(SeriesBook::class)->create();

        $response = $this->deleteJson(route('api.b1.series-books.destroy', $bookSeries->id));

        $this->assertSuccessMessageResponse($response, 'Series Book deleted successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_series_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $bookSeries = factory(SeriesBook::class)->create();

        $response = $this->getJson(route('api.b1.series-books.show', $bookSeries->id));

        $this->assertSuccessMessageResponse($response, 'Series Book retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_series_book_without_permission()
    {
        $bookSeries = factory(SeriesBook::class)->create();

        $response = $this->get(route('api.b1.series-books.show', $bookSeries->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
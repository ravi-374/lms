<?php

namespace Tests\Controllers\Validations;

use App\Models\BookSeries;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BookSeriesAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_book_series_fails_when_title_is_not_passed()
    {
        $response = $this->postJson('api/b1/book-series', ['title' => '']);

        $this->assertExceptionMessage($response, 'The title field is required.');
    }

    /** @test */
    public function test_create_book_series_fails_when_title_is_duplicate()
    {
        $bookSeries = factory(BookSeries::class)->create();

        $response = $this->postJson('api/b1/book-series/', ['title' => $bookSeries->title]);

        $this->assertExceptionMessage($response, 'The title has already been taken.');
    }

    /** @test */
    public function test_update_book_series_fails_when_title_is_not_passed()
    {
        $bookSeries = factory(BookSeries::class)->create();

        $response = $this->putJson('api/b1/book-series/'.$bookSeries->id, ['title' => '']);

        $this->assertExceptionMessage($response, 'The title field is required.');
    }

    /** @test */
    public function it_can_store_book_series()
    {
        $fakeBookSeries = factory(BookSeries::class)->raw();
        $response = $this->postJson('api/b1/book-series', $fakeBookSeries);

        $this->assertSuccessMessageResponse($response, 'Book Series saved successfully.');
        $this->assertNotEmpty(BookSeries::where('title', $fakeBookSeries['title'])->first());
    }

    /** @test */
    public function it_can_update_book_series()
    {
        $bookSeries = factory(BookSeries::class)->create();
        $fakeBookSeries = factory(BookSeries::class)->raw();

        $response = $this->putJson('api/b1/book-series/'.$bookSeries->id, $fakeBookSeries);

        $this->assertSuccessMessageResponse($response, 'Book Series updated successfully.');
        $this->assertEquals($fakeBookSeries['title'], $bookSeries->fresh()->title);
    }

    /** @test */
    public function it_can_delete_book_series()
    {
        $bookSeries = factory(BookSeries::class)->create();

        $response = $this->deleteJson('api/b1/book-series/'.$bookSeries->id);

        $this->assertSuccessMessageResponse($response, 'Book Series deleted successfully.');
        $this->assertEmpty(BookSeries::where('title', $bookSeries->title)->first());
    }
}
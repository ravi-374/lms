<?php

namespace Tests\Controllers;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Repositories\BookItemRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class BookItemAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $bookItemRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->bookItemRepo = \Mockery::mock(BookItemRepository::class);
        app()->instance(BookItemRepository::class, $this->bookItemRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_available_books()
    {
        $this->mockRepository();

        $bookItem = factory(BookItem::class)->create();
        $reserveBook = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem->id,
            'status'       => IssuedBook::STATUS_RESERVED,
        ]);

        $this->bookItemRepo->shouldReceive('all')
            ->once()
            ->andReturn($bookItem);

        $response = $this->getJson(
            "api/b1/books/$bookItem->book_id/available-books?member_id=$reserveBook->member_id"
        );

        $this->assertSuccessMessageResponse(
            $response, 'Books history retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_books()
    {
        $this->mockRepository();

        $bookItems = factory(BookItem::class)->times(5)->create();

        $this->bookItemRepo->shouldReceive('searchBooks')
            ->once()
            ->andReturn(collect($bookItems));

        $response = $this->getJson("api/b1/search-books");

        $this->assertSuccessDataResponse(
            $response, $bookItems->toArray(), 'BookItem retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_update_book_item_status()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $response = $this->putJson("api/b1/books/$bookItem->id/update-book-status", [
            'status' => BookItem::STATUS_DAMAGED,
        ]);

        $this->assertSuccessDataResponse(
            $response, $bookItem->fresh()->toArray(), 'Book status updated successfully.'
        );
        $this->assertEquals(BookItem::STATUS_DAMAGED, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_unable_to_update_invalid_book_item_status()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $response = $this->putJson("api/b1/books/$bookItem->id/update-book-status", [
            'status' => 10,
        ]);

        $this->assertExceptionMessage($response, 'Invalid status.');
    }
}
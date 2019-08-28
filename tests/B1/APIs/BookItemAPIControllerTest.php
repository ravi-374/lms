<?php

namespace Tests\B1\APIs;

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

        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $reserveBook = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem->id,
            'status'       => IssuedBook::STATUS_RESERVED,
        ]);

        $this->bookItemRepo->expects('all')->andReturn($bookItem);

        $response = $this->getJson(route('api.b1.books.available-books', $bookItem->book_id), [
            'member_id' => $reserveBook->member_id,
        ]);

        $this->assertSuccessMessageResponse(
            $response, 'Books history retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_books()
    {
        $this->mockRepository();

        /** @var BookItem[] $bookItems */
        $bookItems = factory(BookItem::class)->times(5)->create();

        $this->bookItemRepo->expects('searchBooks')->andReturn(collect($bookItems));

        $response = $this->getJson(route('api.b1.books.search-books'));

        $this->assertSuccessDataResponse(
            $response, $bookItems->toArray(), 'BookItem retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_update_book_item_status()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $response = $this->putJson(route('api.b1.books.update-book-status', $bookItem->id), [
            'status' => BookItem::STATUS_DAMAGED,
        ]);

        $this->assertSuccessDataResponse(
            $response,
            $bookItem->fresh()->toArray(),
            'Book status updated successfully.'
        );
        $this->assertEquals(BookItem::STATUS_DAMAGED, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_unable_to_update_invalid_book_item_status()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $response = $this->putJson(route('api.b1.books.update-book-status', $bookItem->id), [
            'status' => 10,
        ]);

        $this->assertExceptionMessage($response, 'Invalid status.');
    }
}
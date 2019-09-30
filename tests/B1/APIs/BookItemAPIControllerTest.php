<?php

namespace Tests\B1\APIs;

use App\Models\BookItem;
use App\Models\IssuedBook;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class BookItemAPIControllerTest
 */
class BookItemAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_available_books()
    {
        $this->mockRepo(self::$bookItem);

        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $reserveBook = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem->id,
            'status'       => IssuedBook::STATUS_RESERVED,
        ]);

        $this->bookItemRepository->expects('all')->andReturn($bookItem);

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
        $this->mockRepo(self::$bookItem);

        /** @var BookItem $bookItems */
        $bookItems = factory(BookItem::class, 5)->create();

        $this->bookItemRepository->expects('searchBooks')->andReturn(collect($bookItems));

        $response = $this->getJson(route('api.b1.books.search-books'));

        $this->assertSuccessDataResponse(
            $response, $bookItems->toArray(), 'BookItem retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_update_book_item_status()
    {
        /** @var BookItem[] $bookItem */
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

<?php

namespace Tests\V1\Controllers\Validations;

use App\Models\BookItem;
use App\Models\IssuedBook;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class IssuedBookAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    /** @test */
    public function test_can_get_all_book_history()
    {
        $issuedBook = factory(IssuedBook::class)->times(5)->create();

        $response = $this->getJson('api/v1/books-history');

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
        $this->assertCount(5, $response->original['data']);
    }

    /** @test */
    public function test_can_reserve_book()
    {
        $bookItem = factory(BookItem::class)->create();

        $reserveBook = $this->postJson('api/v1/books/'.$bookItem->id.'/reserve-book');

        $this->assertSuccessMessageResponse($reserveBook, 'Book reserved successfully.');
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_can_un_reserve_book()
    {
        $bookItem = factory(BookItem::class)->create();

        $reserveBook = $this->postJson('api/v1/books/'.$bookItem->id.'/reserve-book');
        $unReserveBook = $this->postJson('api/v1/books/'.$bookItem->id.'/un-reserve-book');

        $this->assertSuccessMessageResponse($unReserveBook, 'Book un-reserved successfully.');
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $bookItem->fresh()->status);
    }
}
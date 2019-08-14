<?php

namespace Tests\V1;

use App\Models\BookItem;
use App\Models\IssuedBook;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class IssuedBookAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_book_history()
    {
        $issuedBook = factory(IssuedBook::class)->times(5)->create();

        $response = $this->getJson('api/v1/books-history');

        $this->assertSuccessDataResponse($response, $issuedBook->toArray(), 'Books history retrieved successfully.');
    }

    /** @test */
    public function test_can_reserve_book()
    {
        $issuedBook = factory(IssuedBook::class)->times(5)->create();
        $bookItem = factory(BookItem::class)->create();

        $reserveBook = $this->postJson('api/v1/books/'.$bookItem->id.'/reserve-book');
        $this->assertSuccessDataResponse($reserveBook, $issuedBook->toArray(), 'Book reserved successfully.');
    }

    /** @test */
    public function test_can_un_reserve_book()
    {
        $issuedBook = factory(IssuedBook::class)->times(5)->create();
        $bookItem = factory(BookItem::class)->create();

        $reserveBook = $this->postJson('api/v1/books/'.$bookItem->id.'/un-reserve-book');
        $this->assertSuccessDataResponse($reserveBook, $issuedBook->toArray(), 'Book un-reserved successfully.');
    }
}
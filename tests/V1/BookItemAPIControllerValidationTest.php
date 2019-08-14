<?php

namespace Tests\V1;

use App\Models\BookItem;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class BookItemAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_book_items()
    {
        $bookItems = factory(BookItem::class)->times(5)->create();

        $response = $this->getJson('api/v1/search-books');

        $this->assertSuccessDataResponse($response, $bookItems->toArray(), 'BookItem retrieved successfully.');
    }
}
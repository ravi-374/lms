<?php

namespace Tests\V1\Controllers\Validations;

use App\Models\BookItem;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BookItemAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    /** @test */
    public function test_can_get_search_books()
    {
        $bookItems = factory(BookItem::class)->times(5)->create();

        $response = $this->getJson('api/v1/search-books');

        $this->assertSuccessDataResponse($response, $bookItems->toArray(), 'BookItem retrieved successfully.');
    }
}
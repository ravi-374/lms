<?php

namespace Tests\V1;

use App\Models\Book;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class BookAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_books()
    {
        $books = factory(Book::class)->times(5)->create();

        $response = $this->getJson('api/v1/books');

        $this->assertSuccessDataResponse($response, $books->toArray(), 'Books retrieved successfully.');
    }
}
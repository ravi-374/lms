<?php

namespace Tests\V1\Controllers;

use App\Models\Book;
use App\Repositories\BookRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class BookAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $bookRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->bookRepo = \Mockery::mock(BookRepository::class);
        app()->instance(BookRepository::class, $this->bookRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function it_can_get_all_books()
    {
        $this->mockRepository();

        $books = factory(Book::class)->times(5)->create();

        $this->bookRepo->expects('all')
            ->once()
            ->andReturn($books);

        $response = $this->getJson('api/v1/books');

        $this->assertSuccessDataResponse($response, $books->toArray(), 'Books retrieved successfully.');
    }
}
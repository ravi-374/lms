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

        $this->bookRepo->shouldReceive('all')
            ->once()
            ->andReturn($books);

        $response = $this->getJson('api/v1/books');

        $this->assertSuccessDataResponse($response, $books->toArray(), 'Books retrieved successfully.');
    }

    /** @test */
    public function test_can_get_books()
    {
        /** @var Book $books */
        $books = factory(Book::class)->times(5)->create();

        $response = $this->getJson('api/v1/books');
        $search = $this->getJson('api/v1/books?search='.$books[0]->name);
        $take3 = $this->getJson('api/v1/books?limit=3');
        $skip2 = $this->getJson('api/v1/books?skip=2&limit=2');

        $response = $response->original['data'];
        $this->assertCount(5, $response);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $this->assertCount(1, $search->original['data']);
        $this->assertEquals($books[0]->name, $search->original['data'][0]['name']);
    }
}
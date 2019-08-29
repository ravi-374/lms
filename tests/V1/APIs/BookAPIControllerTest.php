<?php

namespace Tests\V1\APIs;

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
        $this->signInWithMember();
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

        $this->bookRepo->expects('all')->andReturn($books);

        $response = $this->getJson(route('api.v1.books.index'));

        $this->assertSuccessDataResponse($response, $books->toArray(), 'Books retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_books()
    {
        /** @var Book[] $books */
        $books = factory(Book::class)->times(5)->create();

        $response = $this->getJson(route('api.v1.books.index'));
        $take3 = $this->getJson(route('api.v1.books.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.v1.books.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.v1.books.index', ['search='.$books[0]->name]));

        $this->assertCount(5, $response->original['data']);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 5);
    }
}
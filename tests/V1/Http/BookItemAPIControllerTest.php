<?php

namespace Tests\V1\Http;

use App\Models\BookItem;
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
        $this->signInWithMember();
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
    public function it_can_get_all_book_items()
    {
        $this->mockRepository();

        $bookItems = factory(BookItem::class)->times(5)->create();

        $this->bookItemRepo->expects('searchBooks')->andReturn($bookItems);

        $response = $this->getJson('api/v1/search-books');

        $this->assertSuccessDataResponse($response, $bookItems->toArray(), 'BookItem retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_book_items()
    {
        /** @var BookItem[] $bookItems */
        $bookItems = factory(BookItem::class)->times(5)->create();

        $response = $this->getJson('api/v1/search-books');
        $take3 = $this->getJson('api/v1/search-books?limit=3');
        $skip2 = $this->getJson('api/v1/search-books?skip=2&limit=2');
        $searchByBookCode = $this->getJson('api/v1/search-books?search='.$bookItems[0]->book_code);

        $this->assertCount(5, $response->original['data']);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByBookCode->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 5);
    }
}
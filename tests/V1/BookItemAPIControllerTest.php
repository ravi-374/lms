<?php

namespace Tests\V1;

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
        $this->signInWithDefaultAdminUser();
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

        $this->bookItemRepo->shouldReceive('searchBooks')
            ->once()
            ->andReturn($bookItems);

        $response = $this->getJson('api/v1/search-books');

        $this->assertSuccessDataResponse($response, $bookItems->toArray(), 'BookItem retrieved successfully.');
    }
}
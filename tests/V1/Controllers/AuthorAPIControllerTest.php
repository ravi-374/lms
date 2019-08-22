<?php

namespace Tests\V1\Controllers;

use App\Models\Author;
use App\Repositories\AuthorRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class AuthorAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $authorRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->authorRepo = \Mockery::mock(AuthorRepository::class);
        app()->instance(AuthorRepository::class, $this->authorRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function it_can_get_all_authors()
    {
        $this->mockRepository();

        $authors = factory(Author::class)->times(5)->create();

        $this->authorRepo->shouldReceive('all')
            ->once()
            ->andReturn($authors);

        $response = $this->getJson('api/v1/authors');

        $this->assertSuccessDataResponse($response, $authors->toArray(), 'Authors retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_authors()
    {
        /** @var Author[] $authors */
        $authors = factory(Author::class)->times(5)->create();

        $response = $this->getJson('api/v1/authors');
        $searchByName = $this->getJson('api/v1/authors?search='.$authors[0]->first_name);
        $take3 = $this->getJson('api/v1/authors?limit=3');
        $skip2 = $this->getJson('api/v1/authors?skip=2&limit=2');

        $this->assertCount(15, $response->original['data'], '10 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertCount(1, $search);
        $this->assertTrue(count($search) > 0 && count($search) < 5, 'Must return at lease one Author');
    }
}
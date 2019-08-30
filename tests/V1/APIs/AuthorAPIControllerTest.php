<?php

namespace Tests\V1\APIs;

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
        $this->signInWithMember();
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

        /** @var Author[] $authors */
        $authors = factory(Author::class)->times(5)->create();

        $this->authorRepo->expects('all')->andReturn($authors);

        $response = $this->getJson(route('api.v1.authors.index'));

        $this->assertSuccessDataResponse($response, $authors->toArray(), 'Authors retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_authors()
    {
        /** @var Author[] $authors */
        $authors = factory(Author::class)->times(5)->create();

        $response = $this->getJson(route('api.v1.authors.index'));
        $take3 = $this->getJson(route('api.v1.authors.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.v1.authors.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.v1.authors.index', ['search='.$authors[0]->first_name]));

        $this->assertCount(15, $response->original['data'], '10 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 15);
    }
}
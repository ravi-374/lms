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
}
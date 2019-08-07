<?php

namespace Tests\Controllers;

use App\Models\ActivityType;
use App\Models\Author;
use App\Models\Book;
use App\Models\Client;
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
        $this->withoutMiddleware($this->skipMiddleware());
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
    public function test_can_get_authors()
    {
        $this->mockRepository();

        $authors = factory(Author::class)->times(5)->create();

        $this->authorRepo->shouldReceive('all')
            ->once()
            ->andReturn($authors);

        $response = $this->getJson('api/b1/authors');

        $this->assertSuccessMessageResponse($response, 'Authors retrieved successfully.');
        $this->assertCount(5, $response->original['data']);

        $data = \Arr::pluck($response->original['data'], 'first_name');
        $authors->map(function (Author $author) use ($data) {
            $this->assertContains($author->first_name, $data);
        });
    }

    /** @test */
    public function it_can_store_author()
    {
        $this->mockRepository();

        /** @var Author $author */
        $author = factory(Author::class)->make();

        $this->authorRepo->shouldReceive('create')
            ->once()
            ->with($author->toArray())
            ->andReturn($author);

        $response = $this->postJson('api/b1/authors', $author->toArray());

        $this->assertSuccessDataResponse($response, $author->toArray(), 'Author saved successfully.');
    }

    /** @test */
    public function it_can_update_author()
    {
        $this->mockRepository();

        $author = factory(Author::class)->create();
        $updateRecord = factory(Author::class)->make();

        $this->authorRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $author->id)
            ->andReturn($updateRecord);

        $response = $this->putJson('api/b1/authors/'.$author->id, $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Author updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_author()
    {
        /** @var Author $author */
        $author = factory(Author::class)->create();

        $response = $this->getJson("api/b1/authors/$author->id");

        $this->assertSuccessDataResponse($response, $author->toArray(), 'Author retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_author()
    {
        /** @var Author $author */
        $author = factory(Author::class)->create();

        $response = $this->deleteJson("api/b1/authors/$author->id");

        $this->assertSuccessDataResponse($response, $author->toArray(), 'Author deleted successfully.');
    }

    /** @test */
    public function test_unable_to_delete_author_when_is_assigned_to_user()
    {
        $book = factory(Book::class)->create();

        /** @var Author $author */
        $author = factory(Author::class)->create();
        $author->books()->sync([$book->id]);

        $response = $this->deleteJson("api/b1/authors/$author->id");

        $this->assertExceptionMessage($response, 'Author can not be delete, it is used in one or more books.');
    }
}
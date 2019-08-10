<?php

namespace Tests\Controllers;

use App\Models\Book;
use App\Models\Genre;
use App\Repositories\GenreRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class GenreAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $genreRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
        $this->withoutMiddleware($this->skipMiddleware());
    }

    private function mockRepository()
    {
        $this->genreRepository = \Mockery::mock(GenreRepository::class);
        app()->instance(GenreRepository::class, $this->genreRepository);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_genres()
    {
        $this->mockRepository();

        /** @var Genre $genres */
        $genres = factory(Genre::class)->times(5)->create();

        $this->genreRepository->shouldReceive('all')
            ->once()
            ->andReturn($genres);

        $response = $this->getJson('api/b1/genres');

        $this->assertSuccessDataResponse($response, $genres->toArray(), 'Genres retrieved successfully.');

        $genresList = Genre::all()->count();
        $this->assertEquals($genresList, $response->original['totalRecords']);
    }

    /** @test */
    public function it_can_store_genre()
    {
        $this->mockRepository();

        /** @var Genre $genre */
        $genre = factory(Genre::class)->make();

        $this->genreRepository->shouldReceive('create')
            ->once()
            ->with($genre->toArray())
            ->andReturn($genre);

        $response = $this->postJson('api/b1/genres', $genre->toArray());

        $this->assertSuccessDataResponse($response, $genre->toArray(), 'Genre saved successfully.');
    }

    /** @test */
    public function it_can_update_genre()
    {
        $this->mockRepository();

        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();
        $fakeGenre = factory(Genre::class)->make();

        $this->genreRepository->shouldReceive('update')
            ->once()
            ->with($fakeGenre->toArray(), $genre->id)
            ->andReturn($fakeGenre);

        $response = $this->putJson('api/b1/genres/'.$genre->id, $fakeGenre->toArray());

        $this->assertSuccessDataResponse($response, $fakeGenre->toArray(),
            'Genre updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_genre()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();

        $response = $this->getJson('api/b1/genres/'.$genre->id);

        $this->assertSuccessDataResponse($response, $genre->toArray(), 'Genre retrieved successfully.');

    }

    /** @test */
    public function it_can_delete_genre()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();

        $response = $this->deleteJson("api/b1/genres/$genre->id");

        $this->assertSuccessDataResponse($response, $genre->toArray(), 'Genre deleted successfully.');
        $this->assertEmpty(Genre::find($genre->id));
    }

    /** @test */
    public function test_unable_to_delete_genre_when_its_used_in_one_or_more_book()
    {
        /** @var Book $book */
        $book = factory(Book::class)->create();

        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();
        $book->genres()->sync([$genre->id]);

        $GenreId = $book->fresh()->genres[0]->id;

        $response = $this->deleteJson("api/b1/genres/$GenreId");

        $this->assertExceptionMessage($response, 'Genre can not be delete, it is used in one or more books.');
    }
}
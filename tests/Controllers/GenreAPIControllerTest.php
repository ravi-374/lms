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
    }

    /** @test */
    public function test_can_search_and_get_genres()
    {
        /** @var Genre $genres */
        $genres = factory(Genre::class)->times(5)->create();

        $response = $this->getJson('api/b1/genres');
        $searchByName = $this->getJson('api/b1/genres?search='.$genres[0]->name);
        $take3 = $this->getJson('api/b1/genres?limit=3');
        $skip2 = $this->getJson('api/b1/genres?skip=2&limit=2');

        $this->assertCount(34, $response->original['data'], '29 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertCount(1, $search);
        $this->assertTrue(count($search) > 0 && count($search) < 5, 'Must return at lease one genre');
    }

    /** @test */
    public function it_can_create_genre()
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
        $fakeGenre = factory(Genre::class)->make(['id' => $genre->id]);

        $this->genreRepository->shouldReceive('update')
            ->once()
            ->with($fakeGenre->toArray(), $genre->id)
            ->andReturn($fakeGenre);

        $response = $this->putJson('api/b1/genres/'.$genre->id, $fakeGenre->toArray());

        $this->assertSuccessDataResponse($response, $fakeGenre->toArray(), 'Genre updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_genre()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();

        $response = $this->getJson('api/b1/genres/'.$genre->id);

        $this->assertSuccessDataResponse($response, $genre->toArray(), 'Genre retrieved successfully.');

    }

    /* /** @test */
    public function test_unable_to_delete_genre_when_its_used_in_one_or_more_book()
    {
        /** @var Book $book */
        $book = factory(Book::class)->create();

        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();
        $genre->books()->sync([$book->id]);

        $response = $this->deleteJson("api/b1/genres/$genre->id");

        $this->assertExceptionMessage($response, 'Genre can not be delete, it is used in one or more books.');
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
}

<?php

namespace Tests\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\Genre;
use App\Models\Tag;
use App\Repositories\BookRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class BookAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $bookRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->bookRepository = \Mockery::mock(BookRepository::class);
        app()->instance(BookRepository::class, $this->bookRepository);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_books()
    {
        $this->mockRepository();

        /** @var Book $books */
        $books = factory(Book::class)->times(5)->create();

        $this->bookRepository->shouldReceive('all')
            ->once()
            ->andReturn($books);

        $response = $this->getJson('api/b1/books');

        $this->assertSuccessDataResponse(
            $response,
            $books->toArray(),
            'Books retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_store_book()
    {
        $this->mockRepository();

        $genre = factory(Genre::class)->create();
        /** @var Book $book */
        $book = factory(Book::class)->make(['genres' => [$genre->id]]);

        $this->bookRepository->shouldReceive('store')
            ->once()
            ->with($book->toArray())
            ->andReturn($book);

        $response = $this->postJson('api/b1/books', $book->toArray());

        $this->assertSuccessDataResponse($response, $book->toArray(), 'Book saved successfully.');
    }

    /** @test */
    public function it_can_update_book()
    {
        $this->mockRepository();

        $genre = factory(Genre::class)->create();
        /** @var Book $book */
        $book = factory(Book::class)->create();
        $fakeBook = factory(Book::class)->make([
            'id'     => $book->id,
            'genres' => [$genre->id],
        ]);

        $this->bookRepository->shouldReceive('update')
            ->once()
            ->with($fakeBook->toArray(), $book->id)
            ->andReturn($fakeBook);

        $response = $this->putJson('api/b1/books/'.$book->id, $fakeBook->toArray());

        $this->assertSuccessDataResponse($response, $fakeBook->toArray(),
            'Book updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_book()
    {
        $tag = factory(Tag::class)->create();
        $genre = factory(Genre::class)->create();
        $author = factory(Author::class)->create();
        $item = factory(BookItem::class)->create();

        /** @var Book $book */
        $book = factory(Book::class)->create();

        $book->authors()->sync([$author->id]);
        $book->tags()->sync([$tag->id]);
        $book->genres()->sync([$genre->id]);
        $book->items()->save($item);

        $response = $this->getJson('api/b1/books/'.$book->id);

        $this->assertSuccessDataResponse($response, $book->toArray(), 'Book retrieved successfully.');

        $this->assertEquals($book->id, $response->original['data']['id']);

        $this->assertNotEmpty($response->original['data']['tags']);
        $this->assertNotEmpty($response->original['data']['genres']);
        $this->assertNotEmpty($response->original['data']['items']);
        $this->assertNotEmpty($response->original['data']['authors']);
    }

    /** @test */
    public function it_can_delete_book()
    {
        /** @var Book $book */
        $book = factory(Book::class)->create();

        $response = $this->deleteJson("api/b1/books/$book->id");

        $this->assertSuccessDataResponse($response, $book->toArray(), 'Book deleted successfully.');
        $this->assertEmpty(Book::find($book->id));
    }

    /** @test */
    public function test_unable_to_delete_book_when_it_has_one_or_more_book_items()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $response = $this->deleteJson("api/b1/books/$bookItem->book_id");

        $this->assertExceptionMessage($response, 'Book can not be delete, it is has one or more book items.');
    }
}
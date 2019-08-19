<?php

namespace Tests\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\Genre;
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
    public function test_can_get_books()
    {
        /** @var Book $books */
        $books = factory(Book::class)->times(5)->create();

        $response = $this->getJson('api/b1/books');
        $search = $this->getJson('api/b1/books?search='.$books[0]->name);
        $take3 = $this->getJson('api/b1/books?limit=3');
        $skip2 = $this->getJson('api/b1/books?skip=2&limit=2');

        $response = $response->original['data'];
        $this->assertCount(5, $response);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $this->assertCount(1, $search->original['data']);
        $this->assertEquals($books[0]->name, $search->original['data'][0]['name']);
    }

    /** @test */
    public function test_can_get_books_by_author_name()
    {
        $author1 = factory(Author::class)->create(['first_name' => 'ABC']);
        $book1 = factory(Book::class)->create();
        $author1->books()->sync([$book1->id]);

        $author2 = factory(Author::class)->create(['first_name' => 'ZYX']);
        $book2 = factory(Book::class)->create();
        $author2->books()->sync([$book2->id]);

        $responseAsc = $this->getJson('api/b1/books?order_by=author_name&direction=asc');
        $responseDesc = $this->getJson('api/b1/books?order_by=author_name&direction=desc');

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertCount(2, $responseAsc);
        $this->assertEquals($author1->first_name, $responseAsc[0]['authors'][0]['first_name']);

        $this->assertCount(2, $responseDesc);
        $this->assertEquals($author2->first_name, $responseDesc[0]['authors'][0]['first_name']);
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

        $this->assertSuccessDataResponse(
            $response, $fakeBook->toArray(), 'Book updated successfully.'
        );
    }

    /** @test */
    public function it_can_retrieve_book()
    {
        $genre = factory(Genre::class)->create();
        /** @var Book $book */
        $book = factory(Book::class)->create();
        $book->genres()->sync([$genre->id]);

        $response = $this->getJson('api/b1/books/'.$book->id);

        $this->assertSuccessDataResponse($response, $book->fresh()->toArray(), 'Book retrieved successfully.');
        $this->assertNotEmpty($book->genres);
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
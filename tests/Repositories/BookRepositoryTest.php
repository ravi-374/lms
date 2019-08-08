<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookItem;
use App\Repositories\BookRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookRepositoryTest.
 */
class BookRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var BookRepository */
    protected $bookRepo;

    private $defaultUserId = 1;

    public function setUp(): void
    {
        parent::setUp();

        $this->bookRepo = app(BookRepository::class);
        $this->signInWithDefaultAdminUser();
    }

   /** @test */
    public function it_can_store_book()
    {
        $fakeBook = factory(Book::class)->make()->toArray();

        $bookResult = $this->bookRepo->store($fakeBook);

        $this->assertNotEmpty($bookResult);
        $this->assertEquals($fakeBook['name'], $bookResult->name);
    }

    /** @test */
    public function it_can_update_book()
    {
        $book = factory(Book::class)->create();
        $fakeBook = factory(Book::class)->make()->toArray();

        $result = $this->bookRepo->update($fakeBook, $book->id)->toArray();

        $this->assertNotEmpty($result);
        $this->assertEquals($fakeBook['name'], $book->fresh()->name);
        $this->assertEquals($fakeBook['isbn'], $book->fresh()->isbn);
    }

    /** @test */
    public function test_can_create_book_items()
    {
        $book = factory(Book::class)->create();

        $inputs[] = factory(BookItem::class)->make()->toArray();
        $inputs[] = factory(BookItem::class)->make()->toArray();

        $result = $this->bookRepo->createOrUpdateBookItems($book, $inputs);

        $this->assertTrue($result);

        $book = Book::with('items')->findOrFail($book->id);
        $this->assertCount(2, $book->items);
        $this->assertEquals($inputs[0]['book_code'], $book->items[0]->book_code);
        $this->assertEquals($inputs[1]['book_code'], $book->items[1]->book_code);
    }

    /** @test */
    public function it_can_update_book_items()
    {
        $book = factory(Book::class)->create();
        $bookItem = factory(BookItem::class)->create(['book_id' => $book->id]);
        $inputs[] = factory(BookItem::class)->make(['book_id' => $book->id, 'id' => $bookItem->id])->toArray();

        $result = $this->bookRepo->createOrUpdateBookItems($book,$inputs);
        $this->assertTrue($result);

        $book = Book::with('items')->findOrFail($book->id);
        $this->assertCount(1, $book->items);
        $this->assertEquals($inputs[0]['price'], $book->items[0]->price);
    }

    /** @test */
    public function test_can_update_book_items_by_deleting_old_one()
    {
        $book = factory(Book::class)->create();
        $oldBookItem = factory(BookItem::class)->create(['book_id' => $book->id]);
        $inputs[] = factory(BookItem::class)->make()->toArray();

        $result = $this->bookRepo->createOrUpdateBookItems($book,$inputs);
        $this->assertTrue($result);

        $book = Book::with('items')->findOrFail($book->id);
        $this->assertCount(1, $book->items, 'Old item was deleted.');
    }
}

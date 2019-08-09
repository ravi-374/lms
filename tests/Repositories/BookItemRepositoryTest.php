<?php

namespace Tests\Repositories;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Repositories\BookItemRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookItemRepositoryTest.
 */
class BookItemRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var BookItemRepository */
    protected $bookItemRepo;

    private $defaultUserId = 1;

    public function setUp(): void
    {
        parent::setUp();

        $this->bookItemRepo = app(BookItemRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test
     */
    public function it_can_get_book_items_of_book_for_given_member()
    {
        $reserveBook = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RESERVED,
        ]);

        $unReserveBook = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_UN_RESERVED,
            'member_id' => $reserveBook->member_id,
        ]);

        $search['for_member'] = $reserveBook->member_id;
        $search['member_id'] = $reserveBook->member_id;

        $bookItems = $this->bookItemRepo->all($search);

        $this->assertCount(1, $bookItems);
        $this->assertEquals($reserveBook->book_item_id, $bookItems[0]->id);
    }

    /** @test */
    public function it_can_search_books()
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create();

        $search['book_item_id'] = $issuedBook->book_item_id;
        $bookItems = $this->bookItemRepo->searchBooks($search);

        $bookItem = $bookItems->last();

        $this->assertEquals($issuedBook->book_item_id, $bookItem->id);

        $this->assertNotEmpty($bookItem->book);
        $this->assertNotEmpty($bookItem->lastIssuedBook);
        $this->assertNotEmpty($bookItem->publisher);
        $this->assertNotEmpty($bookItem->language);
    }

    /** @test */
    public function it_can_search_books_with_given_book_id()
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create();

        $search['id'] = $issuedBook->bookItem->book->id;

        $bookItems = $this->bookItemRepo->searchBooks($search);
        $bookItem = $bookItems->last();

        $this->assertEquals($search['id'], $bookItem->book_id);
    }

    /** @test */
    public function it_can_search_books_with_given_book_ids()
    {
        $book = factory(IssuedBook::class)->create();

        $issuedBooks = factory(IssuedBook::class)->times(2)->create();

        $search['id'] = $book->bookItem->book->id;
        $search['search_by_book'] = [$issuedBooks[0]->bookItem->book->id, $issuedBooks[1]->bookItem->book->id];

        $bookItems = $this->bookItemRepo->searchBooks($search);

        $bookItem = $bookItems->last();
        $this->assertEquals($search['id'], $bookItem->book_id);
    }

    /** @test */
    public function it_can_search_books_with_given_book_author()
    {
        $author = factory(Author::class)->create();
        $book = factory(Book::class)->create();
        $book->authors()->sync([$author->id]);

        $bookItem = factory(BookItem::class)->create(['book_id' => $book->id]);
        $issuedBooks = factory(IssuedBook::class)->create(['book_item_id' => $bookItem->id]);

        $search['id'] = $author->id;
        $search['search_by_author'] = [$author->id];

        $bookItem = $this->bookItemRepo->searchBooks($search);

        $this->assertEquals($author->id, $bookItem[0]->book->authors[0]->id);
    }
}

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

    public function setUp(): void
    {
        parent::setUp();

        $this->bookItemRepo = app(BookItemRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_return_only_reserve_book_items_of_given_member()
    {
        $reserveBook = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RESERVED,
        ]);

        $unReserveBook = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_UN_RESERVED,
            'member_id' => $reserveBook->member_id,
        ]);

        $bookItems = $this->bookItemRepo->all(['for_member' => true, 'member_id' => $reserveBook->member_id]);

        $this->assertCount(1, $bookItems);
        $this->assertEquals($reserveBook->book_item_id, $bookItems[0]->id);
    }

    /** @test */
    public function test_can_return_all_book_items()
    {
        $bookItems = factory(BookItem::class, 10)->create();

        $allBookItems = $this->bookItemRepo->all();
        $take3 = $this->bookItemRepo->all([], null, 3);
        $skip2 = $this->bookItemRepo->all([], 2, 5);

        $this->assertCount(10, $allBookItems);
        $this->assertCount(3, $take3);
        $this->assertCount(5, $skip2);
    }

    /** @test */
    public function it_can_search_books_with_given_book_ids()
    {
        /** @var BookItem[] $bookItems */
        $bookItems = factory(BookItem::class, 5)->create();

        $search['id'] = $bookItems[0]->book_id." ".$bookItems[1]->book_id;
        $search['search_by_book'] = true;

        $allBookItems = $this->bookItemRepo->searchBooks($search);

        $ids = $allBookItems->pluck('id')->toArray();
        $this->assertCount(2, $ids);
        $this->assertContains($bookItems[0]->id, $ids);
        $this->assertContains($bookItems[1]->id, $ids);
    }

    /** @test */
    public function it_can_search_books_with_given_book_author()
    {
        /** @var Author $author */
        $author = factory(Author::class)->create();
        $book1 = factory(Book::class)->create();
        $book1->authors()->sync([$author->id]);

        $book2 = factory(Book::class)->create();
        $bookItem = factory(BookItem::class)->create(['book_id' => $book1->id]);

        $bookItem = $this->bookItemRepo->searchBooks(['id' => $author->id, 'search_by_author' => true]);

        $this->assertCount(1, $bookItem);
        $this->assertEquals($author->id, $bookItem[0]->book->authors[0]->id);
    }
}

<?php

namespace Tests\Models;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class IssueBookTest
 * @package Tests\Integration\Models
 */
class IssueBookTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_get_issue_books_of_given_member()
    {
        $ankit = factory(Member::class)->create();
        $vishal = factory(Member::class)->create();

        $book1 = factory(IssuedBook::class)->create([
            'member_id' => $ankit->id,
        ]);

        $book2 = factory(IssuedBook::class)->create([
            'member_id' => $vishal->id,
        ]);

        $issuedBooks = IssuedBook::ofMember($ankit->id)->get();
        $this->assertCount(1, $issuedBooks);

        $firstIssuedBooks = $issuedBooks->first();
        $this->assertEquals($book1->id, $firstIssuedBooks->id);
        $this->assertEquals($ankit->id, $firstIssuedBooks->member_id);
    }

    /** @test */
    public function it_can_retrieve_only_reserve_books()
    {
        $book1 = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RESERVED,
        ]);

        $book2 = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RETURNED,
        ]);

        $books = IssuedBook::reserve()->get();
        $this->assertCount(1, $books);

        /** @var IssuedBook $firstBook */
        $firstBook = $books->first();
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $firstBook->status);
    }

    /** @test */
    public function it_can_get_issue_books_of_given_book_item()
    {
        $bookItem1 = factory(BookItem::class)->create();
        $bookItem2 = factory(BookItem::class)->create();

        $book1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
        ]);

        $book2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
        ]);

        $issuedBooks = IssuedBook::ofBookItem($bookItem1->id)->get();
        $this->assertCount(1, $issuedBooks);

        $firstIssuedBooks = $issuedBooks->first();
        $this->assertEquals($book1->id, $firstIssuedBooks->id);
        $this->assertEquals($bookItem1->id, $firstIssuedBooks->book_item_id);
    }

    /** @test */
    public function it_can_get_last_issued_book()
    {
        $book1 = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_RETURNED]);

        $book2 = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_ISSUED]);

        $issuedBooks = IssuedBook::lastIssuedBook()->get();
        $this->assertCount(1, $issuedBooks);
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $issuedBooks[0]->status);
    }
}
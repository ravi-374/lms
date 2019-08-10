<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\IssuedBookRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class IssuedRepositoryTest.
 */
class IssuedRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var IssuedBookRepository */
    protected $issueBookRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->issueBookRepo = app(IssuedBookRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function it_can_issue_book()
    {
        /** @var  IssuedBook $fakeIssueBook */
        $fakeIssueBook = factory(IssuedBook::class)->make(['status' => IssuedBook::STATUS_AVAILABLE]);

        $issuedBook = $this->issueBookRepo->issueBook($fakeIssueBook->toArray());

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $issuedBook->status);

        $this->assertEquals($fakeIssueBook->book_item_id, $issuedBook->bookItem->id);
        $this->assertFalse($issuedBook->bookItem->is_available);
    }


    /** @test */
    public function it_can_store_issued_book()
    {
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ];

        $issuedBook = $this->issueBookRepo->store($input)->toArray();

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals($input['book_item_id'], $issuedBook['book_item_id']);
        $this->assertEquals($input['member_id'], $issuedBook['member_id']);
    }

    /** @test */
    public function test_can_validate_book()
    {
        $book = factory(Book::class)->create();
        $bookItem = factory(BookItem::class)->create(['book_id' => $book->id]);
        $member = factory(Member::class)->create();
        $input = [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ];

        $response = $this->issueBookRepo->validateBook($input);
        $this->assertTrue($response, 'Book is not available');
    }

    /** @test */
    public function it_can_reserve_book()
    {
        /** @var  IssuedBook $fakeReserveBook */
        $fakeReserveBook = factory(IssuedBook::class)->make(['status' => IssuedBook::STATUS_RETURNED]);

        $issuedBook = $this->issueBookRepo->reserveBook($fakeReserveBook->toArray());

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $issuedBook->status);

        $this->assertEquals($fakeReserveBook->book_item_id, $issuedBook->bookItem->id);
    }

    /** @test */
    public function it_can_return_book()
    {
        $book = factory(Book::class)->create();
        $bookItem = factory(BookItem::class)->create(['book_id' => $book->id]);
        /** @var  IssuedBook $fakeIssueBook */
        $fakeIssueBook = factory(IssuedBook::class)->create([
            'status'       => IssuedBook::STATUS_RESERVED,
            'book_item_id' => $bookItem->id,
        ]);

        $issuedBook = $this->issueBookRepo->returnBook($fakeIssueBook->toArray());

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_RETURNED, $issuedBook->status);

        $this->assertEquals($fakeIssueBook->book_item_id, $issuedBook->bookItem->id);
        $this->assertTrue($issuedBook->bookItem->is_available);
    }

    /** @test */
    public function it_can_un_reserve_book()
    {
        $book = factory(Book::class)->create();
        $bookItem = factory(BookItem::class)->create(['book_id' => $book->id]);
        /** @var  IssuedBook $fakeIssueBook */
        $fakeIssueBook = factory(IssuedBook::class)->create([
            'status'       => IssuedBook::STATUS_RESERVED,
            'book_item_id' => $bookItem->id,
        ]);
        $issuedBook = $this->issueBookRepo->unReserveBook($bookItem, $fakeIssueBook->toArray());

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $issuedBook->status);

        $this->assertEquals($fakeIssueBook->book_item_id, $issuedBook->bookItem->id);
        $this->assertTrue($issuedBook->bookItem->is_available);
    }
}

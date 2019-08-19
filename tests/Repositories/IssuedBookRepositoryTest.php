<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\IssuedBookRepository;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class IssuedBookRepositoryTest.
 */
class IssuedBookRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var IssuedBookRepository */
    protected $issuedBookRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->issuedBookRepo = app(IssuedBookRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_sort_issued_book_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => 'ABC']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $book2 = factory(Book::class)->create(['name' => 'ZYX']);
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $search['order_by'] = 'name';
        $search['direction'] = 'desc';
        $issuedBooks = $this->issuedBookRepo->all($search);

        $this->assertCount(2, $issuedBooks);
        $this->assertEquals($book2->name, $issuedBooks[0]->bookItem->book->name);
    }

    /** @test */
    public function test_can_sort_issued_book_by_book_code()
    {
        $bookItem1 = factory(BookItem::class)->create(['book_code' => 'ABCDE']);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'ZERO']);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $search['order_by'] = 'book_code';
        $search['direction'] = 'desc';
        $issuedBooks = $this->issuedBookRepo->all($search);

        $this->assertCount(2, $issuedBooks);
        $this->assertEquals('ZERO', $issuedBooks[0]->bookItem->book_code);
    }

    /** @test */
    public function test_can_search_issue_book_by_status()
    {
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_ISSUED,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create();

        $search['search'] = 'issue';
        $search['direction'] = 'desc';
        $issuedBooks = $this->issuedBookRepo->all($search);

        $this->assertEquals($issuedBook1->id, $issuedBooks[0]->id);
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $issuedBooks[0]->status);
    }

    /** @test */
    public function test_can_search_issue_book_by_return_due_date()
    {
        $today = Carbon::now();
        $returnDueDate = Carbon::parse($today)->addDays(15)->toDateString();
        /** @var IssuedBook $issuedBook1 */
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'issued_on'       => $today,
            'return_due_date' => $returnDueDate,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create();

        $search['due_date'] = $returnDueDate;
        $search['direction'] = 'desc';
        $issuedBooks = $this->issuedBookRepo->all($search);

        $this->assertEquals($issuedBook1->id, $issuedBooks[0]->id);
        $this->assertEquals($returnDueDate, $issuedBooks[0]->return_due_date);
    }

    /** @test */
    public function test_member_can_issue_book()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $input = ['member_id' => $member->id, 'book_item_id' => $bookItem->id];

        $issuedBook = $this->issuedBookRepo->issueBook($input);

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $issuedBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Issue date must be less or equal to today's date.
     */
    public function test_unable_to_issue_book_when_issue_date_is_greater_than_today_date()
    {
        $date = date('Y-m-d h:i:s', strtotime('+2 day'));

        $this->issuedBookRepo->issueBook(['issued_on' => $date]);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage No query results for model [App\Models\BookItem] 9999
     */
    public function test_unable_to_issue_book_with_non_existing_book_item_id()
    {
        $this->issuedBookRepo->issueBook(['book_item_id' => 9999]);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is already reserved by another member.
     */
    public function test_unable_to_issue_book_when_its_reserved_by_another_member()
    {
        $vishal = factory(Member::class)->create();
        $mitul = factory(Member::class)->create();
        $bookItem = factory(BookItem::class)->create();

        $reserved = $this->issuedBookRepo->reserveBook(['book_item_id' => $bookItem->id, 'member_id' => $vishal->id]);
        $issuedBook = $this->issuedBookRepo->issueBook(['book_item_id' => $bookItem->id, 'member_id' => $mitul->id]);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is already issued.
     */
    public function test_unable_to_issue_book_when_its_already_issued()
    {
        $vishal = factory(Member::class)->create();
        $bookItem = factory(BookItem::class)->create();

        $this->issuedBookRepo->issueBook(['book_item_id' => $bookItem->id, 'member_id' => $vishal->id]);
        $this->issuedBookRepo->issueBook(['book_item_id' => $bookItem->id, 'member_id' => $vishal->id]);
    }

    /** @test */
    public function it_can_store_issued_book()
    {
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id, 'status' => IssuedBook::STATUS_ISSUED];

        /** @var IssuedBook $issuedBook */
        $issuedBook = $this->issuedBookRepo->store($input);

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals($input['book_item_id'], $issuedBook->book_item_id);
        $this->assertEquals($input['member_id'], $issuedBook->member_id);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is not available
     */
    public function test_can_validate_issue_book_data()
    {
        $issuedBook = factory(IssuedBook::class)->create();

        $this->issuedBookRepo->validateBook($issuedBook->toArray());
    }

    /** @test */
    public function test_member_can_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $reserveBook = $this->issuedBookRepo->reserveBook($input);

        $this->assertArrayHasKey('id', $reserveBook);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $reserveBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is not available
     */
    public function test_unable_to_reserve_book_when_it_is_not_available()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create(['status' => BookItem::STATUS_NOT_AVAILABLE]);
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $reserveBook = $this->issuedBookRepo->reserveBook($input);
    }

    /** @test */
    public function test_member_can_return_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $issuedBook = $this->issuedBookRepo->issueBook($input);
        $returnBook = $this->issuedBookRepo->returnBook($input);

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_RETURNED, $returnBook->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $bookItem->fresh()->status);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book must be issued before returning it.
     */
    public function test_unable_to_return_book_when_it_is_not_issued()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $returnBook = $this->issuedBookRepo->returnBook($input);
    }

    /** @test */
    public function test_member_can_un_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $issuedBook = $this->issuedBookRepo->reserveBook($input);
        $returnBook = $this->issuedBookRepo->unReserveBook($bookItem->fresh(), $input);

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $returnBook->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $bookItem->fresh()->status);
    }

    /**
     * @test
     * @expectedException  Illuminate\Validation\UnauthorizedException
     * @expectedExceptionMessage You can un-reserve only your books.
     */
    public function test_member_can_only_un_reserve_their_books()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $vishal = factory(Member::class)->create();
        $mitul = factory(Member::class)->create();

        $issuedBook = $this->issuedBookRepo->reserveBook(['book_item_id' => $bookItem->id, 'member_id' => $vishal->id]);
        $returnBook = $this->issuedBookRepo->unReserveBook(
            $bookItem, ['book_item_id' => $bookItem->id, 'member_id' => $mitul->id]
        );
    }
}

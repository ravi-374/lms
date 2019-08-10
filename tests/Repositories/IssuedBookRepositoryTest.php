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
    public function it_can_issue_book()
    {
        /** @var  IssuedBook $fakeIssueBook */
        $fakeIssueBook = factory(IssuedBook::class)->make();

        $input = [
            'member_id'    => $fakeIssueBook->member_id,
            'book_item_id' => $fakeIssueBook->book_item_id,
        ];

        $issuedBook = $this->issuedBookRepo->issueBook($input);

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $issuedBook->status);

        $this->assertEquals($fakeIssueBook->book_item_id, $issuedBook->bookItem->id);
        $this->assertFalse($issuedBook->bookItem->is_available);
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
        /** @var  IssuedBook $issuedBook1 */
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RESERVED,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->make();

        $input = [
            'book_item_id' => $issuedBook1->book_item_id,
            'member_id'    => $issuedBook2->member_id,
        ];

        $this->issuedBookRepo->issueBook($input);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is already issued.
     */
    public function test_unable_to_issue_book_when_its_already_issued()
    {
        /** @var  IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_ISSUED,
        ]);

        $input = [
            'book_item_id' => $issuedBook->book_item_id,
            'member_id'    => $issuedBook->member_id,
        ];

        $this->issuedBookRepo->issueBook($input);
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

        $issuedBook = $this->issuedBookRepo->store($input)->toArray();

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

        $response = $this->issuedBookRepo->validateBook($input);
        $this->assertTrue($response, 'Book is not available');
    }

    /** @test */
    public function it_can_reserve_book()
    {
        /** @var  IssuedBook $fakeReserveBook */
        $fakeReserveBook = factory(IssuedBook::class)->make(['status' => IssuedBook::STATUS_RETURNED]);

        $issuedBook = $this->issuedBookRepo->reserveBook($fakeReserveBook->toArray());

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

        $issuedBook = $this->issuedBookRepo->returnBook($fakeIssueBook->toArray());

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
        $issuedBook = $this->issuedBookRepo->unReserveBook($bookItem, $fakeIssueBook->toArray());

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $issuedBook->status);

        $this->assertEquals($fakeIssueBook->book_item_id, $issuedBook->bookItem->id);
        $this->assertTrue($issuedBook->bookItem->is_available);
    }
}

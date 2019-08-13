<?php

namespace Tests\Repositories;

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
        $this->assertFalse($bookItem->fresh()->is_available);
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
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

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
        $this->assertFalse($bookItem->fresh()->is_available);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is not available
     */
    public function test_unable_to_reserve_book_when_it_is_not_available()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create(['is_available' => false]);
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
        $this->assertTrue($bookItem->fresh()->is_available);
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
        $this->assertTrue($bookItem->fresh()->is_available);
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

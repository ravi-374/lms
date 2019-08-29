<?php

namespace Tests\B1\APIs;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\IssuedBookRepository;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

/**
 * Class IssuedBookAPIControllerTest
 * @package Tests\Controllers
 */
class IssuedBookAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $issueBookRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->issueBookRepo = \Mockery::mock(IssuedBookRepository::class);
        app()->instance(IssuedBookRepository::class, $this->issueBookRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_issued_books()
    {
        $this->mockRepository();

        /** @var IssuedBook $issuedBooks */
        $issuedBooks = factory(IssuedBook::class)->times(5)->create();

        $this->issueBookRepo->expects('all')->andReturn($issuedBooks);

        $response = $this->getJson(route('api.b1.books-history'));
        $this->assertSuccessMessageResponse($response, 'Issued Books retrieved successfully.');
    }

    /** @test */
    public function test_can_update_issued_book_status()
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create();
        $input = [
            'book_item_id' => $issuedBook->book_item_id,
            'status'       => IssuedBook::STATUS_LOST,
        ];

        $response = $this->putJson(route('api.b1.update-issued-book-status', $issuedBook->id), $input);

        $this->assertSuccessDataResponse(
            $response,
            $issuedBook->fresh()->toArray(),
            'Issued Book status updated successfully.'
        );

        $this->assertEquals(IssuedBook::STATUS_LOST, $issuedBook->fresh()->status);
        $this->assertEquals(BookItem::STATUS_LOST, $issuedBook->bookItem->status);
    }

    /** @test */
    public function test_can_get_book_history()
    {
        /** @var IssuedBook[] $IssuedBooks */
        $IssuedBooks = factory(IssuedBook::class)->times(5)->create();

        $response = $this->getJson(route('api.b1.books-history'));
        $take3 = $this->getJson(route('api.b1.books-history', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.books-history', ['skip' => 2, 'limit' => 2]));

        $this->assertCount(5, $response->original['data']);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(5, $response->original['totalRecords']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => 'ABC']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $book2 = factory(Book::class)->create(['name' => 'ZYX']);
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $responseAsc = $this->getJson(route('api.b1.books-history', [
                'order_by'  => 'name',
                'direction' => 'asc',
            ]
        ));
        $responseDesc = $this->getJson(route('api.b1.books-history', [
                'order_by'  => 'name',
                'direction' => 'desc',
            ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($book1->name, $responseAsc[0]['book_item']['book']['name']);
        $this->assertEquals($book2->name, $responseDesc[0]['book_item']['book']['name']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_code()
    {
        $bookItem1 = factory(BookItem::class)->create(['book_code' => 'AB1234XYZ']);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'ZAD587RE']);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $responseAsc = $this->getJson(route('api.b1.books-history', [
                'order_by'  => 'book_code',
                'direction' => 'asc',
            ]
        ));
        $responseDesc = $this->getJson(route('api.b1.books-history', [
                'order_by'  => 'book_code',
                'direction' => 'desc',
            ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($bookItem1->book_code, $responseAsc[0]['book_item']['book_code']);
        $this->assertEquals($bookItem2->book_code, $responseDesc[0]['book_item']['book_code']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_member_name()
    {
        $member1 = factory(Member::class)->create(['first_name' => 'ABHI']);
        $issuedBook1 = factory(IssuedBook::class)->create(['member_id' => $member1->id]);

        $member2 = factory(Member::class)->create(['first_name' => 'VISHAL']);
        $issuedBook2 = factory(IssuedBook::class)->create(['member_id' => $member2->id]);

        $responseAsc = $this->getJson(route('api.b1.books-history', [
                'order_by'  => 'member_name',
                'direction' => 'asc',
            ]
        ));
        $responseDesc = $this->getJson(route('api.b1.books-history', [
                'order_by'  => 'member_name',
                'direction' => 'desc',
            ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($member1->first_name, $responseAsc[0]['member']['first_name']);
        $this->assertEquals($member2->first_name, $responseDesc[0]['member']['first_name']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_status()
    {
        $issuedBook1 = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_ISSUED]);
        $issuedBook2 = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_RESERVED]);

        $responseIssued = $this->getJson(route('api.b1.books-history', [
                'search'    => 'issued',
                'direction' => 'asc',
            ]
        ));
        $responseReserved = $this->getJson(route('api.b1.books-history', [
                'search'    => 'reserved',
                'direction' => 'desc',
            ]
        ));

        $responseIssued = $responseIssued->original['data'];
        $responseReserved = $responseReserved->original['data'];
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $responseIssued[0]['status']);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $responseReserved[0]['status']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_due_date()
    {
        $returnDueDate = Carbon::now()->addDays(15)->toDateString();
        /** @var IssuedBook $issuedBook1 */
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'issued_on'       => Carbon::now(),
            'return_due_date' => $returnDueDate,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create();

        $response = $this->getJson(route('api.b1.books-history', ['due_date' => $returnDueDate]));

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($returnDueDate, $response[0]['return_due_date']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => 'Laravel']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $book2 = factory(Book::class)->create();
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $response = $this->getJson(route('api.b1.books-history', ['search' => $book1->name]));

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($book1->name, $response[0]['book_item']['book']['name']);
    }

    /** @test */
    public function it_can_issue_book()
    {
        $this->mockRepository();

        /** @var Member $member */
        $member = factory(Member::class)->create();

        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $input = ['member_id' => $member->id, 'book_item_id' => $bookItem->id];

        $issueBook = factory(IssuedBook::class)->make([
            'member_id'    => $member->id,
            'book_item_id' => $bookItem->id,
        ]);

        $this->issueBookRepo->expects('issueBook')
            ->with($input)
            ->andReturn($issueBook);

        $response = $this->postJson(route('api.b1.issue-book', $bookItem->id), $input);

        $this->assertSuccessMessageResponse($response, 'Book issued successfully.');
        $this->assertEquals($issueBook->member_id, $response->original['data']['member_id']);
        $this->assertEquals($issueBook->book_item_id, $response->original['data']['book_item_id']);
    }

    /** @test */
    public function it_can_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $this->assertArrayHasKey('id', $response->original['data']);
        $issuedBook = IssuedBook::ofMember($member->id)->first();

        $this->assertSuccessMessageResponse($response, 'Book reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $issuedBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function it_can_un_reserve_book()
    {
        /** @var IssuedBook $issueBook */
        $issueBook = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_RESERVED]);

        $response = $this->postJson(route('api.b1.un-reserve-book', $issueBook->book_item_id), [
            'member_id' => $issueBook->member_id,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book un-reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $issueBook->fresh()->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $issueBook->bookItem->status);
    }

    /** @test */
    public function it_can_return_book()
    {
        $this->mockRepository();

        /** @var IssuedBook $issueBook */
        $issueBook = factory(IssuedBook::class)->create();

        $this->issueBookRepo->expects('returnBook')
            ->with(['book_item_id' => $issueBook->book_item_id])
            ->andReturn($issueBook);

        $response = $this->postJson(route('api.b1.return-book', $issueBook->book_item_id), [
            'book_item_id' => $issueBook->book_item_id,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book return successfully.');
        $this->assertEquals($issueBook->book_item_id, $response->original['data']['book_item_id']);
    }

    /** @test */
    public function it_can_retrieve_issue_book()
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create();

        $response = $this->getJson(route('api.b1.issued-book.show', $issuedBook->id));

        $this->assertSuccessMessageResponse($response, 'Issued Book retrieved successfully.');
        $this->assertEquals($issuedBook->id, $response->original['data']['id']);
    }

    /** @test */
    public function test_can_get_all_issued_books_of_given_member()
    {
        $this->mockRepository();

        $member = factory(Member::class)->create();

        /** @var IssuedBook $issuedBooks */
        $issuedBooks = factory(IssuedBook::class)->times(5)->create(['member_id' => $member->id]);

        $this->issueBookRepo->expects('all')->andReturn($issuedBooks);

        $response = $this->getJson(route('api.b1.members.book-history', $member->id));

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
        $this->assertCount(5, $response->original['data']);
    }
}
<?php

namespace Tests\V1\APIs;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\IssuedBookRepository;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class IssuedBookAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $issuedBookRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    private function mockRepository()
    {
        $this->issuedBookRepo = \Mockery::mock(IssuedBookRepository::class);
        app()->instance(IssuedBookRepository::class, $this->issuedBookRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_book_history()
    {
        $this->mockRepository();

        $member = factory(Member::class)->create();
        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)
            ->times(5)
            ->create(['member_id' => $member->id]);

        $this->issuedBookRepo->expects('all')->andReturn($issuedBook);

        $response = $this->getJson(route('api.v1.books-history.index'));

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
    }

    /** @test */
    public function test_can_get_book_history()
    {
        /** @var IssuedBook[] $IssuedBooks */
        $IssuedBooks = factory(IssuedBook::class)
            ->times(5)
            ->create(['member_id' => $this->loggedInMemberId]);

        factory(IssuedBook::class); // of another member

        $response = $this->getJson(route('api.v1.books-history.index'));
        $take3 = $this->getJson(route('api.v1.books-history.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.v1.books-history.index', ['skip' => 2, 'limit' => 2]));

        $totalRecords = $response->original['totalRecords'];
        $response = $response->original['data'];
        $this->assertCount(5, $response);
        $this->assertContains($this->loggedInMemberId, \Arr::pluck($response, 'member_id'));

        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(5, $totalRecords);
    }

    /** @test */
    public function it_can_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $response = $this->postJson(route('api.v1.reserve-book', $bookItem->id),
            ['book_item_id' => $bookItem->id]);

        $issuedBook = IssuedBook::ofMember($this->loggedInMemberId)->first();
        $this->assertSuccessMessageResponse($response, 'Book reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $issuedBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $issuedBook->bookItem->status);
    }

    /** @test */
    public function it_can_un_reserve_book()
    {
        /** @var IssuedBook $issueBook */
        $issueBook = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_RESERVED,
            'member_id' => $this->loggedInMemberId,
        ]);

        $response = $this->postJson(route('api.v1.un-reserve-book', $issueBook->book_item_id), [
            'member_id' => $this->loggedInMemberId,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book un-reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $issueBook->fresh()->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $issueBook->bookItem->status);
        $this->assertEquals($this->loggedInMemberId, $issueBook->member_id);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => 'ABC']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $book2 = factory(Book::class)->create(['name' => 'ZYX']);
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $responseAsc = $this->getJson(route('api.v1.books-history.index',
            ['order_by' => 'name', 'direction' => 'asc']));
        $responseDesc = $this->getJson(route('api.v1.books-history.index',
            ['order_by' => 'name', 'direction' => 'desc']));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($book1->name, $responseAsc[0]['book_item']['book']['name']);
        $this->assertEquals($book2->name, $responseDesc[0]['book_item']['book']['name']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_code()
    {
        $bookItem1 = factory(BookItem::class)->create(['book_code' => 'ABCD3453']);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'ZWQ34543']);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $responseAsc = $this->getJson(route('api.v1.books-history.index', [
                'order_by'  => 'book_code',
                'direction' => 'asc',
            ]
        ));
        $responseDesc = $this->getJson(route('api.v1.books-history.index', [
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
    public function test_can_search_issued_book_records_by_status()
    {
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_ISSUED,
            'member_id' => $this->loggedInMemberId,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_RESERVED,
            'member_id' => $this->loggedInMemberId,
        ]);

        $responseIssued = $this->getJson(route('api.v1.books-history.index', [
                'search'    => 'issued',
                'direction' => 'asc',
            ]
        ));
        $responseReserved = $this->getJson(route('api.v1.books-history.index', [
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
            'member_id'       => $this->loggedInMemberId,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create(['member_id' => $this->loggedInMemberId]);

        $response = $this->getJson(route('api.v1.books-history.index', [
                'due_date' => $returnDueDate,
            ]
        ));

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($returnDueDate, $response[0]['return_due_date']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => 'Be Unique']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $book2 = factory(Book::class)->create();
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
        ]);

        $response = $this->getJson(route('api.v1.books-history.index', [
                'search' => $book1->name,
            ]
        ));

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($book1->name, $response[0]['book_item']['book']['name']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_book_code()
    {
        $bookItem1 = factory(BookItem::class)->create(['book_code' => 'XRTD6y45U']);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'IRE6484O']);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $response = $this->getJson(route('api.v1.books-history.index', [
                'search' => $bookItem1->book_code,
            ]
        ));

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($bookItem1->book_code, $response[0]['book_item']['book_code']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_member_name()
    {
        $member1 = factory(Member::class)->create(['first_name' => 'Jhon']);
        $issuedBook1 = factory(IssuedBook::class)->create(['member_id' => $member1->id]);

        $member2 = factory(Member::class)->create(['first_name' => 'Steve']);
        $issuedBook2 = factory(IssuedBook::class)->create(['member_id' => $member2->id]);

        $response = $this->getJson(route('api.v1.books-history.index', [
                'search' => $member1->first_name,
            ]
        ));
        $searchByLastName = $this->getJson(route('api.v1.books-history.index', [
                'search' => $member1->last_name,
            ]
        ));

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($member1->first_name, $response[0]['member']['first_name']);
        $this->assertEquals($member1->last_name, $searchByLastName->original['data'][0]['member']['last_name']);
    }
}
<?php

namespace Tests\V1\Controllers;

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
        $this->signInWithDefaultAdminUser();
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

        $bookItems = factory(IssuedBook::class)->times(5)->create();

        $this->issuedBookRepo->shouldReceive('all')
            ->once()
            ->andReturn($bookItems);

        $response = $this->getJson('api/v1/books-history');

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
        $this->assertCount(5, $response->original['data']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_name()
    {
        $member = factory(Member::class)->create();

        $book1 = factory(Book::class)->create(['name' => 'ABC']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $member->id,
        ]);

        $book2 = factory(Book::class)->create(['name' => 'ZYX']);
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
            'member_id'    => $member->id,
        ]);

        $responseAsc = $this->getJson('api/v1/books-history?order_by=name&direction=asc');
        $responseDesc = $this->getJson('api/v1/books-history?order_by=name&direction=desc');

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($book1->name, $responseAsc[0]['book_item']['book']['name']);
        $this->assertEquals($book2->name, $responseDesc[0]['book_item']['book']['name']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_code()
    {
        $member = factory(Member::class)->create();

        $bookItem1 = factory(BookItem::class)->create(['book_code' => 'ABCD3453']);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $member->id,
        ]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'ZWQ34543']);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
            'member_id'    => $member->id,
        ]);

        $responseAsc = $this->getJson('api/v1/books-history?order_by=book_code&direction=asc');
        $responseDesc = $this->getJson('api/v1/books-history?order_by=book_code&direction=desc');

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($bookItem1->book_code, $responseAsc[0]['book_item']['book_code']);
        $this->assertEquals($bookItem2->book_code, $responseDesc[0]['book_item']['book_code']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_status()
    {
        $member = factory(Member::class)->create();
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_ISSUED,
            'member_id' => $member->id,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_RESERVED,
            'member_id' => $member->id,
        ]);

        $responseIssued = $this->getJson('api/v1/books-history?search=issued&direction=asc');
        $responseReserved = $this->getJson('api/v1/books-history?search=reserved&direction=desc');

        $responseIssued = $responseIssued->original['data'];
        $responseReserved = $responseReserved->original['data'];
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $responseIssued[0]['status']);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $responseReserved[0]['status']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_due_date()
    {
        $member = factory(Member::class)->create();

        $returnDueDate = Carbon::now()->addDays(15)->toDateString();
        /** @var IssuedBook $issuedBook1 */
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'issued_on'       => Carbon::now(),
            'return_due_date' => $returnDueDate,
            'member_id'       => $member->id,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create(['member_id' => $member->id]);

        $response = $this->getJson("api/v1/books-history?due_date=$returnDueDate");

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($returnDueDate, $response[0]['return_due_date']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => 'Be Unique']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $book2 = factory(Book::class)->create();
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $response = $this->getJson("api/v1/books-history?search=$book1->name");

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

        $response = $this->getJson("api/v1/books-history?search=$bookItem1->book_code");

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

        $response = $this->getJson("api/v1/books-history?search=$member1->first_name");
        $searchByLastName = $this->getJson("api/v1/books-history?search=$member1->last_name");

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($member1->first_name, $response[0]['member']['first_name']);
        $this->assertEquals($member1->last_name, $searchByLastName->original['data'][0]['member']['last_name']);
    }
}
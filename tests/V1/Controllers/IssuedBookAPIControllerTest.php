<?php

namespace Tests\V1\Controllers;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\IssuedBookRepository;
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
    }

    /** @test */
    public function test_can_get_book_history()
    {
        /** @var IssuedBook[] $IssuedBooks */
        $IssuedBooks = factory(IssuedBook::class)
            ->times(5)
            ->create(['member_id' => $this->loggedInUserId]);

        $response = $this->getJson('api/v1/books-history');
        $take3 = $this->getJson('api/v1/books-history?limit=3');
        $skip2 = $this->getJson('api/v1/books-history?skip=2&limit=2');

        $response = $response->original['data'];
        $this->assertCount(5, $response);
        $this->assertContains($this->loggedInUserId, \Arr::pluck($response, 'member_id'));

        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
    }

    /** @test */
    public function it_can_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->postJson("api/v1/books/$bookItem->id/reserve-book", [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book reserved successfully.');
        $this->assertArrayHasKey('id', $response->original['data']);

        $issuedBook = IssuedBook::with('bookItem')
            ->where('member_id', $member->id)
            ->where('book_item_id', $bookItem->id)
            ->first();

        $this->assertEquals(IssuedBook::STATUS_RESERVED, $issuedBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $issuedBook->bookItem->status);
        $this->assertEquals($member->id, $issuedBook->member_id);
    }

    /** @test */
    public function it_can_un_reserve_book()
    {
        /** @var IssuedBook $issueBook */
        $issueBook = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_RESERVED]);

        $response = $this->postJson("api/v1/books/$issueBook->book_item_id/un-reserve-book", [
            'member_id' => $issueBook->member_id,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book un-reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $issueBook->fresh()->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $issueBook->bookItem->status);
        $this->assertEquals($this->loggedInUserId, $issueBook->member_id);
    }
}
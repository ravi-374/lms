<?php

namespace Tests\Controllers;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\IssuedBookRepository;
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

        $this->issueBookRepo->shouldReceive('all')
            ->once()
            ->andReturn($issuedBooks);

        $response = $this->getJson('api/b1/books-history');
        $this->assertSuccessMessageResponse($response, 'Issued Books retrieved successfully.');
        $this->assertCount(5, $response->original['data']);
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

        $this->issueBookRepo->shouldReceive('issueBook')
            ->once()
            ->with($input)
            ->andReturn($issueBook);

        $response = $this->postJson("api/b1/books/$bookItem->id/issue-book", $input);

        $this->assertSuccessMessageResponse($response, 'Book issued successfully.');
        $this->assertEquals($issueBook->member_id, $response->original['data']['member_id']);
        $this->assertEquals($issueBook->book_item_id, $response->original['data']['book_item_id']);
    }

    /** @test */
    public function it_can_return_book()
    {
        $this->mockRepository();

        /** @var IssuedBook $issueBook */
        $issueBook = factory(IssuedBook::class)->create();

        $this->issueBookRepo->shouldReceive('returnBook')
            ->once()
            ->with(['book_item_id' => $issueBook->book_item_id])
            ->andReturn($issueBook);

        $response = $this->postJson("api/b1/books/$issueBook->book_item_id/return-book", [
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

        $response = $this->getJson('api/b1/issued-books/'.$issuedBook->id);

        $this->assertSuccessMessageResponse($response, 'Issued Book retrieved successfully.');
        $this->assertEquals($issuedBook->id, $response->original['data']['id']);
    }

    /** @test */
    public function test_can_get_all_issued_books_of_given_member()
    {
        $this->mockRepository();

        $member = factory(Member::class)->create();

        /** @var IssuedBook $issuedBooks */
        $issuedBooks = factory(IssuedBook::class)->times(5)->create([
            'member_id' => $member->id,
        ]);

        $this->issueBookRepo->shouldReceive('all')
            ->once()
            ->andReturn($issuedBooks);

        $response = $this->getJson("api/b1/members/$member->id/books-history");

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
        $this->assertCount(5, $response->original['data']);
    }
}
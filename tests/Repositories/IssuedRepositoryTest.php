<?php

namespace Tests\Repositories;

use App\Models\IssuedBook;
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
}

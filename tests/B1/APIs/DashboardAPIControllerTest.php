<?php

namespace Tests\B1\APIs;

use App\Models\Book;
use App\Models\IssuedBook;
use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class DashboardAPIControllerTest
 */
class DashboardAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_counts_for_dashboard()
    {
        $books = factory(Book::class, 5)->create();
        $members = factory(Member::class, 5)->create();
        $reservedBooks = factory(IssuedBook::class,
            10)->create(['status' => IssuedBook::STATUS_RESERVED]); // 10 members/books created here
        $issuedBooks = factory(IssuedBook::class,
            2)->create(['status' => IssuedBook::STATUS_ISSUED]); // 2 members/books created here
        $overDueBooks = factory(IssuedBook::class)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'return_due_date' => Carbon::now()->subDay(),
        ]); // 1 members/books created here

        $response = $this->getJson(route('api.b1.dashboard-details'));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(5 + 10 + 2 + 1, $response['total_books']);
        $this->assertEquals(5 + 10 + 2 + 1, $response['total_members']);
        $this->assertEquals(10, $response['total_reserved_books']);
        $this->assertEquals(3, $response['total_issued_books']);
        $this->assertEquals(1, $response['total_overdue_books']);
    }
}
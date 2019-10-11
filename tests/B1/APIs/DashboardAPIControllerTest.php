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
        // 10 members/books created here
        $reservedBooks = factory(IssuedBook::class, 10)->create(['status' => IssuedBook::STATUS_RESERVED]);
        // 2 members/books created here
        $issuedBooks = factory(IssuedBook::class, 2)->create(['status' => IssuedBook::STATUS_ISSUED]);
        // 1 members/books created here
        $overDueBooks = factory(IssuedBook::class)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'return_due_date' => Carbon::now()->subDay(),
        ]);

        $response = $this->getJson(route('api.b1.dashboard-details'));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(5 + 10 + 2 + 1, $response['total_books']);
        $this->assertEquals(5 + 10 + 2 + 1, $response['total_members']);
        $this->assertEquals(10, $response['total_reserved_books']);
        $this->assertEquals(3, $response['total_issued_books']);
        $this->assertEquals(1, $response['total_overdue_books']);
    }

    /** @test */
    public function test_can_get_dashboard_statistics_for_today()
    {
        // books
        $books = factory(Book::class, 3)->create(['created_at' => Carbon::now()]);
        factory(Book::class, 2)->create(['created_at' => Carbon::now()->subDays(2)]);
        // members
        $members = factory(Member::class, 2)->create(['created_at' => Carbon::now()]);
        factory(Member::class, 3)->create(['created_at' => Carbon::now()->subDays(2)]);
        // reserved books
        $reservedBooks = factory(IssuedBook::class, 4)->create([
            'status' => IssuedBook::STATUS_RESERVED, 'reserve_date' => Carbon::now(),
        ]);
        factory(IssuedBook::class, 1)->create([
            'status' => IssuedBook::STATUS_RESERVED, 'reserve_date' => Carbon::now()->subDay(),
        ]);
        // issue books
        $issueBooks = factory(IssuedBook::class, 1)->create([
            'status' => IssuedBook::STATUS_ISSUED, 'issued_on' => Carbon::now(),
        ]);
        factory(IssuedBook::class, 4)->create([
            'status' => IssuedBook::STATUS_ISSUED, 'issued_on' => Carbon::now()->subDay(),
        ]);
        // overdue books
        $overDueBooks = factory(IssuedBook::class, 4)->create([
            'status' => IssuedBook::STATUS_ISSUED, 'return_due_date' => Carbon::now()->subDay(),
        ]);
        factory(IssuedBook::class, 1)->create([
            'status' => IssuedBook::STATUS_ISSUED, 'return_due_date' => Carbon::now(),
        ]);

        $response = $this->getJson(route('api.b1.dashboard-details', ['today' => true]));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(3 + 5 + 5 + 5, $response['total_books']);
        $this->assertEquals(2 + 5 + 5 + 5, $response['total_members']);
        $this->assertEquals(4, $response['total_reserved_books']);
        $this->assertEquals(1, $response['total_issued_books']);
        $this->assertEquals(1, $response['total_overdue_books']);
    }

    /** @test */
    public function test_can_get_statistics_for_current_month()
    {
        // books
        $books = factory(Book::class, 1)->create(['created_at' => Carbon::now()]);
        factory(Book::class, 2)->create(['created_at' => Carbon::now()->addMonths(2)]);
        // members
        $members = factory(Member::class, 3)->create(['created_at' => Carbon::now()]);
        factory(Member::class, 3)->create(['created_at' => Carbon::now()->addMonths(2)]);
        // reserved books
        $reservedBooks = factory(IssuedBook::class, 4)->create([
            'status' => IssuedBook::STATUS_RESERVED, 'reserve_date' => Carbon::now(),
        ]);
        factory(IssuedBook::class, 1)->create([
            'status' => IssuedBook::STATUS_RESERVED, 'reserve_date' => Carbon::now()->addMonths(2),
        ]);
        // issue books
        $issueBooks = factory(IssuedBook::class, 1)->create([
            'status' => IssuedBook::STATUS_ISSUED, 'issued_on' => Carbon::now()->addMonths(2),
        ]);
        factory(IssuedBook::class, 4)->create([
            'status' => IssuedBook::STATUS_ISSUED, 'issued_on' => Carbon::now(),
        ]);
        // overdue books
        $overDueBooks = factory(IssuedBook::class, 4)->create([
            'status' => IssuedBook::STATUS_ISSUED, 'return_due_date' => Carbon::now(),
        ]);
        factory(IssuedBook::class, 1)->create([
            'status' => IssuedBook::STATUS_ISSUED, 'return_due_date' => Carbon::now()->addMonths(2),
        ]);

        $startDate = Carbon::now()->startOfMonth()->toDateString();
        $endDate = Carbon::now()->endOfMonth()->toDateString();
        $response = $this->getJson(route(
                'api.b1.dashboard-details',
                ['start_date' => $startDate, 'end_date' => $endDate]
            )
        );

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(1 + 5 + 5 + 5, $response['total_books']);
        $this->assertEquals(3 + 5 + 5 + 5, $response['total_members']);
        $this->assertEquals(4, $response['total_reserved_books']);
        $this->assertEquals(4, $response['total_issued_books']);
    }

    /** @test */
    public function test_can_get_counts_of_overdue_books_for_current_month()
    {
        $this->mockTime(Carbon::now()->startOfMonth());
        factory(IssuedBook::class, 4)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'issued_on'       => Carbon::now(),
            'return_due_date' => Carbon::now()->addMonths(2),
        ]);

        factory(IssuedBook::class)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'issued_on'       => Carbon::now(),
            'return_due_date' => Carbon::now()->addDays(5),
        ]);

        $startDate = Carbon::now()->startOfMonth()->toDateString();
        $endDate = Carbon::now()->endOfMonth()->toDateString();
        $response = $this->getJson(route(
                'api.b1.dashboard-details',
                ['start_date' => $startDate, 'end_date' => $endDate]
            )
        );

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(1, $response['total_overdue_books']);
    }
}
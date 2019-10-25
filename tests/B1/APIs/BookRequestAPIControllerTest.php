<?php

namespace Tests\B1\APIs;

use App\Models\BookRequest;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookRequestAPIControllerTest
 */
class BookRequestAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_admin_can_all_book_requests()
    {
        factory(BookRequest::class, 3)->create();
        factory(BookRequest::class, 2)->create();

        $response = $this->getJson(route('api.b1.book-requests.index'));
        $take = $this->getJson(route('api.b1.book-requests.index', ['limit' => 3]));
        $skip = $this->getJson(route('api.b1.book-requests.index', ['limit' => 3, 'skip' => 3]));

        $this->assertSuccessMessageResponse($response, 'Requested books retrieved successfully.');
        $this->assertCount(5, $response->original['data']);
        $this->assertCount(3, $take->original['data']);
        $this->assertCount(2, $skip->original['data']);
    }

    /** @test */
    public function test_admin_can_get_book_requests_of_specific_member()
    {
        $bookRequest = factory(BookRequest::class)->create();
        factory(BookRequest::class, 2)->create();

        $response = $this->getJson(route('api.b1.book-requests.index', ['member_id' => $bookRequest->member_id]));

        $this->assertSuccessMessageResponse($response, 'Requested books retrieved successfully.');
        $this->assertCount(1, $response->original['data']);
    }

    /** @test */
    public function test_admin_can_approve_pending_request_book()
    {
        $bookRequest = factory(BookRequest::class)->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::APPROVED])
        );

        $this->assertSuccessMessageResponse($response, 'Book request status updated successfully.');
        $this->assertEquals(BookRequest::APPROVED, $bookRequest->fresh()->status);
    }

    /** @test */
    public function test_can_return_requested_books_count_from_isbn_number()
    {
        $bookRequest = factory(BookRequest::class)->create();
        factory(BookRequest::class)->create(['isbn' => $bookRequest->isbn]);

        $response = $this->getJson(route('api.b1.book-requests.index'));

        $this->assertEquals(2, $response->original['data'][0]['request_count']);
    }

    /** @test */
    public function test_book_requests_sort_by_book_name()
    {
        $bookRequest1 = factory(BookRequest::class)->create(['book_name' => 'ABCDE']);
        $bookRequest2 = factory(BookRequest::class)->create(['book_name' => 'ZDZDZD']);

        $responseDesc = $this->getJson(route('api.b1.book-requests.index',
                ['order_by' => 'book_name', 'direction' => 'desc'])
        );
        $responseAsc = $this->getJson(route('api.b1.book-requests.index',
                ['order_by' => 'book_name', 'direction' => 'asc'])
        );

        $this->assertEquals($bookRequest1->id, $responseAsc->original['data'][0]->id);
        $this->assertEquals($bookRequest2->id, $responseDesc->original['data'][0]->id);
    }
}
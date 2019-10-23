<?php

namespace Tests\V1\APIs;

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
        $this->signInWithMember();
    }

    /** @test */
    public function test_member_can_request_book()
    {
        $fakeBookRequest = factory(BookRequest::class)->raw();

        $response = $this->postJson(route('api.v1.book-requests.store'), $fakeBookRequest);

        $this->assertSuccessMessageResponse($response, 'Book requested created successfully.');
        $this->assertArrayHasKey('id', $response->original['data']);
        $this->assertEquals($fakeBookRequest['book_name'], $response->original['data']['book_name']);
    }

    /** @test */
    public function test_member_can_update_book_request()
    {
        $bookRequest = factory(BookRequest::class)->create(['member_id' => $this->loggedInMemberId]);
        $updateBooKRequest = factory(BookRequest::class)->raw([
            'id'        => $bookRequest->id,
            'member_id' => $this->loggedInMemberId,
        ]);

        $response = $this->putJson(route('api.v1.book-requests.update', $bookRequest->id), $updateBooKRequest);

        $this->assertSuccessMessageResponse($response, 'Book requested updated successfully.');
        $this->assertArrayHasKey('id', $response->original['data']);
        $this->assertEquals($updateBooKRequest['book_name'], $response->original['data']['book_name']);
    }

    /** @test */
    public function test_member_not_allow_to_update_book_request_of_others()
    {
        $bookRequest = factory(BookRequest::class)->create(); // other member book request
        $updateBooKRequest = factory(BookRequest::class)->raw([
            'id' => $bookRequest->id,
        ]);

        $response = $this->putJson(route('api.v1.book-requests.update', $bookRequest->id), $updateBooKRequest);

        $this->assertExceptionMessage($response, 'You can update only your book request.');
    }

    /** @test */
    public function test_member_can_get_details_of_book_request()
    {
        $bookRequest = factory(BookRequest::class)->create();

        $response = $this->getJson(route('api.v1.book-requests.show', $bookRequest->id));

        $this->assertSuccessMessageResponse($response, 'Book request retrieved successfully.');
        $this->assertEquals($bookRequest->id, $response->original['data']['id']);
    }

    /** @test */
    public function test_member_can_delete_book_request()
    {
        $bookRequest = factory(BookRequest::class)->create();

        $response = $this->deleteJson(route('api.v1.book-requests.destroy', $bookRequest->id));

        $this->assertSuccessMessageResponse($response, 'Book requested deleted successfully.');
        $this->assertEmpty(BookRequest::find($bookRequest->id));
    }

    /** @test */
    public function test_member_can_get_his_book_requests()
    {
        $bookRequests = factory(BookRequest::class, 5)->create(['member_id' => $this->loggedInMemberId]);
        factory(BookRequest::class, 2)->create();

        $response = $this->getJson(route('api.v1.book-requests.index'));

        $this->assertSuccessMessageResponse($response, 'Requested books retrieved successfully.');
        $this->assertCount(5, $response->original['data']);
    }

    /** @test */
    public function test_member_can_not_get_others_book_requests()
    {
        $bookRequests = factory(BookRequest::class, 5)->create();

        $response = $this->getJson(route('api.v1.book-requests.index', ['member_id' => $bookRequests[0]->member_id]));

        $this->assertSuccessMessageResponse($response, 'Requested books retrieved successfully.');
        $this->assertEmpty($response->original['data']);
    }
}
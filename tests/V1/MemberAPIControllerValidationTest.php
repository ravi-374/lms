<?php

namespace Tests\V1;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class MemberAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_details_of_logged_in_member()
    {
        $this->signInWithMember();
        $response = $this->get('api/v1/member-details');

        $this->assertNotEmpty($response);
        $this->assertEquals($this->loggedInMemberId, $response->original['data']->id);
    }

    /** @test */
    public function test_can_update_member_profile()
    {
        $member = factory(Member::class)->create();
        $fakeMember = factory(Member::class)->make()->toArray();

        $response = $this->postJson('api/v1/update-member-profile', $fakeMember);

        $this->assertSuccessMessageResponse($response, 'Member profile updated successfully.');
        $this->assertNotEquals($fakeMember['email'], $member->fresh()->email, 'Email should not update');
    }

    /** @test */
    public function test_can_remove_image()
    {
        $fakeMember = factory(Member::class)->make()->toArray();

        $response = $this->postJson('api/v1/remove-image');
        $this->assertSuccessDataResponse($response, $fakeMember, 'Member image removed successfully.');
    }
}
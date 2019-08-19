<?php

namespace Tests\V1\Controllers\Validations;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MemberAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    /** @test */
    public function test_can_get_details_of_logged_in_member()
    {
        $response = $this->get('api/v1/member-details');

        $this->assertNotEmpty($response);
        $this->assertEquals($this->loggedInMemberId, $response->original['data']->id);
    }

    /** @test */
    public function test_can_update_member_profile()
    {
        $member = factory(Member::class)->create();
        $fakeMember = factory(Member::class)->raw(['id' => $member->id]);

        $response = $this->postJson('api/v1/update-member-profile', $fakeMember);

        $this->assertSuccessMessageResponse($response, 'Member profile updated successfully.');
        $this->assertNotEquals($fakeMember['email'], $member->fresh()->email, 'Email should not update');
        $this->assertNotEquals($fakeMember['first_name'], $member->fresh()->first_name);
    }

    /** @test */
    public function test_can_remove_image()
    {
        $response = $this->postJson('api/v1/remove-image');

        $this->assertSuccessMessageResponse($response, 'Member image removed successfully.');
    }
}
<?php

namespace Tests\V1\APIs;

use App\Models\Member;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class MemberAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $memberRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    private function mockRepository()
    {
        $this->memberRepo = \Mockery::mock(MemberRepository::class);
        app()->instance(MemberRepository::class, $this->memberRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function it_can_update_member_profile()
    {
        $this->mockRepository();

        /** @var Member $updateRecord */
        $updateRecord = factory(Member::class)->make(['id' => $this->loggedInMemberId]);
        unset($updateRecord->email);
        unset($updateRecord->membership_plan_id);

        $this->memberRepo->expects('update')
            ->with($updateRecord->toArray(), $this->loggedInMemberId)
            ->andReturn($updateRecord);

        $response = $this->postJson(route('api.v1.update-member-profile'),$updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member profile updated successfully.');
    }

    /** @test */
    public function test_can_get_details_of_logged_in_member()
    {
        $response = $this->getJson(route('api.v1.member-details'));

        $this->assertSuccessMessageResponse($response, 'Member details retrieved successfully.');
        $this->assertNotEmpty($response);
        $this->assertEquals($this->loggedInMemberId, $response->original['data']->id);
    }

    /** @test */
    public function test_can_update_member_profile()
    {
        $member = factory(Member::class)->create();
        $fakeMember = factory(Member::class)->raw(['id' => $member->id]);

        $response = $this->postJson(route('api.v1.update-member-profile'),$fakeMember);

        $this->assertSuccessMessageResponse($response, 'Member profile updated successfully.');
        $this->assertNotEquals($fakeMember['email'], $member->fresh()->email, 'Email should not update');
        $this->assertNotEquals($fakeMember['first_name'], $member->fresh()->first_name);
    }

    /** @test */
    public function test_can_remove_image()
    {
        $response = $this->postJson(route('api.v1.remove-image'));

        $this->assertSuccessMessageResponse($response, 'Member image removed successfully.');
    }
}
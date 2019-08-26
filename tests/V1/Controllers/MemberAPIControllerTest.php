<?php

namespace Tests\V1\Controllers;

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

        $response = $this->postJson('api/v1/update-member-profile', $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member profile updated successfully.');
    }
}
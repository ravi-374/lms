<?php

namespace Tests\Controllers;

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
        $this->signInWithDefaultAdminUser();
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
    public function test_can_get_all_members()
    {
        $this->mockRepository();

        $members = factory(Member::class)->times(5)->create();

        $this->memberRepo->shouldReceive('all')
            ->once()
            ->andReturn($members);

        $response = $this->getJson('api/b1/members');

        $this->assertSuccessDataResponse(
            $response,
            $members->toArray(),
            'Members retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_create_member()
    {
        $this->mockRepository();

        /** @var Member $member */
        $member = factory(Member::class)->make();

        $this->memberRepo->shouldReceive('store')
            ->once()
            ->with($member->toArray())
            ->andReturn($member);

        $response = $this->postJson('api/b1/members', $member->toArray());

        $this->assertSuccessDataResponse($response, $member->toArray(), 'Member saved successfully.');
    }

    /** @test */
    public function it_can_update_member()
    {
        $this->mockRepository();

        /** @var Member $member */
        $member = factory(Member::class)->create();
        $updateRecord = factory(Member::class)->make(['id' => $member->id]);

        $this->memberRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $member->id)
            ->andReturn($updateRecord);

        $response = $this->putJson('api/b1/members/'.$member->id, $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->getJson("api/b1/members/$member->id");

        $this->assertSuccessDataResponse(
            $response, $member->toArray(), 'Member retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_delete_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->deleteJson("api/b1/members/$member->id");

        $this->assertSuccessDataResponse(
            $response, $member->toArray(), 'Member deleted successfully.'
        );
        $this->assertEmpty(Member::find($member->id));
    }

    /** @test */
    public function test_can_activate_member()
    {
        $this->mockRepository();

        /** @var Member $member */
        $member = factory(Member::class)->create();
        $updateRecord = factory(Member::class)->make(['id' => $member->id, 'is_active' => 0]);

        $response = $this->getJson('api/b1/members/'.$member->id.'/update-status');
        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member updated successfully.');
    }

    /** @test */
    public function test_can_de_activate_member()
    {
        $this->mockRepository();

        /** @var Member $member */
        $member = factory(Member::class)->create();
        $updateRecord = factory(Member::class)->make(['id' => $member->id, 'is_active' => 1]);

        $response = $this->getJson('api/b1/members/'.$member->id.'/update-status');
        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member updated successfully.');
    }

    /** @test */
    public function it_can_update_member_profile()
    {
        $this->mockRepository();

        $updateRecord = factory(Member::class)->make(['id' => $this->loggedInUserId]);

        $this->memberRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $this->loggedInUserId)
            ->andReturn($updateRecord);

        $response = $this->postJson('api/v1/update-member-profile', $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Member profile updated successfully.');
    }
}
<?php

namespace Tests\Controllers;

use App\Models\Member;
use App\Models\MembershipPlan;
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

        $input = array_merge($member->toArray(), ['password' => 12345678]);

        $this->memberRepo->shouldReceive('store')
            ->once()
            ->with($input)
            ->andReturn($member);

        $response = $this->postJson('api/b1/members', $input);

        $this->assertSuccessDataResponse($response, $member->toArray(), 'Member saved successfully.');
    }

    /** @test */
    public function it_can_update_member()
    {
        $this->mockRepository();

        /** @var Member $member */
        $member = factory(Member::class)->create();
        $updateRecord = factory(Member::class)->make(['id' => $member->id]);
        unset($updateRecord['email']);

        $this->memberRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $member->id)
            ->andReturn($updateRecord);

        $response = $this->postJson('api/b1/members/'.$member->id, $updateRecord->toArray());

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
        /** @var Member $member */
        $member = factory(Member::class)->create(['is_active' => false]);

        $response = $this->getJson('api/b1/members/'.$member->id.'/update-status');

        $this->assertSuccessDataResponse($response, $member->fresh()->toArray(), 'Member updated successfully.');
        $this->assertTrue($member->fresh()->is_active);
    }

    /** @test */
    public function test_can_de_activate_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create(['is_active' => true]);

        $response = $this->getJson('api/b1/members/'.$member->id.'/update-status');

        $this->assertSuccessDataResponse($response, $member->fresh()->toArray(), 'Member updated successfully.');
        $this->assertFalse($member->fresh()->is_active);
    }

    /** @test */
    public function test_can_search_members_records_by_membership_plan_name()
    {
        /** @var MembershipPlan $membershipPlan1 */
        $membershipPlan1 = factory(MembershipPlan::class)->create(['name' => 'Dynami']);
        /** @var Member $member1 */
        $member1 = factory(Member::class)->create(['membership_plan_id' => $membershipPlan1->id]);

        $membershipPlan2 = factory(MembershipPlan::class)->create();
        /** @var Member $member2 */
        $member2 = factory(Member::class)->create(['membership_plan_id' => $membershipPlan2->id]);

        $response = $this->getJson("api/b1/members?search=$membershipPlan1->name");

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($membershipPlan1->name, $response[0]['membership_plan']['name']);
    }
}
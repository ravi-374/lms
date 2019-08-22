<?php

namespace Tests\Controllers;

use App\Models\Member;
use App\Models\MembershipPlan;
use App\Repositories\MembershipPlanRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class MembershipPlanAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $membershipPlanRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->membershipPlanRepo = \Mockery::mock(MembershipPlanRepository::class);
        app()->instance(MembershipPlanRepository::class, $this->membershipPlanRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_membership_plans()
    {
        $this->mockRepository();

        $membershipPlan = factory(MembershipPlan::class)->times(5)->create();

        $this->membershipPlanRepo->shouldReceive('all')
            ->once()
            ->andReturn($membershipPlan);

        $response = $this->getJson('api/b1/membership-plans');

        $this->assertSuccessDataResponse(
            $response,
            $membershipPlan->toArray(),
            'Membership Plans retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_membership_plans()
    {
        /** @var MembershipPlan[] $membershipPlans */
        $membershipPlans = factory(MembershipPlan::class)->times(5)->create();

        $response = $this->getJson('api/b1/membership-plans');
        $take3 = $this->getJson('api/b1/membership-plans?limit=3');
        $skip2 = $this->getJson('api/b1/membership-plans?skip=2&limit=2');
        $searchByName = $this->getJson('api/b1/membership-plans?search='.$membershipPlans[0]->name);

        $this->assertCount(7, $response->original['data'], '2 defaults plan');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 7);
    }

    /** @test */
    public function it_can_create_membership_plan()
    {
        $this->mockRepository();

        /** @var MembershipPlan $membershipPlans */
        $membershipPlans = factory(MembershipPlan::class)->make();

        $this->membershipPlanRepo->shouldReceive('store')
            ->once()
            ->with($membershipPlans->toArray())
            ->andReturn($membershipPlans);

        $response = $this->postJson('api/b1/membership-plans', $membershipPlans->toArray());

        $this->assertSuccessDataResponse($response, $membershipPlans->toArray(), 'Membership Plan saved successfully.');
    }

    /** @test */
    public function it_can_update_membership_plan()
    {
        $this->mockRepository();

        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = factory(MembershipPlan::class)->create();
        $updateRecord = factory(MembershipPlan::class)->make(['id' => $membershipPlan->id]);

        $this->membershipPlanRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $membershipPlan->id)
            ->andReturn($updateRecord);

        $response = $this->putJson('api/b1/membership-plans/'.$membershipPlan->id, $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Membership Plan updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_membership_plan()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->getJson("api/b1/membership-plans/$membershipPlan->id");

        $this->assertSuccessDataResponse(
            $response, $membershipPlan->toArray(), 'Membership Plan retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_delete_membership_plan()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->deleteJson("api/b1/membership-plans/$membershipPlan->id");

        $this->assertSuccessDataResponse(
            $response, $membershipPlan->toArray(), 'Membership Plan deleted successfully.'
        );
        $this->assertEmpty(MembershipPlan::find($membershipPlan->id));
    }

    /** @test */
    public function test_unable_to_delete_membership_plan_when_its_assigned_to_one_or_more_member()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = factory(MembershipPlan::class)->create();

        /** @var Member $member */
        $member = factory(Member::class)->create(['membership_plan_id' => $membershipPlan->id]);

        $response = $this->deleteJson("api/b1/membership-plans/$member->membership_plan_id");

        $this->assertExceptionMessage($response,
            'Membership Plan can not be delete, it is assigned to one or more members.');
    }
}
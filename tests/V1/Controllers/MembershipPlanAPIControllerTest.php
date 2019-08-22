<?php

namespace Tests\V1\Controllers;

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

        $response = $this->getJson('api/v1/membership-plans');

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

        $response = $this->getJson('api/v1/membership-plans');
        $take3 = $this->getJson('api/v1/membership-plans?limit=3');
        $skip2 = $this->getJson('api/v1/membership-plans?skip=2&limit=2');
        $searchByName = $this->getJson('api/v1/membership-plans?search='.$membershipPlans[0]->name);

        $this->assertCount(7, $response->original['data'], '2 defaults plan');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 7);
    }
}
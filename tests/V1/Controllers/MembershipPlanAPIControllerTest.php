<?php

namespace Tests\V1\Controllers;

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

        $response = $this->getJson('api/v1/membership-plans');

        $this->assertSuccessDataResponse(
            $response,
            $membershipPlan->toArray(),
            'Membership Plans retrieved successfully.'
        );
    }
}
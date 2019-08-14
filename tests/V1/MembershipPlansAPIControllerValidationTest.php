<?php

namespace Tests\V1;

use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class MembershipPlansAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions, WithoutMiddleware;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_member_plans()
    {
        $membershipPlans = factory(MembershipPlan::class)->times(5)->create();

        $response = $this->getJson('api/v1/membership-plans');

        $this->assertSuccessDataResponse($response, $membershipPlans->toArray(),
            'Membership Plans retrieved successfully.');
    }
}
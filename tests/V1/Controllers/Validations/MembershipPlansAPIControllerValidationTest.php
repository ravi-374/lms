<?php

namespace Tests\V1\Controllers\Validations;

use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MembershipPlansAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

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

        $this->assertSuccessMessageResponse($response, 'Membership Plans retrieved successfully.');
        $this->assertCount(7, $response->original['data'], '2 Default');
    }
}
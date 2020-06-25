<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\MembershipPlan;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MembershipPlanAPIPermissionTest
 */
class MembershipPlanAPIPermissionTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = factory(User::class)->create();
        $token = $this->loggedInUserId->createToken('admin_token')->plainTextToken;
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_not_allow_to_create_membership_plan_without_permission()
    {
        $fakeMembershipPlan = factory(MembershipPlan::class)->raw();

        $response = $this->postJson(route('api.b1.membership-plans.store'), $fakeMembershipPlan);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_membership_plan_without_permission()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();
        $updateMembershipPlan = factory(MembershipPlan::class)->raw(['id' => $membershipPlan->id]);

        $response = $this->putJson(route('api.b1.membership-plans.update', $membershipPlan->id), $updateMembershipPlan);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_membership_plan_without_permission()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->deleteJson(route('api.b1.membership-plans.destroy', $membershipPlan->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_membership_plans_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_finance']);
        $response = $this->getJson(route('api.b1.membership-plans.index'));

        $this->assertSuccessMessageResponse($response, 'Membership Plans retrieved successfully.');
    }

    /** @test */
    public function test_can_create_membership_plan_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_finance']);
        $fakeMembershipPlan = factory(MembershipPlan::class)->raw();

        $response = $this->postJson(route('api.b1.membership-plans.store'), $fakeMembershipPlan);

        $this->assertSuccessMessageResponse($response, 'Membership Plan saved successfully.');
    }

    /** @test */
    public function test_can_update_membership_plan_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_finance']);
        $membershipPlan = factory(MembershipPlan::class)->create();
        $updateMembershipPlan = factory(MembershipPlan::class)->raw(['id' => $membershipPlan->id]);

        $response = $this->putJson(route('api.b1.membership-plans.update', $membershipPlan->id), $updateMembershipPlan);

        $this->assertSuccessMessageResponse($response, 'Membership Plan updated successfully.');
    }

    /** @test */
    public function test_can_delete_membership_plan_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_finance']);
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->deleteJson(route('api.b1.membership-plans.destroy', $membershipPlan->id));

        $this->assertSuccessMessageResponse($response, 'Membership Plan deleted successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_membership_plan_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_finance']);

        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->getJson(route('api.b1.membership-plans.show', $membershipPlan->id));

        $this->assertSuccessMessageResponse($response, 'Membership Plan retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_membership_plan_without_permission()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->get(route('api.b1.membership-plans.show', $membershipPlan->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}

<?php

namespace Tests\Controllers\Validations;

use App\Models\Member;
use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MembershipPlanAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_membership_plan_fails_when_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/membership-plans', ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_membership_plan_fails_when_price_is_not_passed()
    {
        $response = $this->postJson('api/b1/membership-plans', ['name' => $this->faker->name, 'price' => '']);

        $this->assertExceptionMessage($response, 'The price field is required.');
    }

    /** @test */
    public function test_create_membership_plan_fails_when_frequency_is_not_passed()
    {
        $response = $this->postJson('api/b1/membership-plans', [
            'name'  => $this->faker->name,
            'price' => $this->faker->randomDigit,
        ]);

        $this->assertExceptionMessage($response, 'The frequency field is required.');
    }

    /** @test */
    public function test_update_membership_plan_fails_when_name_is_not_passed()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->putJson('api/b1/membership-plans/'.$membershipPlan->id, ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_membership_plan_fails_when_price_is_not_passed()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->putJson('api/b1/membership-plans/'.$membershipPlan->id,
            ['name' => $this->faker->name, 'price' => '']
        );

        $this->assertExceptionMessage($response, 'The price field is required.');
    }

    /** @test */
    public function test_update_membership_plan_fails_when_frequency_is_not_passed()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->putJson('api/b1/membership-plans/'.$membershipPlan->id, [
            'name'  => $this->faker->name,
            'price' => $this->faker->randomDigit,
        ]);

        $this->assertExceptionMessage($response, 'The frequency field is required.');
    }

    /** @test */
    public function it_can_store_membership_plan()
    {
        $fakeMembershipPlan = factory(MembershipPlan::class)->make()->toArray();

        $response = $this->postJson('api/b1/membership-plans', $fakeMembershipPlan);

        $this->assertSuccessMessageResponse($response, 'Membership Plan saved successfully.');
        $this->assertNotEmpty(MembershipPlan::where('name', $fakeMembershipPlan['name'])->first());
    }

    /** @test */
    public function it_can_update_membership_plan()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();
        $fakeMembershipPlan = factory(MembershipPlan::class)->make()->toArray();

        $response = $this->putJson('api/b1/membership-plans/'.$membershipPlan->id, $fakeMembershipPlan);

        $this->assertSuccessMessageResponse($response, 'Membership Plan updated successfully.');
        $this->assertEquals($fakeMembershipPlan['name'], $membershipPlan->fresh()->name);
    }

    /** @test */
    public function test_can_not_delete_membership_plan_when_plan_is_assigned_to_member()
    {
        $plan = factory(MembershipPlan::class)->create();
        $vishal = factory(Member::class)->create(['membership_plan_id' => $plan->id]);

        $response = $this->deleteJson('api/b1/membership-plans/'.$plan->id);

        $this->assertExceptionMessage($response,
            'Membership Plan can not be delete, it is assigned to one or more members.');
    }

    /** @test */
    public function it_can_delete_membership_plan()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();

        $response = $this->deleteJson('api/b1/membership-plans/'.$membershipPlan->id);

        $this->assertSuccessMessageResponse($response, 'Membership Plan deleted successfully.');
        $this->assertEmpty(MembershipPlan::where('name', $membershipPlan->name)->first());
    }
}

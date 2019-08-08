<?php

namespace Tests\Repositories;

use App\Models\MembershipPlan;
use App\Repositories\MembershipPlanRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MembershipPlanRepositoryTest.
 */
class MembershipPlanRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MembershipPlanRepository */
    protected $membershipPlanRepo;

    private $defaultUserId = 1;

    public function setUp(): void
    {
        parent::setUp();

        $this->membershipPlanRepo = app(MembershipPlanRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test
     */
    public function it_can_store_membership_plan()
    {
        $input = [
            'name'      => $this->faker->name,
            'price'     => $this->faker->word,
            'frequency' => MembershipPlan::MONTHLY_FREQUENCY,
        ];

        $membershipPlanResult = $this->membershipPlanRepo->store($input)->toArray();

        $this->assertArrayHasKey('id', $membershipPlanResult);
        $this->assertEquals($input['name'], $membershipPlanResult['name']);
    }

    /** @test */
    public function it_can_update_membership_plan()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();
        $inputs = [
            'name'      => $this->faker->name,
            'price'     => $this->faker->word,
            'frequency' => MembershipPlan::MONTHLY_FREQUENCY,
        ];

        $membershipPlan = $this->membershipPlanRepo->update($inputs, $membershipPlan->id)->toArray();

        $this->assertArrayHasKey('id', $membershipPlan);
        $this->assertEquals($inputs['name'], $membershipPlan['name']);
    }

    /** @test */
    public function test_can_generate_membership_plan_id()
    {
        $generatedMemberShipPlanId = $this->membershipPlanRepo->generateMembershipPlanId();

        $this->assertNotEmpty($generatedMemberShipPlanId);
    }

}
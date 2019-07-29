<?php

namespace Tests\Controllers\Validations;

use App\Models\Member;
use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class MemberControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware($this->skipMiddleware());
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_member_fails_when_first_name_is_not_passed()
    {
        $this->post('api/b1/members', ['first_name' => ''])
            ->assertSessionHasErrors(['first_name' => 'The first name field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_last_name_is_not_passed()
    {
        $this->post('api/b1/members', ['last_name' => ''])
            ->assertSessionHasErrors(['last_name' => 'The last name field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_email_is_not_passed()
    {
        $this->post('api/b1/members', ['email' => ''])
            ->assertSessionHasErrors(['email' => 'The email field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_password_is_not_passed()
    {
        $this->post('api/b1/members', ['password' => ''])
            ->assertSessionHasErrors(['password' => 'The password field is required.']);
    }

    /** @test */
    public function test_create_member_fails_when_email_is_duplicate()
    {
        $ankit = factory(Member::class)->create();

        $this->post('api/b1/members', ['email' => $ankit->email])
            ->assertSessionHasErrors(['email' => 'The email has already been taken.']);
    }

    /** @test */
    public function test_update_member_fails_when_first_name_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->post('api/b1/members/'.$ankit->id, ['first_name' => ''])
            ->assertSessionHasErrors(['first_name' => 'The first name field is required.']);
    }

    /** @test */
    public function test_update_member_fails_when_last_name_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->post('api/b1/members/'.$ankit->id, ['last_name' => ''])
            ->assertSessionHasErrors(['last_name' => 'The last name field is required.']);
    }

    /** @test */
    public function test_update_member_when_email_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->post('api/b1/members/'.$ankit->id, [
            'first_name' => 'Ankit',
            'last_name'  => 'Kalathiya',
            'email'      => '',
        ])->assertSessionHasNoErrors();
    }

    /** @test */
    public function test_update_member_when_password_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $this->post('api/b1/members/'.$ankit->id, [
            'first_name' => 'Ankit',
            'last_name'  => 'Kalathiya',
            'password'   => '',
        ])->assertSessionHasNoErrors();
    }

    /** @test */
    public function it_can_store_member()
    {
        $membershipPlan = factory(MembershipPlan::class)->create();
        $firstName = $this->faker->firstName;
        $lastName = $this->faker->lastName;
        $email = $this->faker->unique()->email;
        $password = $this->faker->password;
        $membershipPlanId = $membershipPlan->id;
        $phone = $this->faker->phoneNumber;
        $response = $this->postJson('api/b1/members', [
            'first_name'         => $firstName,
            'last_name'          => $lastName,
            'email'              => $email,
            'password'           => $password,
            'membership_plan_id' => $membershipPlanId,
            'phone'              => $phone,
        ]);

        $this->assertSuccessMessageResponse($response, 'Member saved successfully.');
        $this->assertNotEmpty(Member::whereFirstName($firstName)->first());
        $this->assertNotEmpty(Member::whereLastName($lastName)->first());
        $this->assertNull(Member::wherePassword($password)->first());
        $this->assertNotEmpty(Member::whereEmail($email)->first());
        $this->assertNotEmpty(Member::whereMembershipPlanId($membershipPlanId)->first());
        $this->assertNotEmpty(Member::wherePhone($phone)->first());
    }

    /** @test */
    public function it_can_update_member()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();
        $membershipPlan = factory(MembershipPlan::class)->create();
        $firstName = $this->faker->firstName;
        $lastName = $this->faker->lastName;
        $email = $this->faker->email;
        $password = $this->faker->password;
        $phone = $this->faker->phoneNumber;
        $membershipPlanId = $membershipPlan->id;
        $response = $this->postJson('api/b1/members/'.$member->id, [
            'first_name'         => $firstName,
            'last_name'          => $lastName,
            'email'              => $email,
            'password'           => $password,
            'membership_plan_id' => $membershipPlanId,
            'phone'              => $phone,
        ]);

        $this->assertSuccessMessageResponse($response, 'Member updated successfully.');
        $this->assertEquals($firstName, $member->fresh()->first_name);
        $this->assertEquals($lastName, $member->fresh()->last_name);
        $this->assertEquals($phone, $member->fresh()->phone);
        $this->assertEquals($membershipPlanId, $member->fresh()->membership_plan_id);
    }
}
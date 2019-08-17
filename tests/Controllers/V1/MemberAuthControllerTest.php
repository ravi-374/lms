<?php

namespace Tests\Controllers;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MemberAuthControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_can_reset_password()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        $key = $member->email.'|'.date('Y-m-d H:i:s');
        $token = encrypt($key);
        $input = ['token' => $token, 'password' => '1nfy0m'];

        $response = $this->postJson('api/v1/reset-member-password', $input);

        $this->assertSuccessMessageResponse($response, 'Password updated successfully.');
    }

    /** @test */
    public function test_unable_to_reset_password_of_non_existing_email()
    {
        $key = $this->faker->email.'|'.date('Y-m-d H:i:s');
        $token = encrypt($key);
        $input = ['token' => $token, 'password' => '1nfy0m'];

        $response = $this->postJson('api/v1/reset-member-password', $input);

        $this->assertJsonErrorMessageResponse($response, 'User with given email not available.');
    }

    /** @test */
    public function test_unable_to_reset_password_when_activate_link_has_expired()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        $key = $member->email.'|'.date('Y-m-d H:i:s', strtotime('-1 day'));
        $token = encrypt($key);
        $input = ['token' => $token, 'password' => '1nfy0m'];

        $response = $this->postJson('api/v1/reset-member-password', $input);

        $this->assertJsonErrorMessageResponse($response, 'The activate link has expired.');
    }

    /** @test */
    public function test_unable_to_verify_member_account_without_token()
    {
        $response = $this->getJson('api/v1/activate-member');

        $this->assertJsonErrorMessageResponse($response, 'token not found.');
    }

    /** @test */
    public function test_can_verify_and_activate_member_account()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create([
            'activation_code' => 123456,
            'is_active'       => false,
        ]);
        $key = $member->id.'|'.$member->activation_code;
        $token = encrypt($key);

        $response = $this->getJson("api/v1/activate-member?token=$token");

        $this->assertSuccessMessageResponse($response, 'Your account has been activated successfully.');
        $this->assertTrue($member->fresh()->is_active);
    }
}
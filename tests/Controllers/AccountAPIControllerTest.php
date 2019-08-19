<?php

namespace Tests\Controllers;

use App\Models\Member;
use App\User;
use Tests\TestCase;

class AccountAPIControllerTest extends TestCase
{

    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_can_reset_password()
    {
        /** @var Member $member */
        $member = factory(User::class)->create();

        $key = $member->email.'|'.date('Y-m-d H:i:s');
        $token = encrypt($key);
        $input = [
            'token'    => $token,
            'password' => 'InfyOm',
        ];

        $response = $this->postJson('api/b1/reset-password', $input);

        $this->assertSuccessMessageResponse($response, 'Password updated successfully.');
    }

    /** @test */
    public function test_unable_to_reset_password_of_non_existing_email()
    {
        $key = $this->faker->email.'|'.date('Y-m-d H:i:s');
        $token = encrypt($key);
        $input = [
            'token'    => $token,
            'password' => 'InfyOm',
        ];

        $response = $this->postJson('api/b1/reset-password', $input);

        $this->assertJsonErrorMessageResponse($response, 'User with given email not available.');
    }

    /** @test */
    public function test_unable_to_reset_password_when_activate_link_has_expired()
    {
        /** @var Member $member */
        $member = factory(User::class)->create();

        $key = $member->email.'|'.date('Y-m-d H:i:s', strtotime('-1 day'));
        $token = encrypt($key);
        $input = [
            'token'    => $token,
            'password' => 'InfyOm',
        ];

        $response = $this->postJson('api/b1/reset-password', $input);

        $this->assertJsonErrorMessageResponse($response, 'The activate link has expired.');
    }
}
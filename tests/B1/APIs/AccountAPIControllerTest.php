<?php

namespace Tests\B1\APIs;

use App\Models\Member;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class AccountAPIControllerTest
 * @package Tests\Controllers
 */
class AccountAPIControllerTest extends TestCase
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
        $member = factory(User::class)->create();
        $token = encrypt($member->email.'|'.date('Y-m-d H:i:s'));
        $input = ['token' => $token, 'password' => $this->faker->password];

        $response = $this->postJson('api/b1/reset-password', $input);

        $this->assertSuccessMessageResponse($response, 'Password updated successfully.');
    }

    /** @test */
    public function test_unable_to_reset_password_of_non_existing_email()
    {
        $token = encrypt($this->faker->email.'|'.date('Y-m-d H:i:s'));
        $input = ['token' => $token, 'password' => $this->faker->password];

        $response = $this->postJson('api/b1/reset-password', $input);

        $this->assertJsonErrorMessageResponse($response, 'User with given email not available.');
    }

    /** @test */
    public function test_unable_to_reset_password_when_activate_link_has_expired()
    {
        /** @var Member $member */
        $member = factory(User::class)->create();
        $token = encrypt($member->email.'|'.date('Y-m-d H:i:s', strtotime('-1 day')));
        $input = ['token' => $token, 'password' => $this->faker->password];

        $response = $this->postJson('api/b1/reset-password', $input);

        $this->assertJsonErrorMessageResponse($response, 'The activate link has expired.');
    }
}
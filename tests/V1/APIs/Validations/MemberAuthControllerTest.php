<?php

namespace Tests\V1\APIs\Validations;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MemberAuthControllerTest
 */
class MemberAuthControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_member_can_not_registered_without_email()
    {
        $response = $this->postJson(route('api.v1.register-member', ['email' => '']));

        $this->assertExceptionMessage($response, 'The email field is required.');
    }

    /** @test */
    public function test_member_can_not_registered_without_password()
    {
        $fakeMember = factory(Member::class)->raw(['password' => '']);

        $response = $this->postJson(route('api.v1.register-member', $fakeMember));

        $this->assertExceptionMessage($response, 'The password field is required.');
    }
}
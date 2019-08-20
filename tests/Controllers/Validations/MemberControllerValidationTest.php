<?php

namespace Tests\Controllers\Validations;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class MemberControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_member_fails_when_first_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/members', ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }

    /** @test */
    public function test_create_member_fails_when_last_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/members', ['first_name' => $this->faker->name, 'last_name' => '']);

        $this->assertExceptionMessage($response, 'The last name field is required.');
    }

    /** @test */
    public function test_create_member_fails_when_email_is_not_passed()
    {
        $response = $this->postJson('api/b1/members',
            ['first_name' => $this->faker->name, 'last_name' => $this->faker->name, 'email' => '']
        );

        $this->assertExceptionMessage($response, 'The email field is required.');
    }

    /** @test */
    public function test_create_member_fails_when_password_is_not_passed()
    {
        $response = $this->postJson('api/b1/members',
            ['first_name' => $this->faker->name, 'last_name' => $this->faker->name, 'email' => $this->faker->email]
        );

        $this->assertExceptionMessage($response, 'The password field is required.');
    }

    /** @test */
    public function test_create_member_fails_when_password_length_is_less_than_six_character()
    {
        $response = $this->postJson('api/b1/members',
            [
                'first_name' => $this->faker->name,
                'last_name'  => $this->faker->name,
                'email'      => $this->faker->email,
                'password'   => 12345,
            ]
        );

        $this->assertExceptionMessage($response, 'The password must be at least 6 characters.');
    }

    /** @test */
    public function test_create_member_fails_when_membership_plan_id_is_not_passed()
    {
        $response = $this->postJson('api/b1/members', [
            'first_name' => $this->faker->name,
            'last_name'  => $this->faker->name,
            'email'      => $this->faker->email,
            'password'   => 1234567,
        ]);

        $this->assertExceptionMessage($response, 'The membership plan id field is required.');
    }

    /** @test */
    public function test_create_member_fails_when_email_is_duplicate()
    {
        $ankit = factory(Member::class)->create();

        $response = $this->postJson('api/b1/members', [
            'first_name' => $this->faker->name,
            'last_name'  => $this->faker->name,
            'email'      => $ankit->email,
            'password'   => 1234567,
        ]);

        $this->assertExceptionMessage($response, 'The email has already been taken.');
    }

    /** @test */
    public function test_update_member_fails_when_first_name_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $response = $this->postJson('api/b1/members/'.$ankit->id, ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }

    /** @test */
    public function test_update_member_fails_when_last_name_is_not_passed()
    {
        $ankit = factory(Member::class)->create();

        $response = $this->postJson('api/b1/members/'.$ankit->id,
            ['first_name' => $this->faker->name, 'last_name' => '']
        );

        $this->assertExceptionMessage($response, 'The last name field is required.');
    }

    /** @test */
    public function it_can_store_member()
    {
        $fakeMember = factory(Member::class)->make()->toArray();
        $response = $this->postJson('api/b1/members', array_merge($fakeMember, ['password' => $this->faker->password]));

        $this->assertSuccessMessageResponse($response, 'Member saved successfully.');
        $this->assertNotEmpty(Member::whereEmail($fakeMember['email'])->first());
    }

    /** @test */
    public function it_can_update_member()
    {
        $member = factory(Member::class)->create();
        $fakeMember = factory(Member::class)->make()->toArray();

        $response = $this->postJson('api/b1/members/'.$member->id, $fakeMember);

        $this->assertSuccessMessageResponse($response, 'Member updated successfully.');
        $this->assertNotEquals($fakeMember['email'], $member->fresh()->email, 'Email should not update');
    }
}
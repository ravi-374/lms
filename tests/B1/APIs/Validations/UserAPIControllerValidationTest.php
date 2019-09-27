<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class UserAPIControllerValidationTest
 */
class UserAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_user_fails_when_first_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.users.store'), ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }

    /** @test */
    public function test_create_user_fails_when_last_name_is_not_passed()
    {
        $input = factory(User::class)->raw(['last_name' => '']);

        $response = $this->postJson(route('api.b1.users.store'), $input);

        $this->assertExceptionMessage($response, 'The last name field is required.');
    }

    /** @test */
    public function test_create_user_fails_when_email_is_not_passed()
    {
        $input = factory(User::class)->raw(['email' => '']);

        $response = $this->postJson(route('api.b1.users.store'), $input);

        $this->assertExceptionMessage($response, 'The email field is required.');
    }

    /** @test */
    public function test_create_users_fails_when_password_is_not_passed()
    {
        $input = factory(User::class)->raw(['password' => '']);

        $response = $this->postJson(route('api.b1.users.store'), $input);

        $this->assertExceptionMessage($response, 'The password field is required.');
    }

    /** @test */
    public function test_create_user_fails_when_password_length_is_less_than_six_character()
    {
        $input = factory(User::class)->raw(['password' => 12345]);

        $response = $this->postJson(route('api.b1.users.store'), $input);

        $this->assertExceptionMessage($response, 'The password must be at least 6 characters.');
    }

    /** @test */
    public function test_create_user_fails_when_role_is_not_passed()
    {
        $input = factory(User::class)->raw();

        $response = $this->postJson(route('api.b1.users.store'), array_merge($input, ['role_id' => '']));

        $this->assertExceptionMessage($response, 'User must have at least one role.');
    }

    /** @test */
    public function test_create_user_fails_when_role_is_not_valid()
    {
        $input = factory(User::class)->raw();

        $response = $this->postJson(route('api.b1.users.store'), array_merge($input, ['role_id' => 'string']));

        $this->assertExceptionMessage($response, 'The role id must be an integer.');
    }

    /** @test */
    public function test_create_user_fails_when_email_is_duplicate()
    {
        /** @var User $ankit */
        $ankit = factory(User::class)->create();
        $input = factory(User::class)->raw(['email' => $ankit->email]);

        $response = $this->postJson(route('api.b1.users.store'), $input);

        $this->assertExceptionMessage($response, 'The email has already been taken.');
    }

    /** @test */
    public function test_update_user_fails_when_first_name_is_not_passed()
    {
        $ankit = factory(User::class)->create();

        $response = $this->postJson(route('api.b1.users.update', $ankit->id), ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }

    /** @test */
    public function test_update_user_fails_when_last_name_is_not_passed()
    {
        $ankit = factory(User::class)->create();
        $input = factory(User::class)->raw(['last_name' => '']);

        $response = $this->postJson(route('api.b1.users.update', $ankit->id), $input);

        $this->assertExceptionMessage($response, 'The last name field is required.');
    }

    /** @test */
    public function test_update_user_fails_when_email_is_not_passed()
    {
        $farhan = factory(User::class)->create();
        $input = factory(User::class)->raw(['email' => '']);

        $response = $this->postJson(route('api.b1.users.update', $farhan->id), $input);

        $this->assertExceptionMessage($response, 'The email field is required.');
    }

    /** @test */
    public function test_update_user_fails_when_email_is_duplicate()
    {
        $farhan = factory(User::class)->create();
        $vishal = factory(User::class)->create();
        $input = factory(User::class)->raw(['email' => $farhan->email]);

        $response = $this->postJson(route('api.b1.users.update', $vishal->id), $input);

        $this->assertExceptionMessage($response, 'The email has already been taken.');
    }

    /** @test */
    public function test_update_user_fails_when_role_is_not_valid()
    {
        $farhan = factory(User::class)->create();
        $input = factory(User::class)->raw();

        $response = $this->postJson(route('api.b1.users.update', $farhan->id),
            array_merge($input, ['role_id' => 'string'])
        );

        $this->assertExceptionMessage($response, 'The role id must be an integer.');
    }

    /** @test */
    public function it_can_store_user()
    {
        $user = factory(User::class)->create();
        $fakeUser = factory(User::class)->raw(['id' => $user->id]);
        $role = factory(Role::class)->create();
        $fakeUser['roles'] = $role->id;

        $response = $this->postJson(route('api.b1.users.store'), array_merge($fakeUser, [
            'password' => $this->faker->password,
            'role_id'  => $role->id,
        ]));

        $this->assertSuccessMessageResponse($response, 'User saved successfully.');
        $user->fresh()->roles;
        $this->assertNotEmpty(User::whereEmail($fakeUser['email'])->first());
    }

    /** @test */
    public function it_can_update_user()
    {
        $user = factory(User::class)->create();
        $fakeUser = factory(User::class)->raw();

        $response = $this->postJson(route('api.b1.users.update', $user->id), $fakeUser);

        $this->assertSuccessMessageResponse($response, 'User updated successfully.');
        $this->assertEquals($fakeUser['email'], $user->fresh()->email);
    }
}

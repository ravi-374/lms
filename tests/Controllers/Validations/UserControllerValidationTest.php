<?php

namespace Tests\Controllers\Validations;

use App\Models\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class UserControllerValidationTest extends TestCase
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
        $response = $this->postJson('api/b1/users', ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }

    /** @test */
    public function test_create_user_fails_when_last_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/users', ['first_name' => $this->faker->firstName, 'last_name' => '']);

        $this->assertExceptionMessage($response, 'The last name field is required.');
    }

    /** @test */
    public function test_create_user_fails_when_email_is_not_passed()
    {
        $response = $this->postJson('api/b1/users',
            ['first_name' => $this->faker->name, 'last_name' => $this->faker->lastName, 'email' => '']);

        $this->assertExceptionMessage($response, 'The email field is required.');
    }

    /** @test */
    public function test_create_users_fails_when_password_is_not_passed()
    {
        $response = $this->postJson('api/b1/users',
            [
                'first_name' => $this->faker->name,
                'last_name'  => $this->faker->lastName,
                'email'      => $this->faker->email,
                'password'   => '',
            ]);

        $this->assertExceptionMessage($response, 'The password field is required.');
    }

    /** @test */
    public function test_create_user_fails_when_password_length_is_less_than_six_character()
    {
        $response = $this->postJson('api/b1/users',
            [
                'first_name' => $this->faker->name,
                'last_name'  => $this->faker->lastName,
                'email'      => $this->faker->email,
                'password'   => 12345,
            ]);
        $this->assertExceptionMessage($response, 'The password must be at least 6 characters.');
    }

    /** @test */
    public function test_create_user_fails_when_role_is_not_passed()
    {
        $response = $this->postJson('api/b1/users', [
            'first_name' => $this->faker->name,
            'last_name'  => $this->faker->lastName,
            'email'      => $this->faker->email,
            'password'   => 123456,
            'role_id'    => '',
        ]);

        $this->assertExceptionMessage($response, 'User must have at least one role.');
    }

    /** @test */
    public function test_create_user_fails_when_role_is_not_valid()
    {
        $response = $this->postJson('api/b1/users', [
            'first_name' => $this->faker->name,
            'last_name'  => $this->faker->lastName,
            'email'      => $this->faker->email,
            'password'   => 123456,
            'role_id'    => 'string',
        ]);

        $this->assertExceptionMessage($response, 'The role id must be an integer.');
    }

    /** @test */
    public function test_create_user_fails_when_email_is_duplicate()
    {
        $ankit = factory(User::class)->create();

        $response = $this->postJson('api/b1/users', [
            'first_name' => $this->faker->name,
            'last_name'  => $this->faker->lastName,
            'email'      => $ankit->email,
        ]);

        $this->assertExceptionMessage($response, 'The email has already been taken.');
    }

    /** @test */
    public function test_update_user_fails_when_first_name_is_not_passed()
    {
        $ankit = factory(User::class)->create();

        $response = $this->postJson('api/b1/users/'.$ankit->id, ['first_name' => '']);

        $this->assertExceptionMessage($response, 'The first name field is required.');
    }

    /** @test */
    public function test_update_user_fails_when_last_name_is_not_passed()
    {
        $ankit = factory(User::class)->create();

        $response = $this->postJson('api/b1/users/'.$ankit->id,
            ['first_name' => $this->faker->name, 'last_name' => '']
        );

        $this->assertExceptionMessage($response, 'The last name field is required.');
    }

    /** @test */
    public function test_update_user_fails_when_email_is_not_passed()
    {
        $farhan = factory(User::class)->create();

        $response = $this->postJson('api/b1/users/'.$farhan->id,
            ['first_name' => $this->faker->name, 'last_name' => $this->faker->lastName, 'email' => '']);
        $this->assertExceptionMessage($response, 'The email field is required.');
    }

    /** @test */
    public function test_update_user_fails_when_email_is_duplicate()
    {
        $farhan = factory(User::class)->create();
        $vishal = factory(User::class)->create();

        $response = $this->postJson('api/b1/users/'.$vishal->id, [
            'first_name' => $this->faker->name,
            'last_name'  => $this->faker->lastName,
            'email'      => $farhan->email,
        ]);
        $this->assertExceptionMessage($response, 'The email has already been taken.');
    }

    /** @test */
    public function test_update_user_fails_when_role_is_not_valid()
    {
        $ankit = factory(User::class)->create();
        $response = $this->postJson('api/b1/users/'.$ankit->id, [
            'first_name' => $this->faker->name,
            'last_name'  => $this->faker->lastName,
            'email'      => $ankit->email,
            'password'   => 123456,
            'role_id'    => 'string',
        ]);

        $this->assertExceptionMessage($response, 'The role id must be an integer.');

    }

    /** @test */
    public function it_can_store_user()
    {
        $user = factory(User::class)->create();
        $fakeUser = factory(User::class)->raw();
        $role = factory(Role::class)->create();
        $fakeUser['roles'] = $role->id;
        $response = $this->postJson('api/b1/users', array_merge($fakeUser, [
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

        $response = $this->postJson('api/b1/users/'.$user->id, $fakeUser);

        $this->assertSuccessMessageResponse($response, 'User updated successfully.');
        $this->assertEquals($fakeUser['email'], $user->fresh()->email);
    }

    /** @test */
    public function test_can_delete_user()
    {
        $user = factory(User::class)->create();

        $response = $this->deleteJson('api/b1/users/'.$user->id);

        $this->assertSuccessMessageResponse($response, 'User deleted successfully.');
        $this->assertEmpty(User::find($user->id));
    }

    /** @test */
    public function test_can_activate_user()
    {
        /** @var User $user */
        $user = factory(User::class)->create(['is_active' => 0]);

        $response = $this->getJson('api/b1/users/'.$user->id.'/update-status');

        $this->assertSuccessDataResponse($response, $user->fresh()->toArray(), 'User updated successfully.');
        $this->assertTrue($user->fresh()->is_active);
    }

    /** @test */
    public function test_can_de_activate_user()
    {
        /** @var User $user */
        $user = factory(User::class)->create(['is_active' => 1]);

        $response = $this->getJson('api/b1/users/'.$user->id.'/update-status');

        $this->assertSuccessDataResponse($response, $user->fresh()->toArray(), 'User updated successfully.');
        $this->assertFalse($user->fresh()->is_active);
    }

    /** @test */
    public function test_can_get_details_of_logged_in_user()
    {
        $response = $this->get('api/b1/user-details');

        $this->assertNotEmpty($response);
        $this->assertEquals($this->loggedInUserId, $response->original['data']->id);
    }
}
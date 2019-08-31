<?php

namespace Tests;

use App\Models\Member;
use App\Models\Permission;
use App\Models\Role;
use App\User;
use Faker\Factory;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\TestResponse;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /** @var \Faker\Generator */
    public $faker;

    public $loggedInUserId;
    public $loggedInMemberId;

    public function signInWithDefaultAdminUser()
    {
        $user = User::first();
        $this->loggedInUserId = $user->id;

        return $this->actingAs($user);
    }

    public function signInWithMember()
    {
        $member = factory(Member::class)->create();
        $this->loggedInMemberId = $member->id;

        return $this->actingAs($member);
    }

    public function __construct($name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);

        $this->faker = Factory::create();
    }

    /**
     * @param TestResponse $response
     * @param string $message
     */
    public function assertSuccessMessageResponse(TestResponse $response, string $message)
    {
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => $message,
            ]);
    }

    /**
     * @param TestResponse $response
     * @param array $data
     * @param string $message
     */
    public function assertSuccessDataResponse(TestResponse $response, array $data, string $message)
    {
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => $message,
                'data'    => $data,
            ]);
    }

    /**
     * @param TestResponse $response
     * @param string $message
     */
    public function assertExceptionMessage(TestResponse $response, string $message)
    {
        $this->assertEquals($message, $response->original['message']);
    }

    /**
     * @param TestResponse $response
     * @param string $message
     */
    public function assertErrorMessageResponse(TestResponse $response, string $message)
    {
        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => $message,
            ]);
    }

    /**
     * @param TestResponse $response
     * @param string $message
     */
    public function assertJsonErrorMessageResponse(TestResponse $response, string $message)
    {
        $response->assertJson([
            'success' => false,
            'message' => $message,
        ]);
    }

    /**
     * @param int|User $userId
     * @param array $permissions
     *
     * @return User
     */
    public function assignPermissions($userId, $permissions)
    {
        /** @var Role $role */
        $role = factory(Role::class)->create();

        foreach ($permissions as $permission) {
            $permission = Permission::whereName($permission)->first();
            $role->attachPermission($permission);
        }

        /** @var User $user */
        $user = (is_int($userId)) ? User::findOrFail($userId) : $userId;
        $user->attachRole($role);

        return $user;
    }
}

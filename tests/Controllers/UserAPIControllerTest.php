<?php

namespace Tests\Controllers;

use App\Models\Address;
use App\Models\Role;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class UserAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $userRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->userRepo = \Mockery::mock(UserRepository::class);
        app()->instance(UserRepository::class, $this->userRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_users()
    {
        $this->mockRepository();

        $users = factory(User::class)->times(5)->create();

        $this->userRepo->shouldReceive('all')
            ->once()
            ->andReturn($users);

        $response = $this->getJson('api/b1/users');

        $this->assertSuccessDataResponse(
            $response,
            $users->toArray(),
            'Users retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_get_users()
    {
        /** @var User $users */
        $users = factory(User::class)->times(5)->create();

        $response = $this->getJson('api/b1/users');
        $search = $this->getJson('api/b1/users?search='.$users[0]->first_name);
        $take3 = $this->getJson('api/b1/users?limit=3');
        $skip2 = $this->getJson('api/b1/users?skip=2&limit=2');

        $response = $response->original['data'];
        $this->assertCount(6, $response, '1 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $this->assertCount(1, $search->original['data']);
        $this->assertEquals($users[0]->first_name, $search->original['data'][0]['first_name']);
    }

    /** @test */
    public function it_can_create_user()
    {
        $this->mockRepository();

        /** @var User $farhan */
        $farhan = factory(User::class)->make();
        $role = factory(Role::class)->create();

        $input = array_merge($farhan->toArray(), [
            'password' => 12345678,
            'role_id'  => $role->id,
        ]);

        $this->userRepo->shouldReceive('store')
            ->once()
            ->with($input)
            ->andReturn($farhan);

        $response = $this->postJson('api/b1/users', $input);

        $this->assertSuccessDataResponse($response, $farhan->toArray(), 'User saved successfully.');
    }

    /** @test */
    public function it_can_update_user()
    {
        $this->mockRepository();

        /** @var User $farhan */
        $farhan = factory(User::class)->create();
        $updateRecord = factory(User::class)->make(['id' => $farhan->id]);

        $this->userRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $farhan->id)
            ->andReturn($updateRecord);

        $response = $this->putJson('api/b1/users/'.$farhan->id, $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'User updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_user_with_roles_and_address()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();
        $farhan->roles()->sync([$role->id]);

        $address = factory(Address::class)->create();
        $farhan->address()->save($address);

        $response = $this->getJson("api/b1/users/$farhan->id");

        $this->assertSuccessDataResponse(
            $response,
            $farhan->toArray(),
            'User retrieved successfully.'
        );
        $response = $response->original['data'];
        $this->assertNotEmpty($response['roles']);
        $this->assertEquals($role->id, $response['roles'][0]['id']);

        $this->assertNotEmpty($response['address']);
        $this->assertEquals($address->id, $response['address']['id']);
    }

    /** @test */
    public function it_can_delete_user()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->create();

        $response = $this->deleteJson("api/b1/users/$farhan->id");

        $this->assertSuccessDataResponse(
            $response,
            $farhan->toArray(),
            'User deleted successfully.'
        );
        $this->assertEmpty(User::find($farhan->id));
    }

    /** @test */
    public function it_can_update_user_profile()
    {
        $this->mockRepository();

        $updateRecord = factory(User::class)->make(['id' => $this->loggedInUserId]);

        $this->userRepo->shouldReceive('update')
            ->once()
            ->with($updateRecord->toArray(), $this->loggedInUserId)
            ->andReturn($updateRecord);

        $response = $this->postJson('api/b1/update-user-profile', $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'User profile updated successfully.');
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
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

        $this->userRepo->expects('all')->andReturn($users);

        $response = $this->getJson('api/b1/users');

        $this->assertSuccessDataResponse(
            $response,
            $users->toArray(),
            'Users retrieved successfully.'
        );
        $this->assertEquals(6, $response->original['totalRecords'], 'default 1');
    }

    /** @test */
    public function test_can_search_and_get_users()
    {
        /** @var User[] $users */
        $users = factory(User::class)->times(5)->create();

        $response = $this->getJson('api/b1/users');
        $take3 = $this->getJson('api/b1/users?limit=3');
        $skip2 = $this->getJson('api/b1/users?skip=2&limit=2');
        $searchByName = $this->getJson('api/b1/users?search='.$users[0]->first_name);

        $this->assertCount(6, $response->original['data'], '1 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 6);
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

        $this->userRepo->expects('store')
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

        $this->userRepo->expects('update')
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

        $this->userRepo->expects('update')
            ->with($updateRecord->toArray(), $this->loggedInUserId)
            ->andReturn($updateRecord);

        $response = $this->postJson('api/b1/update-user-profile', $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'User profile updated successfully.');
    }

    /** @test */
    public function test_can_search_users_records_by_role_name()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->create();

        /** @var Role $firstRole */
        $firstRole = factory(Role::class)->create(['name' => 'editor']);
        $farhan->roles()->sync([$firstRole->id]);

        /** @var User $vishal */
        $vishal = factory(User::class)->create();

        /** @var Role $secondRole */
        $secondRole = factory(Role::class)->create(['name' => 'manager']);
        $vishal->roles()->sync([$secondRole->id]);

        $response = $this->getJson("api/b1/users?search=$firstRole->name");

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($firstRole->name, $response[0]['roles'][0]['name']);
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
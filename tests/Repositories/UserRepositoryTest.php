<?php

namespace Tests\Repositories;

use App\Models\Address;
use App\Models\Role;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
/**
 * Class UserRepositoryTest
 * @package Tests\Repositories
 */
class UserRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var UserRepository
     */
    private $userRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->userRepo = app(UserRepository::class);
    }


    /** @test */
    public function test_can_get_all_users()
    {
        /** @var User $users */
        $users = factory(User::class)->times(2)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();

        $users[0]->roles()->sync([$role->id]);
        $users[1]->roles()->sync([$role->id]);

        $address = factory(Address::class)->create();

        $users[0]->address()->save($address);
        $users[1]->address()->save($address);

        $userList = $this->userRepo->all([]);

        $this->assertEquals($users[0]->id, $userList[1]->id);
        $this->assertEquals($users[1]->id, $userList[0]->id);

        $this->assertNotEmpty($userList[0]->roles);
        $this->assertNotEmpty($userList[0]->address);
    }

    /** @test */
    public function test_can_store_user()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->make(['password' => 123456]);

        /** @var Role $role */
        $role = factory(Role::class)->create();

        $input = array_merge($farhan->toArray(), [
            'password'  => 123456,
            'role_id'   => $role->id,
            'address_1' => $this->faker->address,
        ]);
        $user = $this->userRepo->store($input);

        $this->assertArrayHasKey('id', $user);

        $this->assertCount(1, $user->roles);
        $this->assertEquals($role->id, $user->roles[0]->id);

        $this->assertNotEmpty($user->address);
    }

    /** @test */
    public function test_can_update_user()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();

        $inputs = [
            'first_name' => 'random name',
            'role_id'    => $role->id,
            'address_1'  => $this->faker->address,
        ];
        $user = $this->userRepo->update($inputs, $farhan->id);

        $this->assertArrayHasKey('id', $user);

        $this->assertEquals('random name', $user->first_name);
        $this->assertCount(1, $user->roles);
        $this->assertEquals($role->id, $user->roles[0]->id);

        $this->assertNotEmpty($user->address);
    }
}
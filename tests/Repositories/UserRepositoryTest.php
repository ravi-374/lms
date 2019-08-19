<?php

namespace Tests\Repositories;

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
        factory(User::class)->times(10)->create();

        $users = $this->userRepo->all();
        $take3 = $this->userRepo->all([], null, 3);
        $skip4 = $this->userRepo->all([], 4, 5);

        $this->assertCount(11, $users, '1 default user');
        $this->assertCount(3, $take3);
        $this->assertCount(5, $skip4);
    }

    /** @test */
    public function test_can_store_user()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->raw(['password' => 123456]);

        /** @var Role $role */
        $role = factory(Role::class)->create();

        $input = array_merge($farhan, [
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
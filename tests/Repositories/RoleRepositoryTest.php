<?php

namespace Tests\Repositories;

use App\Models\Permission;
use App\Models\Role;
use App\Repositories\RoleRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class RoleRepositoryTest.
 */
class RoleRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var RoleRepository */
    protected $roleRepo;

    private $defaultUserId = 1;

    public function setUp(): void
    {
        parent::setUp();

        $this->roleRepo = app(RoleRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_role()
    {
        /** @var Role $roles */
        $roles = factory(Role::class)->times(3)->create();

        $allBookSeries = $this->roleRepo->all();
        $take3 = $this->roleRepo->all([], null, 3);
        $skip2 = $this->roleRepo->all([], 2, 4);

        $this->assertCount(5, $allBookSeries);
        $this->assertCount(3, $take3);
        $this->assertCount(3, $skip2);
    }

    /** @test
     */
    public function it_can_store_role()
    {
        $permission = factory(Permission::class)->create();
        $fakeRole = factory(Role::class)->make()->toArray();
        $fakeRole['permissions'][] =['name' => $this->faker->name];
        $fakeRole['permissions'][] =['name' => $this->faker->name];
        $input = [
            'name'        => $this->faker->name,
            'permissions' => [$permission->id],
        ];

        $roleResult = $this->roleRepo->store($input);

        $this->assertArrayHasKey('id', $roleResult);
        $this->assertEquals($input['name'], $roleResult['name']);
        $this->assertCount(2, $fakeRole->permissions);
    }

    /** @test */
    public function it_can_update_role()
    {
        $permission = factory(Permission::class)->create();
        $role = factory(Role::class)->make()->toArray();
        $role['permissions'][] =['name' => $this->faker->name];
        $role['permissions'][] =['name' => $this->faker->name];
        $inputs = [
            'name'        => $this->faker->name,
            'permissions' => [$permission->id],
        ];

        $role = $this->roleRepo->update($inputs, $role->id);

        $this->assertArrayHasKey('id', $role);
        $this->assertEquals($inputs['name'], $role['name']);
        $this->assertEquals($inputs['permissions'], $role['permissions']);
    }
}

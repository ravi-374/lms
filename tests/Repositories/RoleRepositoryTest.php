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

    public function setUp(): void
    {
        parent::setUp();
        $this->roleRepo = app(RoleRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_role()
    {
        /** @var Role[] $roles */
        $roles = factory(Role::class, 5)->create();

        $allRoles = $this->roleRepo->all();
        $take3 = $this->roleRepo->all([], null, 3);
        $skip4 = $this->roleRepo->all([], 4, 5);

        // 2 Default roles
        $this->assertCount(7, $allRoles, '2 Default');
        $this->assertCount(3, $take3);
        $this->assertCount(3, $skip4);
    }

    /** @test */
    public function it_can_store_role()
    {
        $fakeRole = factory(Role::class)->raw();
        $permission = factory(Permission::class)->create();
        $fakeRole['permissions'] = [$permission->id];

        $result = $this->roleRepo->store($fakeRole);

        $this->assertArrayHasKey('id', $result);
        $this->assertEquals($fakeRole['name'], $result['name']);
        $this->assertCount(1, $result->permissions);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage Role not found.
     */
    public function test_unable_to_update_non_existing_role()
    {
        /** @var Role $role */
        $role = factory(Role::class)->raw();

        $this->roleRepo->update($role, 999);
    }

    /** @test */
    public function it_can_update_role()
    {
        $role = factory(Role::class)->create();
        $permission = factory(Permission::class, 2)->create();
        $fakeRole = factory(Role::class)->raw();
        $fakeRole['permissions'] = [$permission[0]->id, $permission[1]->id];

        $result = $this->roleRepo->update($fakeRole, $role['id']);

        $this->assertArrayHasKey('id', $result);
        $this->assertEquals($fakeRole['name'], $result->name);
        $this->assertCount(2, $result->permissions);
    }
}

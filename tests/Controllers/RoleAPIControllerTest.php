<?php

namespace Tests\Controllers;

use App\Models\Permission;
use App\Models\Role;
use App\Repositories\RoleRepository;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class RoleAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $roleRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    private function mockRepository()
    {
        $this->roleRepository = \Mockery::mock(RoleRepository::class);
        app()->instance(RoleRepository::class, $this->roleRepository);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_roles()
    {
        $this->mockRepository();

        $roles = factory(Role::class)->times(5)->create();

        $this->roleRepository->shouldReceive('all')
            ->once()
            ->andReturn($roles);

        $response = $this->getJson('api/b1/roles');

        $this->assertSuccessDataResponse($response, $roles->toArray(), 'Roles retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_roles()
    {
        /** @var Role[] $roles */
        $roles = factory(Role::class)->times(5)->create();

        $response = $this->getJson('api/b1/roles');
        $take3 = $this->getJson('api/b1/roles?limit=3');
        $skip2 = $this->getJson('api/b1/roles?skip=2&limit=2');
        $searchByName = $this->getJson('api/b1/roles?search='.$roles[0]->name);

        $this->assertCount(7, $response->original['data'], '2 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 7);
    }

    /** @test */
    public function it_can_store_role()
    {
        $this->mockRepository();

        $permission = factory(Permission::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->make(['permissions' => [$permission->id]]);

        $this->roleRepository->shouldReceive('store')
            ->once()
            ->with($role->toArray())
            ->andReturn($role);

        $response = $this->postJson('api/b1/roles', $role->toArray());

        $this->assertSuccessDataResponse($response, $role->toArray(), 'Role saved successfully.');
    }

    /** @test */
    public function it_can_update_role()
    {
        $this->mockRepository();

        $permission = factory(Permission::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();

        $updateRole = array_merge(
            factory(Role::class)->make(['id' => $role->id])->toArray(),
            ['permissions' => [$permission->id]]
        );

        $this->roleRepository->shouldReceive('update')
            ->once()
            ->with($updateRole, $role->id)
            ->andReturn($role);

        $response = $this->putJson("api/b1/roles/$role->id", $updateRole);

        $this->assertSuccessDataResponse($response, $role->toArray(), 'Role updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_role()
    {
        $permission = factory(Permission::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();
        $role->perms()->sync([$permission->id]);

        $response = $this->getJson("api/b1/roles/$role->id");

        $this->assertSuccessDataResponse($response, $role->toArray(), 'Role retrieved successfully.');
        $this->assertEquals($permission->id, $response->original['data']['perms'][0]['id']);
    }

    /** @test */
    public function it_can_delete_role()
    {
        $role = factory(Role::class)->create();

        $response = $this->deleteJson('api/b1/roles/'.$role->id);

        $this->assertSuccessMessageResponse($response, 'Role deleted successfully.');
        $this->assertEmpty(Role::where('name', $role->name)->first());
    }

    /** @test */
    public function test_unable_to_delete_role_when_is_assigned_to_user()
    {
        $user = factory(User::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();
        $role->users()->sync([$user->id]);

        $response = $this->deleteJson("api/b1/roles/$role->id");

        $this->assertErrorMessageResponse($response, 'Role is assigned to one or more users.');
    }
}
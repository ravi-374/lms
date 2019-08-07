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
        $this->withoutMiddleware($this->skipMiddleware());
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

        $this->assertSuccessMessageResponse($response, 'Roles retrieved successfully.');
        $this->assertCount(5, $response->original['data']);

        $data = \Arr::pluck($response->original['data'], 'name');
        $roles->map(function (Role $role) use ($data) {
            $this->assertContains($role->name, $data);
        });
    }

    /** @test */
    public function it_can_store_role()
    {
        $this->mockRepository();

        $permission = factory(Role::class)->create();

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

        $permission = factory(Role::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();

        $updateRole = array_merge($role->toArray(), ['permissions' => [$permission->id]]);

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
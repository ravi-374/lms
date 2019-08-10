<?php

namespace Tests\Controllers;

use App\Models\Permission;
use App\Repositories\PermissionRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery\MockInterface;
use Tests\TestCase;

class PermissionAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MockInterface */
    protected $permissionRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
        $this->withoutMiddleware($this->skipMiddleware());
    }

    private function mockRepository()
    {
        $this->permissionRepo = \Mockery::mock(PermissionRepository::class);
        app()->instance(PermissionRepository::class, $this->permissionRepo);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        \Mockery::close();
    }

    /** @test */
    public function test_can_get_all_permissions()
    {
        $this->mockRepository();

        /** @var Permission $permissions */
        $permissions = factory(Permission::class)->times(5)->create();

        $this->permissionRepo->shouldReceive('all')
            ->once()
            ->andReturn($permissions);

        $response = $this->getJson('api/b1/permissions');

        $this->assertSuccessDataResponse($response, $permissions->toArray(), 'Permissions retrieved successfully.');
    }

    /** @test */
    public function it_can_create_permission()
    {
        $this->mockRepository();

        /** @var Permission $permission */
        $permission = factory(Permission::class)->make();

        $this->permissionRepo->shouldReceive('create')
            ->once()
            ->with($permission->toArray())
            ->andReturn($permission);

        $response = $this->postJson('api/b1/permissions', $permission->toArray());

        $this->assertSuccessDataResponse($response, $permission->toArray(), 'Permission saved successfully.');
    }

    /** @test */
    public function it_can_update_permission()
    {
        $this->mockRepository();

        /** @var Permission $permission */
        $permission = factory(Permission::class)->create();
        $fakePermission = factory(Permission::class)->make(['id' => $permission->id]);

        $this->permissionRepo->shouldReceive('update')
            ->once()
            ->with($fakePermission->toArray(), $permission->id)
            ->andReturn($fakePermission);

        $response = $this->putJson('api/b1/permissions/'.$permission->id, $fakePermission->toArray());

        $this->assertSuccessDataResponse(
            $response,
            $fakePermission->toArray(),
            'Permission updated successfully.'
        );
    }

    /** @test */
    public function it_can_retrieve_permission()
    {
        /** @var Permission $permission */
        $permission = factory(Permission::class)->create();

        $response = $this->getJson('api/b1/permissions/'.$permission->id);

        $this->assertSuccessDataResponse($response, $permission->toArray(), 'Permission retrieved successfully.');

    }

    /** @test */
    public function it_can_delete_permission()
    {
        /** @var Permission $permission */
        $permission = factory(Permission::class)->create();

        $response = $this->deleteJson("api/b1/permissions/$permission->id");

        $this->assertSuccessDataResponse($response, $permission->toArray(), 'Permission deleted successfully.');
        $this->assertEmpty(Permission::find($permission->id));
    }
}

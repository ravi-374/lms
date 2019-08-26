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

        $this->permissionRepo->expects('all')->andReturn($permissions);

        $response = $this->getJson('api/b1/permissions');

        $this->assertSuccessDataResponse($response, $permissions->toArray(), 'Permissions retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_permissions()
    {
        /** @var Permission[] $permissions */
        $permissions = factory(Permission::class)->times(5)->create();

        $response = $this->getJson('api/b1/permissions');
        $take3 = $this->getJson('api/b1/permissions?limit=3');
        $skip2 = $this->getJson('api/b1/permissions?skip=2&limit=2');
        $searchByName = $this->getJson('api/b1/permissions?search='.$permissions[0]->name);

        $this->assertCount(19, $response->original['data'], '14 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 19);
    }

    /** @test */
    public function it_can_create_permission()
    {
        $this->mockRepository();

        /** @var Permission $permission */
        $permission = factory(Permission::class)->make();

        $this->permissionRepo->expects('create')
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

        $this->permissionRepo->expects('update')
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

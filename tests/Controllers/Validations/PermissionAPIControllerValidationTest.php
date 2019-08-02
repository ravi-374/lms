<?php

namespace Tests\Controllers\Validations;

use App\Models\Permission;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PermissionAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware($this->skipMiddleware());
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_permission_fails_when_name_is_not_passed()
    {
        $this->post('api/b1/permissions', ['name' => ''])
            ->assertSessionHasErrors(['name' => 'The name field is required.']);
    }

    /** @test */
    public function test_create_permission_fails_when_name_is_duplicate()
    {
        $permission = factory(Permission::class)->create();

        $this->post('api/b1/permissions/', ['name' => $permission->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function test_update_permission_fails_when_name_is_not_passed()
    {
        $permission = factory(Permission::class)->create();

        $this->put('api/b1/permissions/'.$permission->id, ['name' => ''])
            ->assertSessionHasErrors(['name' => 'The name field is required.']);
    }

    /** @test */
    public function test_update_permission_fails_when_name_is_duplicate()
    {
        $permission1 = factory(Permission::class)->create();
        $permission2 = factory(Permission::class)->create();

        $this->put('api/b1/permissions/'.$permission2->id, ['name' => $permission1->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function it_can_store_permission()
    {
        $fakePermission = factory(Permission::class)->make()->toArray();
        $response = $this->postJson('api/b1/permissions', $fakePermission);

        $this->assertSuccessMessageResponse($response, 'Permission saved successfully.');
        $this->assertNotEmpty(Permission::where('name', $fakePermission['name'])->first());
    }

    /** @test */
    public function it_can_update_permission()
    {
        $permission = factory(Permission::class)->create();
        $fakePermission = factory(Permission::class)->make()->toArray();

        $response = $this->putJson('api/b1/permissions/'.$permission->id,$fakePermission);

        $this->assertSuccessMessageResponse($response, 'Permission updated successfully.');
        $this->assertEquals($fakePermission['name'], $permission->fresh()->name);
    }

    /** @test */
    public function it_can_delete_permission()
    {
        $permission = factory(Permission::class)->create();

        $response = $this->deleteJson('api/b1/permissions/'.$permission->id);

        $this->assertSuccessMessageResponse($response, 'Permission deleted successfully.');
        $this->assertEmpty(Permission::where('name', $permission->name)->first());
    }
}
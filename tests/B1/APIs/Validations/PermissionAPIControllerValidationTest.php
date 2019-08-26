<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Permission;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PermissionAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_create_permission_fails_when_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/permissions', ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_permission_fails_when_name_is_duplicate()
    {
        $permission = factory(Permission::class)->create();

        $response = $this->postJson('api/b1/permissions/', ['name' => $permission->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_permission_fails_when_name_is_not_passed()
    {
        $permission = factory(Permission::class)->create();

        $response = $this->putJson('api/b1/permissions/'.$permission->id, ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_permission_fails_when_name_is_duplicate()
    {
        $permission1 = factory(Permission::class)->create();
        $permission2 = factory(Permission::class)->create();

        $response = $this->putJson('api/b1/permissions/'.$permission2->id, ['name' => $permission1->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function it_can_store_permission()
    {
        $fakePermission = factory(Permission::class)->raw();
        $response = $this->postJson('api/b1/permissions', $fakePermission);

        $this->assertSuccessMessageResponse($response, 'Permission saved successfully.');
        $this->assertNotEmpty(Permission::where('name', $fakePermission['name'])->first());
    }

    /** @test */
    public function it_can_update_permission()
    {
        $permission = factory(Permission::class)->create();
        $fakePermission = factory(Permission::class)->raw();

        $response = $this->putJson('api/b1/permissions/'.$permission->id, $fakePermission);

        $this->assertSuccessMessageResponse($response, 'Permission updated successfully.');
        $this->assertEquals($fakePermission['name'], $permission->fresh()->name);
    }
}

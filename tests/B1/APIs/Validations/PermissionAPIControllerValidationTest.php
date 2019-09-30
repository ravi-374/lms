<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Permission;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class PermissionAPIControllerValidationTest
 */
class PermissionAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_permission_fails_when_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.permissions.store', ['name' => '']));

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_permission_fails_when_name_is_duplicate()
    {
        $permission = factory(Permission::class)->create();

        $response = $this->postJson(route('api.b1.permissions.store', ['name' => $permission->name]));

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_permission_fails_when_name_is_not_passed()
    {
        $permission = factory(Permission::class)->create();

        $response = $this->putJson(route('api.b1.permissions.update', $permission->id), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_permission_fails_when_name_is_duplicate()
    {
        $permission1 = factory(Permission::class)->create();
        $permission2 = factory(Permission::class)->create();

        $response = $this->putJson(route('api.b1.permissions.update', $permission2->id), [
            'name' => $permission1->name,
        ]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function it_can_store_permission()
    {
        $fakePermission = factory(Permission::class)->raw();
        $response = $this->postJson(route('api.b1.permissions.store', $fakePermission));

        $this->assertSuccessMessageResponse($response, 'Permission saved successfully.');
        $this->assertNotEmpty(Permission::where('name', $fakePermission['name'])->first());
    }

    /** @test */
    public function it_can_update_permission()
    {
        $permission = factory(Permission::class)->create();
        $fakePermission = factory(Permission::class)->raw();

        $response = $this->putJson(route('api.b1.permissions.update', $permission->id), $fakePermission);

        $this->assertSuccessMessageResponse($response, 'Permission updated successfully.');
        $this->assertEquals($fakePermission['name'], $permission->fresh()->name);
    }
}

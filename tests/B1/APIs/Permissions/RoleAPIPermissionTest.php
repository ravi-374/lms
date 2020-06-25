<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Permission;
use App\Models\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class RoleAPIPermissionTest
 */
class RoleAPIPermissionTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = factory(User::class)->create();
        $token = $this->loggedInUserId->createToken('admin_token')->plainTextToken;
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_not_allow_to_get_roles_without_permission()
    {
        $response = $this->getJson(route('api.b1.roles.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_role_without_permission()
    {
        $fakeRole = factory(Role::class)->raw();

        $response = $this->postJson(route('api.b1.roles.store'), $fakeRole);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_role_without_permission()
    {
        $role = factory(Role::class)->create();
        $updateRole = factory(Role::class)->raw(['id' => $role->id]);

        $response = $this->putJson(route('api.b1.roles.update', $role->id), $updateRole);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_role_without_permission()
    {
        $role = factory(Role::class)->create();

        $response = $this->deleteJson(route('api.b1.roles.destroy', $role->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_roles_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $response = $this->getJson(route('api.b1.roles.index'));

        $this->assertSuccessMessageResponse($response, 'Roles retrieved successfully.');
    }

    /** @test */
    public function test_can_create_role_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $permission = factory(Permission::class)->create();
        $fakeRole = factory(Role::class)->raw(['permissions' => [$permission->id]]);

        $response = $this->postJson(route('api.b1.roles.store'), $fakeRole);

        $this->assertSuccessMessageResponse($response, 'Role saved successfully.');
    }

    /** @test */
    public function test_can_update_role_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $permission = factory(Permission::class)->create();
        $role = factory(Role::class)->create();
        $updateRole = factory(Role::class)->raw(['id' => $role->id, 'permissions' => [$permission->id]]);

        $response = $this->putJson(route('api.b1.roles.update', $role->id), $updateRole);

        $this->assertSuccessMessageResponse($response, 'Role updated successfully.');
    }

    /** @test */
    public function test_can_delete_role_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $role = factory(Role::class)->create();

        $response = $this->deleteJson(route('api.b1.roles.destroy', $role->id));

        $this->assertSuccessMessageResponse($response, 'Role deleted successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_role_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $role = factory(Role::class)->create();

        $response = $this->getJson(route('api.b1.roles.show', $role->id));

        $this->assertSuccessMessageResponse($response, 'Role retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_role_without_permission()
    {
        $role = factory(Role::class)->create();

        $response = $this->get(route('api.b1.roles.show', $role->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}

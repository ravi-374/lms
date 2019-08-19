<?php

namespace Tests\Controllers\Validations;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class RoleAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp(): void
    {
        parent::setUp();

        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_role_fails_when_name_is_not_passed()
    {
        $response = $this->postJson('api/b1/roles', ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_role_fails_when_name_is_duplicate()
    {
        $role = factory(Role::class)->create();

        $response = $this->postJson('api/b1/roles/', ['name' => $role->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_create_role_fails_when_permissions_not_passed()
    {
        $response = $this->postJson('api/b1/roles/', ['name' => $this->faker->name, 'permissions' => []]);

        $this->assertExceptionMessage($response, 'Role must have at least one permission.');
    }

    /** @test */
    public function test_update_role_fails_when_name_is_not_passed()
    {
        $role = factory(Role::class)->create();

        $response = $this->putJson('api/b1/roles/'.$role->id, ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_role_fails_when_name_is_duplicate()
    {
        $role1 = factory(Role::class)->create();
        $role2 = factory(Role::class)->create();

        $response = $this->putJson('api/b1/roles/'.$role2->id, ['name' => $role1->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_role_fails_when_permissions_not_passed()
    {
        $role = factory(Role::class)->create();

        $response = $this->putJson('api/b1/roles/'.$role->id, ['name' => $this->faker->name, 'permissions' => []]);

        $this->assertExceptionMessage($response, 'Role must have at least one permission.');
    }

    /** @test */
    public function it_can_store_role()
    {
        $inputs = $this->prepareRoleInputs();

        $response = $this->postJson('api/b1/roles', $inputs);

        $this->assertSuccessMessageResponse($response, 'Role saved successfully.');
        $this->assertEquals($inputs['name'], $response->original['data']['name']);
        $this->assertEquals($inputs['permissions'][0], $response->original['data']['perms'][0]['id']);

    }

    /** @test */
    public function it_can_update_role()
    {
        /** @var Role $role */
        $role = factory(Role::class)->create();

        $inputs = $this->prepareRoleInputs();
        $response = $this->putJson('api/b1/roles/'.$role->id, $inputs);

        $this->assertSuccessMessageResponse($response, 'Role updated successfully.');
        $this->assertEquals($inputs['name'], $response->original['data']['name']);
    }

    /** @test */
    public function it_can_delete_role()
    {
        $role = factory(Role::class)->create();

        $response = $this->deleteJson('api/b1/roles/'.$role->id);

        $this->assertSuccessMessageResponse($response, 'Role deleted successfully.');
        $this->assertEmpty(Role::where('name', $role->name)->first());
    }

    public function prepareRoleInputs($input = [])
    {
        $permission = factory(Permission::class)->create();

        return array_merge([
            'name'        => $this->faker->name,
            'permissions' => [$permission->id],
        ], $input);
    }
}

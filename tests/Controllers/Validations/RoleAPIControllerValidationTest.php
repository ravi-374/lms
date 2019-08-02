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

        $this->withoutMiddleware($this->skipMiddleware());
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_role_fails_when_name_is_not_passed()
    {
        $this->post('api/b1/roles', ['name' => ''])
            ->assertSessionHasErrors(['name' => 'The name field is required.']);
    }

    /** @test */
    public function test_create_role_fails_when_name_is_duplicate()
    {
        $role = factory(Role::class)->create();

        $this->post('api/b1/roles/', ['name' => $role->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function test_update_role_fails_when_name_is_not_passed()
    {
        $role = factory(Role::class)->create();

        $this->put('api/b1/roles/'.$role->id, ['name' => ''])
            ->assertSessionHasErrors(['name' => 'The name field is required.']);
    }

    /** @test */
    public function test_update_role_fails_when_name_is_duplicate()
    {
        $role1 = factory(Role::class)->create();
        $role2 = factory(Role::class)->create();

        $this->put('api/b1/roles/'.$role2->id, ['name' => $role1->name])
            ->assertSessionHasErrors(['name' => 'The name has already been taken.']);
    }

    /** @test */
    public function it_can_store_role()
    {
        $role = factory(Role::class)->make()->toArray();
        $permission = factory(Permission::class)->create();
        $role['permissions'] = [$permission->id];

        $response = $this->postJson('api/b1/roles', $role);

        $this->assertSuccessMessageResponse($response, 'Role saved successfully.');
    }

    /** @test */
    public function it_can_update_role()
    {
        /** @var Role $role */
        $role = factory(Role::class)->create();

        $response = $this->putJson('api/b1/roles/'.$role->id, $this->prepareRoleInputs());

        $this->assertSuccessMessageResponse($response, 'Role updated successfully.');
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

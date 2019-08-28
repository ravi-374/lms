<?php

namespace Tests\B1\APIs;

use App\Models\Permission;
use App\Models\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AuthAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var $authRepository */
    protected $authRepository;

    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_can_get_app_config()
    {
        $farhan = factory(User::class)->create();
        $this->actingAs($farhan);

        /** @var Permission $permission */
        $permission = factory(Permission::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();
        $role->perms()->sync([$permission->id]);
        $farhan->roles()->sync([$role->id]);

        $response = $this->getJson(route('api.b1.config'));

        $this->assertSuccessMessageResponse($response, 'Config retrieved successfully.');
        $this->assertEquals($farhan->id, $response->original['data']['user']['id']);

        $this->assertCount(1, $response->original['data']['roles']);
        $this->assertEquals($role->id, $response->original['data']['roles'][0]['id']);

        $this->assertCount(1, $response->original['data']['permissions']);
        $this->assertEquals($permission->id, $response->original['data']['permissions'][0]['id']);
    }
}
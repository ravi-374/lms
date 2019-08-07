<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookLanguage;
use App\Models\BookSeries;
use App\Models\Permission;
use App\Models\Publisher;
use App\Models\Role;
use App\Repositories\BookRepository;
use App\Repositories\BookSeriesRepository;
use App\Repositories\RoleRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class RoleRepositoryTest.
 */
class RoleRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var RoleRepository */
    protected $roleRepo;

    private $defaultUserId = 1;

    public function setUp(): void
    {
        parent::setUp();

        $this->roleRepo = app(RoleRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test
     */
    public function it_can_store_role()
    {
        $permission = factory(Permission::class)->create();
        $input = [
            'name'        => $this->faker->name,
            'permissions' => [$permission->id],
        ];

        $roleResult = $this->roleRepo->store($input)->toArray();

        $this->assertArrayHasKey('id', $roleResult);
        $this->assertEquals($input['name'], $roleResult['name']);
    }

    /** @test */
    public function it_can_update_role()
    {
        $role = factory(Role::class)->create();
        $permission = factory(Permission::class)->create();
        $inputs = [
            'name'        => $this->faker->name,
            'permissions' => [$permission->id],
        ];

        $role = $this->roleRepo->update($inputs, $role->id)->toArray();

        $this->assertArrayHasKey('id', $role);
        $this->assertEquals($inputs['name'], $role['name']);
    }
}

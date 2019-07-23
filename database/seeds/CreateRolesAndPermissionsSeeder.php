<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 *
 * User: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 6/19/2019
 * Time: 4:16 PM
 */

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

/**
 * Class PopulateRolesAndPermissionsSeeder
 */
class CreateRolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var Role $admin */
        $admin = Role::whereName('admin')->first();
        /** @var Role $librarian */
        $librarian = Role::whereName('librarian')->first();

        $permissions = Permission::all();
        $admin->attachPermissions($permissions);

        $permissions = Permission::whereNotIn('name', ['manage_roles', 'manage_finance', 'manage_plans'])->get();
        $librarian->attachPermissions($permissions);
    }
}
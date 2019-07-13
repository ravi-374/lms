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
class PopulateRolesAndPermissionsSeeder extends Seeder
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

        $librarianPermissions = [
            'manage_books',
            'issue_books',
            'manage_members',
            'manage_authors',
            'manage_publishers',
            'manage_book_series',
            'manage_users',
            'manage_book_languages',
            'manage_tags',
        ];
        $permissions = Permission::whereIn('name', $librarianPermissions)->get();
        $librarian->attachPermissions($permissions);
    }
}
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
use Illuminate\Database\Seeder;

/**
 * Class CreatePermissionsSeeder
 */
class CreatePermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions[] = [
            'name'         => 'manage_books',
            'display_name' => 'Can Manage Books',
            'description'  => 'Create/Update/Delete Books, Book Series, Book Languages, Authors, Publishers, Tags',
        ];
        $permissions[] = [
            'name'         => 'issue_books',
            'display_name' => 'Can Manage Issue Books',
            'description'  => 'Can Manage Issue Books',
        ];
        $permissions[] = [
            'name'         => 'manage_members',
            'display_name' => 'Can Manage Members',
            'description'  => 'Create/Update/Delete Members',
        ];
        $permissions[] = [
            'name'         => 'manage_finance',
            'display_name' => 'Can Manage Finance',
            'description'  => 'Manage Membership Plans, Payments',
        ];
        $permissions[] = [
            'name'         => 'manage_settings',
            'display_name' => 'Can Manage Settings',
            'description'  => 'Manage Settings',
        ];
        $permissions[] = [
            'name'         => 'manage_roles',
            'display_name' => 'Can Manage Roles and permission',
            'description'  => 'Manage Roles and permission',
        ];
        $permissions[] = [
            'name'         => 'manage_authors',
            'display_name' => 'Can Manage Authors',
            'description'  => 'Manage Authors',
        ];
        $permissions[] = [
            'name'         => 'manage_publishers',
            'display_name' => 'Can Manage Publishers',
            'description'  => 'Manage Publishers',
        ];
        $permissions[] = [
            'name'         => 'manage_book_series',
            'display_name' => 'Can Manage Book Series',
            'description'  => 'Manage Book Series',
        ];
        $permissions[] = [
            'name'         => 'manage_users',
            'display_name' => 'Can Manage Users',
            'description'  => 'Manage Users',
        ];
        $permissions[] = [
            'name'         => 'manage_book_language',
            'display_name' => 'Can Manage Book Language',
            'description'  => 'Manage Book Language',
        ];
        $permissions[] = [
            'name'         => 'manage_Plans',
            'display_name' => 'Can Manage Plans',
            'description'  => 'Manage Plans',
        ];
        $permissions[] = [
            'name'         => 'manage_tags',
            'display_name' => 'Can Manage Tags',
            'description'  => 'Manage Tags',
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}
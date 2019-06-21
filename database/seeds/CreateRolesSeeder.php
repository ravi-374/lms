<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 *
 * User: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 6/19/2019
 * Time: 4:16 PM
 */

use App\Models\Role;
use Illuminate\Database\Seeder;

/**
 * Class CreateRolesSeeder
 */
class CreateRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles[] = [
            'name'         => 'admin',
            'display_name' => 'Library Admin',
            'description'  => 'Library Admin',
        ];
        $roles[] = [
            'name'         => 'librarian',
            'display_name' => 'Librarian',
            'description'  => 'Librarian',
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
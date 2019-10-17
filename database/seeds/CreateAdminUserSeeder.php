<?php

use App\Models\Role;
use App\User;
use Illuminate\Database\Seeder;

class CreateAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $input = [
            'first_name' => 'LMS',
            'last_name'  => 'Admin',
            'email'      => 'admin@lms.com',
            'password'   => Hash::make('lms@12345'),
            'is_active'  => true,
        ];

        /** @var User $user */
        $user = User::create($input);

        /** @var Role $adminRole */
        $adminRole = Role::whereName('admin')->first();
        $user->roles()->attach($adminRole);

    }
}

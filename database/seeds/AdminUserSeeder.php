<?php

use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
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
            'last_name' => 'Admin',
            'email' => 'admin@lms.com',
            'password' => Hash::make('lms@12345')
        ];

        \App\User::create($input);
    }
}

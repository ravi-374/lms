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
            'name' => 'LMS Admin',
            'email' => 'admin@lms.local',
            'password' => Hash::make('lms@12345')
        ];

        \App\User::create($input);
    }
}

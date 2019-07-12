<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CreateRolesSeeder::class);
        $this->call(CreatePermissionsSeeder::class);
        $this->call(PopulateRolesAndPermissionsSeeder::class);
        $this->call(PopulateGenres::class);
        $this->call(PopulateBookLanguages::class);
        $this->call(AdminUserSeeder::class);
    }
}

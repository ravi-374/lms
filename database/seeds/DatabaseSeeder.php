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
        $this->call(PopulateGenresSeeder::class);
        $this->call(PopulateBookLanguagesSeeder::class);
        $this->call(AdminUserSeeder::class);
        $this->call(PopulateCountriesSeeder::class);
        $this->call(PopulateAuthorsSeeder::class);
        $this->call(PopulatePublishersSeeder::class);
        $this->call(PopulateTagsSeeder::class);
        $this->call(PopulatePlansSeeder::class);
    }
}

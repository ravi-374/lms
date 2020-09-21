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
        $this->call(CreateRolesAndPermissionsSeeder::class);
        $this->call(CreateGenresSeeder::class);
        $this->call(CreateBookLanguagesSeeder::class);
        $this->call(CreateDefaultUsersSeeder::class);
        $this->call(CreateCountriesSeeder::class);
        $this->call(CreateAuthorsSeeder::class);
        $this->call(CreatePublishersSeeder::class);
        $this->call(CreateTagsSeeder::class);
        $this->call(CreatePlansSeeder::class);
        $this->call(CreateSettingsSeeder::class);
        $this->call(CreateHomepageSettingsSeeder::class);
        $this->call(CreateDefaultMemberSeeder::class);
        $this->call(DefaultMemberSettingsSeeder::class);
        $this->call(CreateBookDueReminderSetting::class);
        $this->call(CreateNewHomePageSettingsSeeder::class);
    }
}

<?php

use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * Class CreateSettingsSeeder
 */
class CreateSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings[] = ['currency', 'INR', 'Indian Rupee'];
        $settings[] = ['return_due_days', 15, 'Return Due Days'];
        $settings[] = ['reserve_due_days', 5, 'Reserve Due Days'];
        $settings[] = ['library_name', 'My Library', 'My Library'];
        $settings[] = ['library_logo', 'logo-blue-black.png', 'Library Logo'];
        $settings[] = ['language', 'en', 'English'];
        $settings[] = ['favicon_icon', 'favicon.ico', 'Icon'];
        $settings[] = ['reserve_books_limit', 5, 'Maximum reserve books limit'];
        $settings[] = ['issue_books_limit', 5, 'Maximum issue books limit'];
        $settings[] = ['penalty_per_day', 10, 'Penalty amount per day'];

        foreach ($settings as $setting) {
            Setting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }
    }
}

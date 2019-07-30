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
        $settings[] = ['currency', 'INR', 'Indain Rupee'];
        $settings[] = ['return_due_days', 15, 'Return Due Days'];
        $settings[] = ['reserve_due_days', 5, 'Reserve Due Days'];

        foreach ($settings as $setting) {
            Setting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }
    }
}

<?php

use App\Models\HomepageSetting;
use Illuminate\Database\Seeder;

/**
 * Class CreateHomepageSettingsSeeder
 */
class CreateHomepageSettingsSeeder extends Seeder
{
    public function run()
    {
        $settings[] = ['facebook', '', 'Facebook link'];
        $settings[] = ['github', '', 'Github link'];
        $settings[] = ['linkedin', '', 'Linkedin link'];
        $settings[] = ['twitter', '', 'Twitter link'];
        $settings[] = ['contact_email', '', 'Contact email'];
        $settings[] = ['contact_phone', '', 'Contact phone'];
        $settings[] = ['website', '', 'Website'];
        $settings[] = ['company_description', '', 'Company description'];


        foreach ($settings as $setting) {
            HomepageSetting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }
    }
}
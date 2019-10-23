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
        $settings[] = ['contact_email', 'contact@infyom.in', 'Contact email'];
        $settings[] = ['contact_phone', 7096336561, 'Contact phone'];
        $settings[] = ['website', 'www.infyom.com', 'Website'];
        $settings[] = ['company_description', 'India\'s Leading Laravel Company.', 'Company description'];


        foreach ($settings as $setting) {
            HomepageSetting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }
    }
}
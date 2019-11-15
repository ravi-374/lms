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
        $settings[] = ['facebook', 'https://www.facebook.com/infyom', 'Facebook link'];
        $settings[] = ['github', '', 'https://github.com/InfyOmLabs'];
        $settings[] = ['linkedin', '', 'https://in.linkedin.com/company/infyom-technologies'];
        $settings[] = ['twitter', '', 'infyom'];
        $settings[] = ['contact_email', '', 'contact@infyom.in'];
        $settings[] = ['contact_phone', '', '7096336561'];
        $settings[] = ['website', '', 'http://www.infyom.com/'];
        $settings[] = ['company_description', '', 'Leading Laravel Development Company Of India.'];


        foreach ($settings as $setting) {
            HomepageSetting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }
    }
}

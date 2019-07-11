<?php

use App\Models\BookLanguage;
use Illuminate\Database\Seeder;

class PopulateBookLanguages extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bookLanguages = [
            'English'          => 'EN',
            'Gujarati'         => 'GJ',
            'Marathi'          => 'MR',
            'Tamil'            => 'TA',
            'Telugu'           => 'TE',
            'Malayalam'        => 'ML',
            'Bengali'          => 'BE',
            'Kannada'          => 'KN',
            'Urdu'             => 'UR',
            'Spanish'          => 'ES',
            'Portuguese'       => 'PT',
            'French'           => 'FR',
            'German'           => 'DE',
            'Chinese'          => 'ZH',
            'Italian'          => 'IT',
            'Norwegian'        => 'NO',
            'Russian'          => 'RU',
            'Dutch'            => 'NL',
            'Swedish'          => 'SV',
            'Czech'            => 'CS',
            'Yiddish'          => 'YI',
            'Arabic'           => 'AR',
            'Biblical Hebrew'  => 'IW',
            'Greek'            => 'EL',
            'Japanese'         => 'JA',
            'Korean'           => 'KO',
        ];

        foreach ($bookLanguages as $bookLanguage => $code) {
            BookLanguage::create(['language_name' => $bookLanguage, 'language_code' => $code]);
        }
    }
}

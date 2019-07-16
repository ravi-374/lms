<?php

use App\Models\Publisher;
use Illuminate\Database\Seeder;

class PopulatePublishersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $publishers = [
            'Penguin Random House',
            'McGraw-Hill Education',
            'HarperCollins',
            'Egmont Books',
            'Shueisha',
            'Kodansha',
            'Pearson Education',
            'Egmont Group',
            'Klett',
            'Jaico Publishing House',
            'Westland Publications',
            'Hachette Livre',
        ];

        foreach ($publishers as $publisher) {
            Publisher::create(['name' => $publisher]);
        }
    }
}

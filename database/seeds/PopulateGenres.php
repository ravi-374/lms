<?php

use App\Models\Genre;
use Illuminate\Database\Seeder;

class PopulateGenres extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genres = [
            'Art',
            'Biography',
            'Business',
            'Comics',
            'Contemporary',
            'Crime',
            'Fantasy',
            'Fiction',
            'Novels',
            'History',
            'Horror',
            'Humor and Comedy',
            'Music',
            'Mystery',
            'Nonfiction',
            'Philosophy',
            'Poetry',
            'Psychology',
            'Religion',
            'Romance',
            'Science',
            'Self Help',
            'Suspense',
            'Spirituality',
            'Sports',
            'Thriller',
            'Travel',
        ];

        foreach ($genres as $genre) {
            Genre::create(['name' => $genre, 'description' => $genre]);
        }
    }
}

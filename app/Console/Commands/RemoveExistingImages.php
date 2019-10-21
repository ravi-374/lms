<?php

namespace App\Console\Commands;

use App\Models\Book;
use App\Models\Member;
use App\Models\Setting;
use App\User;
use File;
use Illuminate\Console\Command;

/**
 * Class RemoveExistingImages
 */
class RemoveExistingImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:remove-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove images';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $booksDirectory = public_path()."/uploads/".Book::IMAGE_PATH;
        $images = glob($booksDirectory."/*");
        $this->deleteImages($images);
        $this->info('Books images deleted.');

        $membersDirectory = public_path()."/uploads/".Member::IMAGE_PATH;
        $images = glob($membersDirectory."/*");
        $this->deleteImages($images);
        $this->info('Members images deleted.');

        $usersDirectory = public_path()."/uploads/".User::IMAGE_PATH;
        $images = glob($usersDirectory."/*");
        $this->deleteImages($images);
        $this->info('Users images deleted.');

        $imagesDirectory = public_path()."/uploads/".Setting::LOGO_PATH;
        $images = glob($imagesDirectory."/*");
        $images = array_map(function ($record) {
            if (basename($record) != Setting::DEFAULT_FAVICON_NAME && basename($record) != Setting::DEFAULT_LOGO_NAME) {
                return $record;
            }
        }, $images);
        $this->deleteImages(array_filter($images));
        $this->info('Uploaded Logos and favicon images deleted.');
    }

    public function deleteImages($imagesArr)
    {
        foreach ($imagesArr as $image) {
            if (File::exists($image)) {
                File::delete($image);
            }
        }
    }
}
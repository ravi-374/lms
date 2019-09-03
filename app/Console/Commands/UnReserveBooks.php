<?php

namespace App\Console\Commands;

use App\Models\IssuedBook;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UnReserveBooks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:un-reserve-books';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reserved and not issued still valid due time books are un-reserved.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        /** @var IssuedBook[] $issueBooks */
        $issueBooks = IssuedBook::whereStatus(IssuedBook::STATUS_RESERVED)->get();

        foreach ($issueBooks as $issueBook) {
            if (!$issueBook->issue_due_date < Carbon::now()) {
                $issueBook->update(['status' => IssuedBook::STATUS_UN_RESERVED]);
                $this->info("Un-Reserved book with id :$issueBook->id");
            }
        }
    }
}

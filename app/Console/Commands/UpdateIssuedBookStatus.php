<?php

namespace App\Console\Commands;

use App\Models\IssuedBook;
use Illuminate\Console\Command;

class UpdateIssuedBookStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:issued_book_status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        /** @var IssuedBook[] $issueBooks */
        $issueBooks = IssuedBook::get();

        foreach ($issueBooks as $issueBook) {
            if (!$issueBook->issue_due_date < now()) {
                $issueBook->update(['status' => IssuedBook::STATUS_UN_RESERVED]);
                $this->info("Updating issue book status");
            }
        }
    }
}

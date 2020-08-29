<?php

namespace App\Console;

use App\Console\Commands\BookDueReminderMail;
use App\Console\Commands\RemoveExistingImages;
use App\Console\Commands\UnReserveBooks;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        UnReserveBooks::class,
        RemoveExistingImages::class,
        BookDueReminderMail::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('lms:un-reserve-books')
            ->daily();
        $schedule->command('lms:book-due-reminder')
            ->daily();
        $schedule->command('lms:book-due-reminder')
            ->daily();
        $schedule->command('lms:book-due-mail-before-one-week')
            ->daily();
        $schedule->command('lms:send-book-due-mail')
            ->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

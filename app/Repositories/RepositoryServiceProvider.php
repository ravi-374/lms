<?php

namespace App\Providers;

use App\Repositories\Contracts\GenreRepositoryInterface;
use App\Repositories\GenreRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Register bindings for all repositories
        $this->app->bind(
            GenreRepositoryInterface::class,
            GenreRepository::class
        );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}

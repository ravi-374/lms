<?php

namespace App\Providers;

use App\Repositories\AuthorRepository;
use App\Repositories\BookLanguageRepository;
use App\Repositories\BookRepository;
use App\Repositories\BookSeriesRepository;
use App\Repositories\Contracts\AuthorRepositoryInterface;
use App\Repositories\Contracts\BookLanguageInterface;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\GenreRepositoryInterface;
use App\Repositories\Contracts\PublisherRepositoryInterface;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\GenreRepository;
use App\Repositories\PublisherRepository;
use App\Repositories\TagRepository;
use BookSeriesRepositoryInterface;
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
        $this->app->bind(GenreRepositoryInterface::class, GenreRepository::class);
        $this->app->bind(AuthorRepositoryInterface::class, AuthorRepository::class);
        $this->app->bind(PublisherRepositoryInterface::class, PublisherRepository::class);
        $this->app->bind(TagRepositoryInterface::class, TagRepository::class);
        $this->app->bind(BookLanguageInterface::class, BookLanguageRepository::class);
        $this->app->bind(BookRepositoryInterface::class, BookRepository::class);
        $this->app->bind(BookSeriesRepositoryInterface::class, BookSeriesRepository::class);
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

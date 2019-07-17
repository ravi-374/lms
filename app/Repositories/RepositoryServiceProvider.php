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
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use App\Repositories\Contracts\PublisherRepositoryInterface;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\GenreRepository;
use App\Repositories\IssuedBookRepository;
use App\Repositories\PublisherRepository;
use App\Repositories\SeriesBookRepository;
use App\Repositories\TagRepository;
use App\Repositories\UserRepository;
use BookSeriesRepositoryInterface;
use Illuminate\Support\ServiceProvider;
use SeriesBookRepositoryInterface;

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
        $this->app->bind(SeriesBookRepositoryInterface::class, SeriesBookRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(IssuedBookRepositoryInterface::class, IssuedBookRepository::class);
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

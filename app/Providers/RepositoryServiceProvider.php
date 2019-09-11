<?php

namespace App\Providers;

use App\Repositories\AccountRepository;
use App\Repositories\AuthorRepository;
use App\Repositories\AuthRepository;
use App\Repositories\BookItemRepository;
use App\Repositories\BookLanguageRepository;
use App\Repositories\BookRepository;
use App\Repositories\BookSeriesRepository;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\Repositories\Contracts\AuthorRepositoryInterface;
use App\Repositories\Contracts\AuthRepositoryInterface;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use App\Repositories\Contracts\BookLanguageRepositoryInterface;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\BookSeriesRepositoryInterface;
use App\Repositories\Contracts\CountryRepositoryInterface;
use App\Repositories\Contracts\GenreRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use App\Repositories\Contracts\MembershipPlanRepositoryInterface;
use App\Repositories\Contracts\PublisherRepositoryInterface;
use App\Repositories\Contracts\RoleRepositoryInterface;
use App\Repositories\Contracts\SeriesBookRepositoryInterface;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\CountryRepository;
use App\Repositories\GenreRepository;
use App\Repositories\IssuedBookRepository;
use App\Repositories\MembershipPlanRepository;
use App\Repositories\PublisherRepository;
use App\Repositories\RoleRepository;
use App\Repositories\SeriesBookRepository;
use App\Repositories\TagRepository;
use App\Repositories\UserRepository;
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
        $this->app->bind(BookLanguageRepositoryInterface::class, BookLanguageRepository::class);
        $this->app->bind(BookRepositoryInterface::class, BookRepository::class);
        $this->app->bind(BookItemRepositoryInterface::class, BookItemRepository::class);
        $this->app->bind(BookSeriesRepositoryInterface::class, BookSeriesRepository::class);
        $this->app->bind(SeriesBookRepositoryInterface::class, SeriesBookRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(IssuedBookRepositoryInterface::class, IssuedBookRepository::class);
        $this->app->bind(AccountRepositoryInterface::class, AccountRepository::class);
        $this->app->bind(MembershipPlanRepositoryInterface::class, MembershipPlanRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(CountryRepositoryInterface::class, CountryRepository::class);
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

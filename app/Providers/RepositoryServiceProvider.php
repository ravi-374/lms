<?php

namespace App\Providers;

use App\Repositories\AboutUsCardRepository;
use App\Repositories\AccountRepository;
use App\Repositories\AuthorRepository;
use App\Repositories\AuthRepository;
use App\Repositories\BookItemRepository;
use App\Repositories\BookLanguageRepository;
use App\Repositories\BookRepository;
use App\Repositories\BookRequestRepository;
use App\Repositories\BookSeriesRepository;
use App\Repositories\Contracts\AboutUsCardRepositoryInterface;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\Repositories\Contracts\AuthorRepositoryInterface;
use App\Repositories\Contracts\AuthRepositoryInterface;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use App\Repositories\Contracts\BookLanguageRepositoryInterface;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\BookRequestRepositoryInterface;
use App\Repositories\Contracts\BookSeriesRepositoryInterface;
use App\Repositories\Contracts\CountryRepositoryInterface;
use App\Repositories\Contracts\GenreRepositoryInterface;
use App\Repositories\Contracts\HomepageSettingRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface;
use App\Repositories\Contracts\MemberSettingRepositoryInterface;
use App\Repositories\Contracts\MembershipPlanRepositoryInterface;
use App\Repositories\Contracts\PenaltyRepositoryInterface;
use App\Repositories\Contracts\PermissionRepositoryInterface;
use App\Repositories\Contracts\PublisherRepositoryInterface;
use App\Repositories\Contracts\RoleRepositoryInterface;
use App\Repositories\Contracts\SeriesBookRepositoryInterface;
use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\CountryRepository;
use App\Repositories\GenreRepository;
use App\Repositories\HomepageSettingRepository;
use App\Repositories\IssuedBookRepository;
use App\Repositories\MemberRepository;
use App\Repositories\MemberSettingRepository;
use App\Repositories\MembershipPlanRepository;
use App\Repositories\PenaltyRepository;
use App\Repositories\PermissionRepository;
use App\Repositories\PublisherRepository;
use App\Repositories\RoleRepository;
use App\Repositories\SeriesBookRepository;
use App\Repositories\SettingRepository;
use App\Repositories\TagRepository;
use App\Repositories\TestimonialRepository;
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
        $this->app->bind(MemberRepositoryInterface::class, MemberRepository::class);
        $this->app->bind(SettingRepositoryInterface::class, SettingRepository::class);
        $this->app->bind(MembershipPlanRepositoryInterface::class, MembershipPlanRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(PermissionRepositoryInterface::class, PermissionRepository::class);
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(CountryRepositoryInterface::class, CountryRepository::class);
        $this->app->bind(BookRequestRepositoryInterface::class, BookRequestRepository::class);
        $this->app->bind(HomepageSettingRepositoryInterface::class, HomepageSettingRepository::class);
        $this->app->bind(TestimonialRepositoryInterface::class, TestimonialRepository::class);
        $this->app->bind(MemberSettingRepositoryInterface::class, MemberSettingRepository::class);
        $this->app->bind(PenaltyRepositoryInterface::class, PenaltyRepository::class);
        $this->app->bind(AboutUsCardRepositoryInterface::class, AboutUsCardRepository::class);
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

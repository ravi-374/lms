<?php

namespace Tests\Traits;

use App\Repositories\AuthorRepository;
use App\Repositories\BookItemRepository;
use App\Repositories\BookLanguageRepository;
use App\Repositories\BookRepository;
use App\Repositories\BookSeriesRepository;
use App\Repositories\CountryRepository;
use App\Repositories\GenreRepository;
use App\Repositories\IssuedBookRepository;
use App\Repositories\MemberRepository;
use App\Repositories\MembershipPlanRepository;
use App\Repositories\PermissionRepository;
use App\Repositories\PublisherRepository;
use App\Repositories\RoleRepository;
use App\Repositories\SettingRepository;
use App\Repositories\TagRepository;
use App\Repositories\UserRepository;
use Mockery\MockInterface;

/**
 * Trait MockRepositories.
 */
trait MockRepositories
{
    public static $author = 'authorRepository';
    public static $book = 'bookRepository';
    public static $bookItem = 'bookItemRepository';
    public static $bookLanguage = 'bookLanguageRepo';
    public static $bookSeries = 'bookSeriesRepo';
    public static $country = 'countryRepo';
    public static $genre = 'genreRepository';
    public static $issuedBook = 'issuedBookRepo';
    public static $member = 'memberRepo';
    public static $membershipPlan = 'membershipPlanRepo';
    public static $permission = 'permissionRepo';
    public static $publisher = 'publisherRepo';
    public static $role = 'roleRepository';
    public static $setting = 'settingRepo';
    public static $tag = 'tagRepository';
    public static $user = 'userRepo';

    /** @var MockInterface */
    public $authorRepository;
    /** @var MockInterface */
    public $bookRepository;
    /** @var MockInterface */
    protected $bookItemRepository;
    /** @var MockInterface */
    protected $bookLanguageRepo;
    /** @var MockInterface */
    protected $bookSeriesRepo;
    /** @var MockInterface */
    protected $countryRepo;
    /** @var MockInterface */
    protected $genreRepository;
    /** @var MockInterface */
    protected $issuedBookRepo;
    /** @var MockInterface */
    protected $memberRepo;
    /** @var MockInterface */
    protected $membershipPlanRepo;
    /** @var MockInterface */
    protected $permissionRepo;
    /** @var MockInterface */
    protected $publisherRepo;
    /** @var MockInterface */
    protected $roleRepository;
    /** @var MockInterface */
    protected $settingRepo;
    /** @var MockInterface */
    protected $tagRepository;
    /** @var MockInterface */
    protected $userRepo;


    public function mockRepo($repoNames)
    {
        if (!is_array($repoNames)) {
            $repoNames = [$repoNames];
        }

        foreach ($repoNames as $repoName) {
            $repoInstance = null;
            switch ($repoName) {
                case self::$author:
                    $repoInstance = AuthorRepository::class;
                    break;
                case self::$book:
                    $repoInstance = BookRepository::class;
                    break;
                case self::$bookItem:
                    $repoInstance = BookItemRepository::class;
                    break;
                case self::$bookLanguage:
                    $repoInstance = BookLanguageRepository::class;
                    break;
                case self::$bookSeries:
                    $repoInstance = BookSeriesRepository::class;
                    break;
                case self::$country:
                    $repoInstance = CountryRepository::class;
                    break;
                case self::$genre:
                    $repoInstance = GenreRepository::class;
                    break;
                case self::$issuedBook:
                    $repoInstance = IssuedBookRepository::class;
                    break;
                case self::$member:
                    $repoInstance = MemberRepository::class;
                    break;
                case self::$membershipPlan:
                    $repoInstance = MembershipPlanRepository::class;
                    break;
                case self::$permission:
                    $repoInstance = PermissionRepository::class;
                    break;
                case self::$publisher:
                    $repoInstance = PublisherRepository::class;
                    break;
                case self::$role:
                    $repoInstance = RoleRepository::class;
                    break;
                case self::$setting:
                    $repoInstance = SettingRepository::class;
                    break;
                case self::$tag:
                    $repoInstance = TagRepository::class;
                    break;
                case self::$user:
                    $repoInstance = UserRepository::class;
                    break;
            }

            $this->$repoName = \Mockery::mock($repoInstance);
            app()->instance($repoInstance, $this->$repoName);
        }
    }
}

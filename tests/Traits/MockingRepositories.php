<?php

namespace Tests\Traits;

use App\Repositories\AuthorRepository;
use Mockery\MockInterface;

/**
 * Trait MockRepositories.
 */
trait MockRepositories
{
    public static $author = 'authorRepository';

    /** @var MockInterface */
    public $authorRepository;

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
            }

            $this->$repoName = \Mockery::mock($repoInstance);
            app()->instance($repoInstance, $this->$repoName);
        }
    }
}

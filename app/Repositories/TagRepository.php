<?php

namespace App\Repositories;

use App\Models\Tag;
use App\Repositories\BaseRepository;
use App\Repositories\Contracts\TagRepositoryInterface;

/**
 * Class TagRepository
 * @package App\Repositories
 * @version June 19, 2019, 6:00 am UTC
 */
class TagRepository extends BaseRepository implements TagRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Tag::class;
    }
}

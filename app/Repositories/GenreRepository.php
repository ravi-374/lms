<?php

namespace App\Repositories;

use App\Models\Genre;
use App\Repositories\Contracts\GenreRepositoryInterface;

/**
 * Class GenreRepository
 * @package App\Repositories
 * @version June 17, 2019, 11:10 am UTC
 */
class GenreRepository extends BaseRepository implements GenreRepositoryInterface
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
        return Genre::class;
    }
}

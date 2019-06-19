<?php

namespace App\Repositories;

use App\Models\Publisher;
use App\Repositories\BaseRepository;

/**
 * Class PublisherRepository
 * @package App\Repositories
 * @version June 19, 2019, 5:17 am UTC
 */
class PublisherRepository extends BaseRepository
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
        return Publisher::class;
    }
}

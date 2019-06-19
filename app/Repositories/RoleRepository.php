<?php

namespace App\Repositories;

use App\Models\Role;
use App\Repositories\BaseRepository;
use App\Repositories\Contracts\RoleRepositoryInterface;

/**
 * Class RoleRepository
 * @package App\Repositories
 * @version June 19, 2019, 10:01 am UTC
*/
class RoleRepository extends BaseRepository implements RoleRepositoryInterface
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
        return Role::class;
    }
}

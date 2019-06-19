<?php

namespace App\Repositories;

use App\Models\Permission;
use App\Repositories\BaseRepository;
use App\Repositories\Contracts\PermissionRepositoryInterface;

/**
 * Class PermissionRepository
 * @package App\Repositories
 * @version June 19, 2019, 10:10 am UTC
*/
class PermissionRepository extends BaseRepository implements PermissionRepositoryInterface
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
        return Permission::class;
    }
}

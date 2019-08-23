<?php
namespace App\Repositories;

use App\Models\Author;
use App\Repositories\Contracts\AuthorRepositoryInterface;

/**
 * Class AuthorRepository
 * @package App\Repositories
 * @version June 18, 2019, 4:17 am UTC
 */
class AuthorRepository extends BaseRepository implements AuthorRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
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
        return Author::class;
    }
}

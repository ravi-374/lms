<?php

namespace App\Repositories;

use App\Models\BookLanguage;
use App\Repositories\Contracts\BookLanguageInterface;

/**
 * Class BookLanguageRepository
 * @package App\Repositories
 * @version June 19, 2019, 9:49 am UTC
 */
class BookLanguageRepository extends BaseRepository implements BookLanguageInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'language_name',
        'language_code',
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
        return BookLanguage::class;
    }
}

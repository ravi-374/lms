<?php

namespace App\Repositories;

use App\Models\BookSeries;
use App\Models\SeriesBook;


/**
 * Class SeriesBookRepository
 * @package App\Repositories
 * @version June 25, 2019, 10:36 am UTC
*/

class SeriesBookRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'series_id',
        'book_id',
        'sequence'
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
        return SeriesBook::class;
    }

}
